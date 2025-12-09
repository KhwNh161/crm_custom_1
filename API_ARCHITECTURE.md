# API ARCHITECTURE & DOCUMENTATION
# KIẾN TRÚC VÀ TÀI LIỆU API

---

## 📍 API LOCATIONS IN PROJECT / VỊ TRÍ API TRONG DỰ ÁN

### **Frontend API Code** (Frontend gọi API)
```
src/
├── components/atomic-crm/providers/
│   ├── supabase/
│   │   ├── supabase.ts              ← Supabase client initialization
│   │   ├── dataProvider.ts          ← CRUD operations (getList, getOne, create, update, delete)
│   │   └── authProvider.ts          ← Authentication endpoints
│   │
│   └── fakerest/
│       └── dataProvider.ts          ← Demo/fake data provider
│
└── hooks/
    ├── useBulkExport.tsx            ← API calls for bulk operations
    └── useGetOne, useGetList, etc.  ← React Query hooks
```

### **Backend API Code** (Edge Functions - Deno)
```
supabase/
├── functions/
│   ├── _shared/
│   │   ├── supabaseAdmin.ts         ← Admin client for backend
│   │   └── utils.ts                 ← CORS headers, error responses
│   │
│   ├── users/                       ← User management endpoint
│   │   └── index.ts                 (POST, PATCH)
│   │
│   ├── updatePassword/              ← Password reset endpoint
│   │   └── index.ts                 (PATCH)
│   │
│   ├── postmark/                    ← Email webhook endpoint
│   │   └── index.ts                 (POST)
│   │
│   └── ...other functions
│
└── migrations/
    └── *.sql                        ← Database schema & RLS policies
```

---

## 🔗 TYPES OF APIs USED / LOẠI API ĐƯỢC SỬ DỤNG

### **1. Supabase REST API** 📡
**Location:** Frontend calls via `supabaseDataProvider`

**What:** RESTful API provided by Supabase for database operations

**Methods:**
```typescript
// GET - Read
GET https://your-domain.supabase.co/rest/v1/contacts?select=*

// POST - Create
POST https://your-domain.supabase.co/rest/v1/contacts
Body: { first_name: "John", ... }

// PATCH - Update
PATCH https://your-domain.supabase.co/rest/v1/contacts?id=eq.123
Body: { first_name: "Jane" }

// DELETE
DELETE https://your-domain.supabase.co/rest/v1/contacts?id=eq.123
```

**Code Location:**
```typescript
// src/components/atomic-crm/providers/supabase/dataProvider.ts
const baseDataProvider = supabaseDataProvider({
  instanceUrl: import.meta.env.VITE_SUPABASE_URL,
  apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  supabaseClient: supabase,
});
```

---

### **2. Supabase Auth API** 🔐
**Location:** `authProvider.ts`

**What:** Authentication endpoints for login, signup, password reset

**Methods:**
```typescript
// Login
supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123"
});

// Signup
supabase.auth.signUp({
  email: "new@example.com",
  password: "password123"
});

// Check Auth Status
supabase.auth.getSession();

// Logout
supabase.auth.signOut();

// Password Reset
supabase.auth.resetPasswordForEmail("user@example.com");
```

**Code Location:**
```typescript
// src/components/atomic-crm/providers/supabase/authProvider.ts
const baseAuthProvider = supabaseAuthProvider(supabase, {
  getIdentity: async () => {
    const sale = await getSaleFromCache();
    return {
      id: sale.id,
      fullName: `${sale.first_name} ${sale.last_name}`,
      avatar: sale.avatar?.src,
    };
  },
});
```

---

### **3. Supabase Edge Functions API** ⚙️
**Location:** Backend endpoints (`supabase/functions/`)

**What:** Custom serverless functions for complex operations

**Endpoints:**

#### **A. Users Management Function**
```typescript
// File: supabase/functions/users/index.ts
// Method: POST, PATCH
// Purpose: Create user, update user (invite, disable, make admin)

// POST - Invite new user
POST https://your-domain.supabase.co/functions/v1/users
Authorization: Bearer {access_token}
Body: {
  email: "newuser@example.com",
  first_name: "John",
  last_name: "Doe"
}

// PATCH - Update user
PATCH https://your-domain.supabase.co/functions/v1/users
Authorization: Bearer {access_token}
Body: {
  user_id: "uuid",
  administrator: true,
  disabled: false,
  avatar: "url"
}
```

**Frontend Usage:**
```typescript
// src/components/atomic-crm/providers/supabase/dataProvider.ts
async salesCreate(body: SalesFormData) {
  const { data, error } = await supabase.functions.invoke<Sale>("users", {
    method: "POST",
    body,
  });
  return data;
}
```

#### **B. Password Reset Function**
```typescript
// File: supabase/functions/updatePassword/index.ts
// Method: PATCH
// Purpose: Send password reset email

PATCH https://your-domain.supabase.co/functions/v1/updatePassword
Authorization: Bearer {access_token}
Body: { /* email sent in user context */ }
```

#### **C. Email Webhook Function**
```typescript
// File: supabase/functions/postmark/index.ts
// Method: POST
// Purpose: Process inbound emails (CC feature)

POST https://your-domain.supabase.co/functions/v1/postmark
Body: { /* Email from Postmark */ }
```

---

## 📊 DATA FLOW: How APIs Are Called / LUỒNG DỮ LIỆU

### **Example: Load Contacts List**

```
1. User clicks "Contacts" in sidebar
   ↓
2. Component calls dataProvider.getList('contacts')
   ↓
3. React Query caches and fetches
   ↓
4. Supabase REST API called:
   GET https://domain.supabase.co/rest/v1/contacts_summary
   Headers: {
     Authorization: "Bearer {access_token}",
     apikey: "{VITE_SUPABASE_ANON_KEY}"
   }
   ↓
5. Database executes query with RLS policies
   ↓
6. Returns { data: [...contacts], total: 100 }
   ↓
7. Frontend renders table
```

**Code Path:**
```typescript
// 1. Component (e.g., ContactList.tsx)
const { data: contacts } = useList('contacts');

// 2. React Admin calls DataProvider
// 3. DataProvider transforms and calls Supabase
// File: src/components/atomic-crm/providers/supabase/dataProvider.ts
async getList(resource: string, params: GetListParams) {
  if (resource === "contacts") {
    return baseDataProvider.getList("contacts_summary", params);
  }
  return baseDataProvider.getList(resource, params);
}

// 4. baseDataProvider (from ra-supabase-core)
const baseDataProvider = supabaseDataProvider({
  instanceUrl: import.meta.env.VITE_SUPABASE_URL,
  apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  supabaseClient: supabase,
});

// 5. Supabase SDK makes HTTP request
supabase.from('contacts_summary').select('*')
```

---

## 🗄️ DATABASE ENDPOINTS (SQL Views)

### **Public Views** (Used by REST API)
```sql
-- contacts_summary
SELECT id, first_name, last_name, email, phone, company_id, ...
FROM contacts

-- companies_summary
SELECT id, name, sector, website, phone, ...
FROM companies

-- deals with status names
SELECT id, name, amount, status, company_id, ...
FROM deals

-- activity_log
SELECT user_id, resource, resource_id, action, created_at, ...
FROM activity_log
```

**Why views?** Performance optimization + consistent data structure

---

## 🔑 AUTHENTICATION FLOW

### **API Authentication Headers**

```typescript
// All Supabase REST API calls include:
Headers: {
  Authorization: "Bearer {JWT_TOKEN}",  // From login
  apikey: "{VITE_SUPABASE_ANON_KEY}",   // Public key
  Content-Type: "application/json"
}

// JWT Token Structure:
{
  "sub": "user-uuid",           // User ID
  "email": "user@example.com",
  "iat": 1234567890,            // Issued at
  "exp": 1234571490,            // Expires in 1 hour
  "role": "authenticated"       // Supabase role
}
```

**Where tokens come from:**
```typescript
// After login
const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});

// Returns:
{
  session: {
    access_token: "eyJhbGc...",      // JWT token
    refresh_token: "abc123...",
    expires_in: 3600,                // 1 hour
    user: { id, email, ... }
  }
}

// Tokens stored in:
localStorage.getItem("sb-supabase_auth-token")  // Frontend
```

---

## 📝 CUSTOM DATA PROVIDER METHODS

### **Location:** `src/components/atomic-crm/providers/supabase/dataProvider.ts`

```typescript
const dataProviderWithCustomMethods = {
  // Standard CRUD (inherited from baseDataProvider)
  async getList(resource, params) { ... }
  async getOne(resource, params) { ... }
  async create(resource, params) { ... }
  async update(resource, params) { ... }
  async delete(resource, params) { ... }
  
  // Custom methods
  async signUp({ email, password, first_name, last_name }) { 
    // Supabase Auth
  }
  
  async salesCreate(body: SalesFormData) {
    // Calls edge function: /functions/v1/users
    await supabase.functions.invoke("users", { 
      method: "POST", 
      body 
    });
  }
  
  async salesUpdate(id: Identifier, data) {
    // Calls edge function: /functions/v1/users
    await supabase.functions.invoke("users", { 
      method: "PATCH", 
      body: { ...data, user_id: id } 
    });
  }
  
  async updatePassword(id: Identifier) {
    // Calls edge function: /functions/v1/updatePassword
    await supabase.functions.invoke("updatePassword", { 
      method: "PATCH" 
    });
  }
  
  async getActivityLog(companyId?: Identifier) {
    // Fetches from activity_log table
  }
  
  async isInitialized() {
    // Check if app is initialized
  }
};
```

---

## 🌐 ENVIRONMENT VARIABLES FOR APIs

```bash
# Frontend - Used in vite.config.ts
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# Backend - In supabase/functions/.env.development
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

---

## 🔒 ROW-LEVEL SECURITY (RLS) POLICIES

### **What:** Database-level authorization

### **Example Policy:**
```sql
-- Only users can see their own contacts
CREATE POLICY "Enable read access for own contacts"
ON "public"."contacts"
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (sales_id = auth.uid());

-- users = Supabase JWT claims
-- auth.uid() = current user's ID from JWT
```

### **⚠️ CRITICAL ISSUE:** 
Current RLS is **TOO PERMISSIVE**:
```sql
-- WRONG - All authenticated users see all data!
USING (true);

-- CORRECT - Only own data
USING (sales_id = auth.uid());
```

---

## 📡 HTTP REQUEST/RESPONSE EXAMPLES

### **Example 1: Get List of Contacts**

**Request:**
```http
GET /rest/v1/contacts_summary?select=*&limit=25&offset=0 HTTP/1.1
Host: xxxxx.supabase.co
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
apikey: eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": ["john@example.com"],
      "phone": ["555-1234"],
      "company_id": 5,
      "status": "lead",
      "created_at": "2025-01-01T00:00:00Z"
    },
    { ... }
  ],
  "total": 523
}
```

---

### **Example 2: Create Contact**

**Request:**
```http
POST /rest/v1/contacts HTTP/1.1
Host: xxxxx.supabase.co
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
apikey: eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "first_name": "Jane",
  "last_name": "Smith",
  "email_jsonb": ["jane@example.com"],
  "company_id": 5
}
```

**Response:**
```json
{
  "id": 1001,
  "first_name": "Jane",
  "last_name": "Smith",
  "email_jsonb": ["jane@example.com"],
  "company_id": 5,
  "created_at": "2025-12-05T00:00:00Z"
}
```

---

### **Example 3: Call Edge Function**

**Request:**
```http
POST /functions/v1/users HTTP/1.1
Host: xxxxx.supabase.co
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "email": "newuser@example.com",
  "first_name": "Bob",
  "last_name": "Johnson"
}
```

**Response:**
```json
{
  "id": "uuid-of-new-user",
  "first_name": "Bob",
  "last_name": "Johnson",
  "email": "newuser@example.com",
  "user_id": "auth-user-uuid"
}
```

---

## 🔄 QUERY TRANSFORMATIONS

### **Filter Transformation** 
```typescript
// Frontend sends:
{ q: "John" }

// Transformed by applyFullTextSearch to:
{
  "@or": {
    "first_name@ilike": "John",
    "last_name@ilike": "John",
    "email@ilike": "John"
  }
}

// Sent to Supabase as:
?filter=@or.("first_name@ilike".John,"last_name@ilike".John)
```

### **Sorting:**
```typescript
// Frontend: { field: "name", order: "ASC" }
// Supabase: ?order=name.asc

// Supabase: ?order=name.asc.nullsfirst
```

---

## 📊 API USAGE STATISTICS

| Operation | Type | Frequency | Endpoint |
|-----------|------|-----------|----------|
| **List Contacts** | GET | ★★★★★ | `/rest/v1/contacts_summary` |
| **Get Contact** | GET | ★★★★ | `/rest/v1/contacts/{id}` |
| **Create Contact** | POST | ★★★ | `/rest/v1/contacts` |
| **Update Contact** | PATCH | ★★★ | `/rest/v1/contacts` |
| **Delete Contact** | DELETE | ★ | `/rest/v1/contacts` |
| **List Deals** | GET | ★★★★★ | `/rest/v1/deals` |
| **Login** | POST | ★★ | `/auth/v1/token` |
| **Create User** | POST | ★ | `/functions/v1/users` |
| **Reset Password** | PATCH | ★ | `/functions/v1/updatePassword` |

---

## 🚀 API OPTIMIZATION

### **Caching Strategy** (React Query)
```typescript
// Data cached by default
// Refetches on:
// - Component mount
// - Focus on window
// - Manual refetch
// - Data mutations

const { data, refetch } = useList('contacts');
```

### **Pagination**
```typescript
// Frontend sends:
{ pagination: { page: 1, perPage: 25 } }

// Becomes:
?limit=25&offset=0
```

### **Search Full-Text**
```typescript
// Uses PostgreSQL full-text search
WHERE 
  first_name @@ query OR 
  last_name @@ query OR 
  email @@ query
```

---

## 🔍 DEBUGGING APIs

### **Check API Calls in Browser**

1. **DevTools Network Tab**
   - Open DevTools → Network tab
   - Load page
   - Look for requests to `supabase.co`
   - Check Headers, Request body, Response

2. **Supabase Studio**
   - Go to `http://localhost:54323/` (local)
   - Check Logs → API Logs
   - See all queries executed

3. **Console Logs**
   ```typescript
   // In dataProvider.ts
   console.log("API Request:", resource, params);
   ```

---

## 📚 TIẾNG VIỆT SUMMARY

### **Các loại API được sử dụng:**

1. **Supabase REST API** (95% usage)
   - Gọi để lấy, tạo, sửa, xóa dữ liệu
   - URL: `https://xxxxx.supabase.co/rest/v1/{table}`

2. **Supabase Auth API** 
   - Đăng nhập, đăng ký, reset mật khẩu
   - URL: `https://xxxxx.supabase.co/auth/v1/{endpoint}`

3. **Supabase Edge Functions**
   - Custom logic phức tạp
   - URL: `https://xxxxx.supabase.co/functions/v1/{function_name}`

### **Nằm ở đâu:**
- **Frontend:** `src/components/atomic-crm/providers/supabase/`
- **Backend:** `supabase/functions/`
- **Config:** `supabase/config.toml` + `.env`

### **Loại gì:**
- **REST** (HTTP GET, POST, PATCH, DELETE)
- **Real-time** (WebSocket)
- **Caching** (React Query)

---

**End of Documentation**
