# ATOMIC-CRM PROJECT ARCHITECTURE GUIDE
# HƯỚNG DẪN KIẾN TRÚC DỰ ÁN ATOMIC-CRM

---

## 📊 OVERVIEW / TỔNG QUAN

### English
Atomic-CRM is a **full-stack Customer Relationship Management system** built with modern web technologies. It's a production-ready application that helps businesses manage contacts, deals, companies, tasks, and activities.

### Tiếng Việt
Atomic-CRM là một **hệ thống quản lý quan hệ khách hàng toàn stack** được xây dựng bằng các công nghệ web hiện đại. Đó là một ứng dụng sẵn sàng cho sản xuất giúp các doanh nghiệp quản lý liên hệ, thương vụ, công ty, tác vụ và hoạt động.

---

## 🏗️ ARCHITECTURE LAYERS / CẤU TRÚC KIẾN TRÚC

### English
```
┌─────────────────────────────────────────────────────┐
│         PRESENTATION LAYER (Frontend)               │
│  React Components • TypeScript • Tailwind CSS      │
│  - User Interface                                   │
│  - Form Validation                                  │
│  - State Management                                 │
└────────────────────┬────────────────────────────────┘
                     │ REST API + WebSocket
                     │
┌────────────────────▼────────────────────────────────┐
│         BUSINESS LOGIC LAYER                        │
│  Data Provider • Auth Provider • React Query       │
│  - Data Operations (CRUD)                           │
│  - Authentication & Authorization                   │
│  - Caching & Synchronization                        │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS + Real-time
                     │
┌────────────────────▼────────────────────────────────┐
│         DATA LAYER (Backend)                        │
│  Supabase • PostgreSQL • Edge Functions            │
│  - Database Management                              │
│  - User Sessions                                    │
│  - Business Logic Execution                         │
└─────────────────────────────────────────────────────┘
```

### Tiếng Việt
```
┌─────────────────────────────────────────────────────┐
│      TẦNG TRÌNH BÀY (Frontend)                      │
│  React Components • TypeScript • Tailwind CSS      │
│  - Giao diện người dùng                             │
│  - Xác thực biểu mẫu                                │
│  - Quản lý trạng thái                               │
└────────────────────┬────────────────────────────────┘
                     │ REST API + WebSocket
                     │
┌────────────────────▼────────────────────────────────┐
│      TẦNG LOGIC KINH DOANH                          │
│  Data Provider • Auth Provider • React Query       │
│  - Các thao tác dữ liệu (CRUD)                      │
│  - Xác thực & Phân quyền                            │
│  - Caching & Đồng bộ hóa                            │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS + Real-time
                     │
┌────────────────────▼────────────────────────────────┐
│      TẦNG DỮ LIỆU (Backend)                         │
│  Supabase • PostgreSQL • Edge Functions            │
│  - Quản lý cơ sở dữ liệu                            │
│  - Phiên người dùng                                 │
│  - Thực thi logic kinh doanh                        │
└─────────────────────────────────────────────────────┘
```

---

## 📁 PROJECT STRUCTURE / CẤU TRÚC THƯ MỤC DỰ ÁN

### English
```
atomic-crm/
├── src/                           # Source code
│   ├── main.tsx                   # React entry point
│   ├── App.tsx                    # Root component
│   ├── index.css                  # Global styles
│   │
│   └── components/
│       ├── admin/                 # Admin UI components (100+ files)
│       │   ├── admin.tsx          # Main admin layout
│       │   ├── data-table.tsx     # Reusable data table
│       │   ├── login-page.tsx     # Login UI
│       │   └── ...
│       │
│       ├── atomic-crm/            # Business logic components
│       │   ├── root/
│       │   │   ├── CRM.tsx        # CRM root component ⭐
│       │   │   ├── ConfigurationContext.tsx
│       │   │   └── i18nProvider.ts
│       │   │
│       │   ├── companies/         # Company management feature
│       │   ├── contacts/          # Contact management feature ⭐
│       │   ├── deals/             # Sales pipeline feature ⭐
│       │   ├── tasks/             # Task management feature
│       │   ├── sales/             # Sales team / Users
│       │   ├── dashboard/         # Analytics & overview
│       │   ├── layout/            # Main layout wrapper
│       │   │
│       │   └── providers/         # Data & Auth providers
│       │       ├── supabase/      # Supabase integration
│       │       │   ├── authProvider.ts    # Authentication
│       │       │   ├── dataProvider.ts    # CRUD operations
│       │       │   ├── supabase.ts        # Client config
│       │       │   └── index.ts
│       │       ├── fakerest/      # Demo data provider
│       │       └── commons/       # Shared utilities
│       │
│       ├── supabase/              # Auth pages
│       │   ├── set-password-page.tsx
│       │   ├── forgot-password-page.tsx
│       │   └── layout.tsx
│       │
│       └── ui/                    # shadcn UI components
│           ├── button.tsx
│           ├── dialog.tsx
│           └── ...
│
├── supabase/                      # Backend / Database
│   ├── config.toml                # Local Supabase config ⭐
│   ├── seed.sql                   # Demo data
│   │
│   ├── migrations/                # Database schema changes
│   │   ├── 20240730075029_init_db.sql
│   │   ├── 20240730075425_init_triggers.sql
│   │   └── ...
│   │
│   ├── functions/                 # Edge Functions (Deno/Node.js)
│   │   ├── updatePassword/        # Password reset logic
│   │   ├── users/
│   │   ├── postmark/              # Email integration
│   │   └── _shared/               # Shared utilities
│   │
│   └── templates/                 # Email templates
│       ├── invite.html
│       └── recovery.html
│
├── public/                        # Static assets
│   ├── auth-callback.html         # OAuth callback handler
│   └── img/
│
├── scripts/                       # Build & Deploy scripts
│   ├── generate-registry.mjs
│   ├── ghpages-deploy.mjs
│   └── supabase-remote-init.mjs
│
├── package.json                   # Node.js dependencies
├── vite.config.ts                 # Vite build config ⭐
├── tsconfig.json                  # TypeScript config
├── vercel.json                    # Vercel deployment config
└── makefile                       # Development commands
```

### Tiếng Việt
```
atomic-crm/
├── src/                           # Mã nguồn
│   ├── main.tsx                   # Điểm vào React
│   ├── App.tsx                    # Thành phần gốc
│   ├── index.css                  # Kiểu toàn cầu
│   │
│   └── components/
│       ├── admin/                 # Thành phần UI admin (100+ file)
│       │   ├── admin.tsx          # Bố cục admin chính
│       │   ├── data-table.tsx     # Bảng dữ liệu tái sử dụng
│       │   ├── login-page.tsx     # Giao diện đăng nhập
│       │   └── ...
│       │
│       ├── atomic-crm/            # Thành phần logic kinh doanh
│       │   ├── root/
│       │   │   ├── CRM.tsx        # Thành phần gốc CRM ⭐
│       │   │   ├── ConfigurationContext.tsx
│       │   │   └── i18nProvider.ts
│       │   │
│       │   ├── companies/         # Tính năng quản lý công ty
│       │   ├── contacts/          # Tính năng quản lý liên hệ ⭐
│       │   ├── deals/             # Tính năng bán hàng ⭐
│       │   ├── tasks/             # Tính năng quản lý tác vụ
│       │   ├── sales/             # Đội bán hàng / Người dùng
│       │   ├── dashboard/         # Phân tích & tổng quan
│       │   ├── layout/            # Trình bao bọc bố cục chính
│       │   │
│       │   └── providers/         # Nhà cung cấp dữ liệu & Auth
│       │       ├── supabase/      # Tích hợp Supabase
│       │       │   ├── authProvider.ts    # Xác thực
│       │       │   ├── dataProvider.ts    # Thao tác CRUD
│       │       │   ├── supabase.ts        # Cấu hình client
│       │       │   └── index.ts
│       │       ├── fakerest/      # Nhà cung cấp dữ liệu demo
│       │       └── commons/       # Tiện ích chung
│       │
│       ├── supabase/              # Trang xác thực
│       │   ├── set-password-page.tsx
│       │   ├── forgot-password-page.tsx
│       │   └── layout.tsx
│       │
│       └── ui/                    # Thành phần shadcn UI
│           ├── button.tsx
│           ├── dialog.tsx
│           └── ...
│
├── supabase/                      # Backend / Cơ sở dữ liệu
│   ├── config.toml                # Cấu hình Supabase cục bộ ⭐
│   ├── seed.sql                   # Dữ liệu demo
│   │
│   ├── migrations/                # Thay đổi lược đồ DB
│   │   ├── 20240730075029_init_db.sql
│   │   ├── 20240730075425_init_triggers.sql
│   │   └── ...
│   │
│   ├── functions/                 # Edge Functions (Deno/Node.js)
│   │   ├── updatePassword/        # Logic đặt lại mật khẩu
│   │   ├── users/
│   │   ├── postmark/              # Tích hợp email
│   │   └── _shared/               # Tiện ích chung
│   │
│   └── templates/                 # Mẫu email
│       ├── invite.html
│       └── recovery.html
│
├── public/                        # Tài sản tĩnh
│   ├── auth-callback.html         # Trình xử lý gọi lại OAuth
│   └── img/
│
├── scripts/                       # Script xây dựng & triển khai
│   ├── generate-registry.mjs
│   ├── ghpages-deploy.mjs
│   └── supabase-remote-init.mjs
│
├── package.json                   # Phụ thuộc Node.js
├── vite.config.ts                 # Cấu hình xây dựng Vite ⭐
├── tsconfig.json                  # Cấu hình TypeScript
├── vercel.json                    # Cấu hình triển khai Vercel
└── makefile                       # Lệnh phát triển
```

---

## 🔄 APPLICATION FLOW / LUỒNG ỨNG DỤNG

### English: User Login Flow
```
1. User visits application
   ↓
2. index.html loads
   ↓
3. main.tsx executes
   ├─ Create React root
   ├─ Render <App />
   └─ Render <CRM />
   ↓
4. CRM component initializes
   ├─ Load Supabase client
   ├─ Setup AuthProvider
   ├─ Setup DataProvider
   └─ Wrap with providers
   ↓
5. checkAuth() runs
   ├─ No session found → Show login page
   └─ Session found → Show dashboard
   ↓
6. User enters email + password
   ↓
7. authProvider.login() called
   ├─ Send credentials to Supabase Auth
   ├─ Validate credentials
   ├─ Return access_token + refresh_token
   └─ Save to localStorage
   ↓
8. User authenticated
   ├─ getIdentity() called
   ├─ Fetch user info (sales record)
   └─ Return { id, fullName, avatar }
   ↓
9. Redirect to dashboard
   ↓
10. Render protected pages (Contacts, Deals, etc.)
```

### Tiếng Việt: Luồng Đăng Nhập Của Người Dùng
```
1. Người dùng truy cập ứng dụng
   ↓
2. index.html tải
   ↓
3. main.tsx thực thi
   ├─ Tạo gốc React
   ├─ Render <App />
   └─ Render <CRM />
   ↓
4. Thành phần CRM khởi tạo
   ├─ Tải client Supabase
   ├─ Thiết lập AuthProvider
   ├─ Thiết lập DataProvider
   └─ Bao bọc với các nhà cung cấp
   ↓
5. checkAuth() chạy
   ├─ Không tìm thấy phiên → Hiển thị trang đăng nhập
   └─ Tìm thấy phiên → Hiển thị bảng điều khiển
   ↓
6. Người dùng nhập email + mật khẩu
   ↓
7. authProvider.login() được gọi
   ├─ Gửi thông tin xác thực đến Supabase Auth
   ├─ Xác thực thông tin xác thực
   ├─ Trả về access_token + refresh_token
   └─ Lưu vào localStorage
   ↓
8. Người dùng được xác thực
   ├─ getIdentity() được gọi
   ├─ Tìm nạp thông tin người dùng (bản ghi bán hàng)
   └─ Trả về { id, fullName, avatar }
   ↓
9. Chuyển hướng đến bảng điều khiển
   ↓
10. Render các trang được bảo vệ (Liên hệ, Thương vụ, v.v.)
```

---

### English: Password Reset Flow
```
1. User navigates to login page
   ↓
2. Clicks "Forgot Password" link
   ↓
3. ForgotPasswordPage renders
   ├─ Show email input field
   └─ Show submit button
   ↓
4. User enters email address
   ↓
5. Calls updatePassword edge function
   ├─ Receives email
   ├─ Calls supabaseAdmin.auth.resetPasswordForEmail(email)
   └─ Supabase generates recovery link
   ↓
6. Email sent with recovery link:
   "https://yourdomain/auth-callback.html?
    access_token=ABC123...&refresh_token=XYZ789..."
   ↓
7. User receives email
   ↓
8. User clicks recovery link
   ↓
9. auth-callback.html loads
   ├─ Extract tokens from URL
   ├─ Process Supabase callback
   ├─ Redirect to /set-password with tokens in URL
   └─ Clear URL history state
   ↓
10. SetPasswordPage renders
    ├─ useSupabaseAccessToken() parses tokens
    ├─ Validates tokens exist
    ├─ Shows password form if valid
    └─ Shows error if tokens missing
    ↓
11. User enters new password
    ├─ Validates password strength
    ├─ Validates confirmation matches
    └─ Calls setPassword()
    ↓
12. setPassword() mutation
    ├─ Send to Supabase:
    │  - access_token
    │  - refresh_token
    │  - new password
    └─ Supabase validates + updates
    ↓
13. Success notification shown
    ↓
14. User redirected to login
```

### Tiếng Việt: Luồng Đặt Lại Mật Khẩu
```
1. Người dùng điều hướng đến trang đăng nhập
   ↓
2. Nhấp liên kết "Quên mật khẩu"
   ↓
3. ForgotPasswordPage render
   ├─ Hiển thị trường nhập email
   └─ Hiển thị nút gửi
   ↓
4. Người dùng nhập địa chỉ email
   ↓
5. Gọi hàm updatePassword edge
   ├─ Nhận email
   ├─ Gọi supabaseAdmin.auth.resetPasswordForEmail(email)
   └─ Supabase tạo liên kết khôi phục
   ↓
6. Email được gửi với liên kết khôi phục:
   "https://yourdomain/auth-callback.html?
    access_token=ABC123...&refresh_token=XYZ789..."
   ↓
7. Người dùng nhận email
   ↓
8. Người dùng nhấp liên kết khôi phục
   ↓
9. auth-callback.html tải
   ├─ Trích xuất token từ URL
   ├─ Xử lý gọi lại Supabase
   ├─ Chuyển hướng đến /set-password với token trong URL
   └─ Xóa trạng thái lịch sử URL
   ↓
10. SetPasswordPage render
    ├─ useSupabaseAccessToken() phân tích token
    ├─ Xác thực token tồn tại
    ├─ Hiển thị biểu mẫu nếu hợp lệ
    └─ Hiển thị lỗi nếu thiếu token
    ↓
11. Người dùng nhập mật khẩu mới
    ├─ Xác thực độ mạnh mật khẩu
    ├─ Xác thực xác nhận khớp
    └─ Gọi setPassword()
    ↓
12. setPassword() mutation
    ├─ Gửi đến Supabase:
    │  - access_token
    │  - refresh_token
    │  - mật khẩu mới
    └─ Supabase xác thực + cập nhật
    ↓
13. Thông báo thành công hiển thị
    ↓
14. Người dùng chuyển hướng đến đăng nhập
```

---

### English: Contact List CRUD Flow
```
1. User clicks "Contacts" in sidebar
   ↓
2. ContactListView component renders
   ├─ Calls dataProvider.getList('contacts', {
   │  pagination: { page: 1, perPage: 25 },
   │  sort: { field: 'id', order: 'DESC' },
   │  filter: { ... }
   └─ })
   ↓
3. dataProvider calls Supabase
   ├─ supabase.from('contacts').select('*')
   ├─ Apply filters
   ├─ Apply sorting
   ├─ Apply pagination
   └─ Return { data: [...], total: 523 }
   ↓
4. React Query caches results
   ↓
5. DataGrid renders with:
   ├─ 25 rows per page
   ├─ Sorting icons
   ├─ Filter chips
   ├─ Pagination controls
   └─ Row action buttons (Edit, Delete)
   ↓
6. User clicks Edit on a row
   ↓
7. ContactEditView renders
   ├─ Calls dataProvider.getOne('contacts', { id: 123 })
   ├─ Supabase fetches single record
   └─ Form populates with data
   ↓
8. User modifies fields
   ├─ first_name: "John"
   ├─ last_name: "Doe"
   ├─ email: { emails: ['john@example.com'] }
   └─ status: "active"
   ↓
9. User clicks Save button
   ↓
10. Form validation runs
    ├─ Checks required fields
    ├─ Validates email format
    └─ Shows error if invalid
    ↓
11. Calls dataProvider.update('contacts', {
    id: 123,
    data: { first_name: "John", ... }
    })
    ↓
12. dataProvider calls Supabase
    ├─ supabase.from('contacts')
    │  .update(data)
    │  .eq('id', 123)
    └─ Returns updated record
    ↓
13. React Query invalidates cache
    ├─ Refetches list (if still visible)
    └─ Updates local cache
    ↓
14. Success notification shown
    ↓
15. Redirect back to list OR stay in edit
```

### Tiếng Việt: Luồng CRUD Danh Sách Liên Hệ
```
1. Người dùng nhấp "Liên hệ" trong thanh bên
   ↓
2. Thành phần ContactListView render
   ├─ Gọi dataProvider.getList('contacts', {
   │  pagination: { page: 1, perPage: 25 },
   │  sort: { field: 'id', order: 'DESC' },
   │  filter: { ... }
   └─ })
   ↓
3. dataProvider gọi Supabase
   ├─ supabase.from('contacts').select('*')
   ├─ Áp dụng bộ lọc
   ├─ Áp dụng sắp xếp
   ├─ Áp dụng phân trang
   └─ Trả về { data: [...], total: 523 }
   ↓
4. React Query lưu vào bộ nhớ cache
   ↓
5. DataGrid render với:
   ├─ 25 hàng mỗi trang
   ├─ Biểu tượng sắp xếp
   ├─ Chip lọc
   ├─ Điều khiển phân trang
   └─ Nút hành động hàng (Chỉnh sửa, Xóa)
   ↓
6. Người dùng nhấp Chỉnh sửa trên một hàng
   ↓
7. ContactEditView render
   ├─ Gọi dataProvider.getOne('contacts', { id: 123 })
   ├─ Supabase tìm nạp bản ghi đơn
   └─ Biểu mẫu điền với dữ liệu
   ↓
8. Người dùng sửa đổi các trường
   ├─ first_name: "John"
   ├─ last_name: "Doe"
   ├─ email: { emails: ['john@example.com'] }
   └─ status: "active"
   ↓
9. Người dùng nhấp nút Lưu
   ↓
10. Xác thực biểu mẫu chạy
    ├─ Kiểm tra trường bắt buộc
    ├─ Xác thực định dạng email
    └─ Hiển thị lỗi nếu không hợp lệ
    ↓
11. Gọi dataProvider.update('contacts', {
    id: 123,
    data: { first_name: "John", ... }
    })
    ↓
12. dataProvider gọi Supabase
    ├─ supabase.from('contacts')
    │  .update(data)
    │  .eq('id', 123)
    └─ Trả về bản ghi cập nhật
    ↓
13. React Query làm mất hiệu lực bộ nhớ cache
    ├─ Tìm nạp lại danh sách (nếu vẫn hiển thị)
    └─ Cập nhật bộ nhớ cache cục bộ
    ↓
14. Thông báo thành công hiển thị
    ↓
15. Chuyển hướng quay lại danh sách HOẶC ở lại chỉnh sửa
```

---

## 🗄️ DATABASE SCHEMA / LƯỢC ĐỒ CƠ SỞ DỮ LIỆU

### English

#### Core Tables
| Table | Purpose | Key Fields |
|-------|---------|-----------|
| **sales** | Users / Sales team members | id, user_id, first_name, last_name, email, avatar, administrator |
| **contacts** | Customer contacts | id, first_name, last_name, email (JSONB), phone (JSONB), company_id, status |
| **companies** | Customer companies | id, name, sector, sales_id, website, phone, description |
| **deals** | Sales opportunities | id, name, amount, status, company_id, sales_id, start_date, expected_close_date |
| **tasks** | Tasks & reminders | id, title, description, due_date, status, contact_id, sales_id |
| **contact_notes** | Notes on contacts | id, text, contact_id, sales_id, created_at |
| **deal_notes** | Notes on deals | id, text, deal_id, sales_id, created_at |
| **tags** | Tags for organizing | id, name, color |

#### Relationships (Foreign Keys)
```
contacts → companies (company_id)
contacts → sales (created by)
deals → companies (company_id)
deals → sales (sales_id)
tasks → contacts (contact_id)
tasks → sales (sales_id)
notes → contacts (contact_id)
notes → deals (deal_id)
notes → sales (sales_id)
```

### Tiếng Việt

#### Các Bảng Cốt Lõi
| Bảng | Mục đích | Các trường chính |
|-----|---------|-----------------|
| **sales** | Người dùng / Thành viên đội bán hàng | id, user_id, first_name, last_name, email, avatar, administrator |
| **contacts** | Liên hệ khách hàng | id, first_name, last_name, email (JSONB), phone (JSONB), company_id, status |
| **companies** | Công ty khách hàng | id, name, sector, sales_id, website, phone, description |
| **deals** | Cơ hội bán hàng | id, name, amount, status, company_id, sales_id, start_date, expected_close_date |
| **tasks** | Tác vụ & Nhắc nhở | id, title, description, due_date, status, contact_id, sales_id |
| **contact_notes** | Ghi chú về liên hệ | id, text, contact_id, sales_id, created_at |
| **deal_notes** | Ghi chú về thương vụ | id, text, deal_id, sales_id, created_at |
| **tags** | Thẻ để tổ chức | id, name, color |

#### Mối Quan Hệ (Khóa Ngoài)
```
contacts → companies (company_id)
contacts → sales (tạo bởi)
deals → companies (company_id)
deals → sales (sales_id)
tasks → contacts (contact_id)
tasks → sales (sales_id)
notes → contacts (contact_id)
notes → deals (deal_id)
notes → sales (sales_id)
```

---

## 🔐 AUTHENTICATION & AUTHORIZATION / XÁC THỰC & PHÂN QUYỀN

### English
```typescript
// Authentication Providers
const authProvider = {
  // Email/Password (Supabase)
  login(credentials) → { access_token, refresh_token }
  
  // OAuth (Google, Azure, Keycloak, Auth0)
  getAuthorizationUrl() → OAuth consent page
  handleCallback() → Create session
  
  // Methods
  logout() → Clear session
  checkAuth() → Verify token valid
  getIdentity() → Get user info
  canAccess(params) → Check role-based access
}

// Authorization: Role-based Access Control (RBAC)
- admin: Full access to all features
- user: Limited access (own data only)
```

### Tiếng Việt
```typescript
// Nhà cung cấp xác thực
const authProvider = {
  // Email/Mật khẩu (Supabase)
  login(credentials) → { access_token, refresh_token }
  
  // OAuth (Google, Azure, Keycloak, Auth0)
  getAuthorizationUrl() → Trang đồng ý OAuth
  handleCallback() → Tạo phiên
  
  // Phương thức
  logout() → Xóa phiên
  checkAuth() → Xác thực token hợp lệ
  getIdentity() → Lấy thông tin người dùng
  canAccess(params) → Kiểm tra quyền truy cập dựa trên vai trò
}

// Phân quyền: Kiểm soát truy cập dựa trên vai trò (RBAC)
- admin: Quyền truy cập đầy đủ vào tất cả các tính năng
- user: Quyền truy cập hạn chế (chỉ dữ liệu riêng)
```

---

## 🚀 DEVELOPMENT WORKFLOW / QUY TRÌNH PHÁT TRIỂN

### English

#### Starting Development
```bash
# Install dependencies
make install
# or: npm install && supabase start

# Start dev server
make start
# Starts:
# - Frontend: http://localhost:5173
# - Supabase: http://localhost:54321
# - Supabase Studio: http://localhost:54323
```

#### File Organization
```
Creating new feature (e.g., new contact field):

1. Update Database Schema
   - Create migration: supabase/migrations/TIMESTAMP_feature_name.sql
   - Add new column to contacts table
   - Run: supabase db push

2. Update Frontend Components
   - Add field to form: src/components/atomic-crm/contacts/ContactEdit.tsx
   - Update validation logic
   - Add to data table columns

3. Update Data Provider
   - Modify dataProvider to handle new field if needed
   - Add to getList/getOne queries

4. Test locally
   - Verify form saves correctly
   - Check data displays in table
   - Test with different data types
```

### Tiếng Việt

#### Bắt Đầu Phát Triển
```bash
# Cài đặt phụ thuộc
make install
# hoặc: npm install && supabase start

# Bắt đầu máy chủ phát triển
make start
# Bắt đầu:
# - Frontend: http://localhost:5173
# - Supabase: http://localhost:54321
# - Supabase Studio: http://localhost:54323
```

#### Tổ Chức Tệp
```
Tạo tính năng mới (ví dụ: trường liên hệ mới):

1. Cập nhật Lược Đồ Cơ Sở Dữ Liệu
   - Tạo di chuyển: supabase/migrations/TIMESTAMP_feature_name.sql
   - Thêm cột mới vào bảng contacts
   - Chạy: supabase db push

2. Cập Nhật Thành Phần Frontend
   - Thêm trường vào biểu mẫu: src/components/atomic-crm/contacts/ContactEdit.tsx
   - Cập nhật logic xác thực
   - Thêm vào cột bảng dữ liệu

3. Cập Nhật Nhà Cung Cấp Dữ Liệu
   - Sửa đổi dataProvider để xử lý trường mới nếu cần
   - Thêm vào truy vấn getList/getOne

4. Kiểm tra cục bộ
   - Xác thực biểu mẫu lưu chính xác
   - Kiểm tra dữ liệu hiển thị trong bảng
   - Kiểm tra với các loại dữ liệu khác nhau
```

---

## 📚 KEY TECHNOLOGIES / CÁC CÔNG NGHỆ CHÍNH

### English
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 18 | UI library |
| **Language** | TypeScript | Type safety |
| **Build Tool** | Vite | Fast bundling |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **UI Components** | shadcn-admin-kit | Pre-built UI components |
| **UI Primitives** | Radix UI | Accessible components |
| **Admin Framework** | react-admin (ra-core) | Admin dashboard framework |
| **State Management** | React Query | Server state management |
| **Forms** | React Hook Form | Form handling |
| **Database** | PostgreSQL | Relational database |
| **Backend Service** | Supabase | BaaS (Backend as a Service) |
| **Auth** | Supabase Auth | Authentication |
| **Edge Functions** | Deno | Serverless functions |
| **Email** | Postmark | Email delivery |
| **Hosting** | Vercel | Frontend hosting |
| **Version Control** | Git | Code versioning |
| **Code Quality** | ESLint, Prettier | Linting & formatting |

### Tiếng Việt
| Tầng | Công nghệ | Mục đích |
|-----|----------|---------|
| **Khung Frontend** | React 18 | Thư viện UI |
| **Ngôn ngữ** | TypeScript | An toàn kiểu |
| **Công cụ Xây dựng** | Vite | Gói nhanh |
| **Tạo kiểu** | Tailwind CSS | CSS tiện ích trước tiên |
| **Thành phần UI** | shadcn-admin-kit | Thành phần UI được xây dựng sẵn |
| **Nguyên thủy UI** | Radix UI | Thành phần có thể truy cập |
| **Khung Admin** | react-admin (ra-core) | Khung bảng điều khiển admin |
| **Quản lý Trạng thái** | React Query | Quản lý trạng thái máy chủ |
| **Biểu mẫu** | React Hook Form | Xử lý biểu mẫu |
| **Cơ sở dữ liệu** | PostgreSQL | Cơ sở dữ liệu quan hệ |
| **Dịch vụ Backend** | Supabase | BaaS (Backend as a Service) |
| **Xác thực** | Supabase Auth | Xác thực |
| **Edge Functions** | Deno | Chức năng không máy chủ |
| **Email** | Postmark | Gửi email |
| **Hosting** | Vercel | Lưu trữ Frontend |
| **Kiểm soát Phiên bản** | Git | Sửa đổi mã |
| **Chất lượng Mã** | ESLint, Prettier | Linting & định dạng |

---

## 🔄 DATA PROVIDER PATTERN / MẪU NHÀ CUNG CẤP DỮ LIỆU

### English
```typescript
interface DataProvider {
  // Read operations
  getList(resource, params) → { data: [], total: 100 }
  getOne(resource, params) → { data: {...} }
  getMany(resource, params) → { data: [{...}, {...}] }
  
  // Write operations
  create(resource, params) → { data: {...} }
  update(resource, params) → { data: {...} }
  deleteMany(resource, params) → { data: [...] }
  
  // Special operations
  getManyReference(resource, params) → { data: [], total: 10 }
}

// Example usage:
const { data: contacts } = await dataProvider.getList('contacts', {
  pagination: { page: 1, perPage: 25 },
  sort: { field: 'name', order: 'ASC' },
  filter: { status: 'active' }
})
```

### Tiếng Việt
```typescript
interface DataProvider {
  // Thao tác đọc
  getList(resource, params) → { data: [], total: 100 }
  getOne(resource, params) → { data: {...} }
  getMany(resource, params) → { data: [{...}, {...}] }
  
  // Thao tác ghi
  create(resource, params) → { data: {...} }
  update(resource, params) → { data: {...} }
  deleteMany(resource, params) → { data: [...] }
  
  // Thao tác đặc biệt
  getManyReference(resource, params) → { data: [], total: 10 }
}

// Ví dụ sử dụng:
const { data: contacts } = await dataProvider.getList('contacts', {
  pagination: { page: 1, perPage: 25 },
  sort: { field: 'name', order: 'ASC' },
  filter: { status: 'active' }
})
```

---

## 📖 COMMON PATTERNS & BEST PRACTICES / MẪU & THỰC HÀNH TỐTnhất PHỔ BIẾN

### English

#### 1. Component Organization
```
Each feature folder contains:
- ListComponent (display records)
- CreateComponent (add new)
- EditComponent (modify existing)
- ShowComponent (detail view)
- Types/Interfaces (TypeScript types)

Example (contacts):
contacts/
├── ContactList.tsx
├── ContactCreate.tsx
├── ContactEdit.tsx
├── ContactShow.tsx
└── types.ts
```

#### 2. Hooks Usage
```typescript
// Use react-admin hooks
import { useList, useCreate, useUpdate } from 'ra-core'

// In component:
const { data, isLoading } = useList('contacts')
const [create] = useCreate()

// Or react-query
import { useQuery, useMutation } from '@tanstack/react-query'
```

#### 3. Form Validation
```typescript
const validate = (values: FormData) => {
  const errors: FormErrors = {}
  
  if (!values.email) errors.email = 'Email required'
  if (values.email && !isValidEmail(values.email)) {
    errors.email = 'Invalid email format'
  }
  
  return errors
}
```

### Tiếng Việt

#### 1. Tổ Chức Thành Phần
```
Mỗi thư mục tính năng chứa:
- ListComponent (hiển thị bản ghi)
- CreateComponent (thêm mới)
- EditComponent (sửa đổi hiện có)
- ShowComponent (xem chi tiết)
- Types/Interfaces (kiểu TypeScript)

Ví dụ (contacts):
contacts/
├── ContactList.tsx
├── ContactCreate.tsx
├── ContactEdit.tsx
├── ContactShow.tsx
└── types.ts
```

#### 2. Sử Dụng Hooks
```typescript
// Sử dụng react-admin hooks
import { useList, useCreate, useUpdate } from 'ra-core'

// Trong thành phần:
const { data, isLoading } = useList('contacts')
const [create] = useCreate()

// Hoặc react-query
import { useQuery, useMutation } from '@tanstack/react-query'
```

#### 3. Xác Thực Biểu Mẫu
```typescript
const validate = (values: FormData) => {
  const errors: FormErrors = {}
  
  if (!values.email) errors.email = 'Yêu cầu email'
  if (values.email && !isValidEmail(values.email)) {
    errors.email = 'Định dạng email không hợp lệ'
  }
  
  return errors
}
```

---

## 🐛 DEBUGGING & TROUBLESHOOTING / GỠ LỖI & KHẮC PHỤC SỰ CỐ

### English

#### Common Issues

**Issue: Set Password Not Working on Vercel**
- **Cause**: Supabase email link using wrong domain (localhost instead of Vercel domain)
- **Solution**: 
  1. Go to Supabase Dashboard → Project Settings → Auth
  2. Update Site URL to your Vercel domain: `https://your-domain.vercel.app`
  3. Re-test password reset

**Issue: CORS Errors**
- **Cause**: Frontend and backend on different domains
- **Solution**: Supabase CORS handled automatically, check environment variables

**Issue: Token Expired**
- **Cause**: Access token expired (default 1 hour)
- **Solution**: Refresh token logic handles this automatically

### Tiếng Việt

#### Vấn Đề Phổ Biến

**Vấn đề: Đặt lại mật khẩu không hoạt động trên Vercel**
- **Nguyên nhân**: Liên kết email Supabase sử dụng miền sai (localhost thay vì miền Vercel)
- **Giải pháp**: 
  1. Vào Supabase Dashboard → Project Settings → Auth
  2. Cập nhật Site URL thành miền Vercel của bạn: `https://your-domain.vercel.app`
  3. Kiểm tra lại đặt lại mật khẩu

**Vấn đề: Lỗi CORS**
- **Nguyên nhân**: Frontend và backend trên các miền khác nhau
- **Giải pháp**: Supabase xử lý CORS tự động, kiểm tra biến môi trường

**Vấn đề: Token Hết Hạn**
- **Nguyên nhân**: Access token hết hạn (mặc định 1 giờ)
- **Giải pháp**: Logic token làm mới xử lý tự động

---

## 🚀 DEPLOYMENT / TRIỂN KHAI

### English

#### Local Development
```bash
make install    # Install everything
make start      # Start dev server
make build      # Build for production
```

#### Production (Vercel + Supabase)
```
1. Frontend: Vercel
   - Push to GitHub
   - Vercel auto-deploys
   - Set environment variables in Vercel dashboard:
     * VITE_SUPABASE_URL=https://xxxxx.supabase.co
     * VITE_SUPABASE_ANON_KEY=eyJ...

2. Backend: Supabase Cloud
   - Create project at supabase.com
   - Configure auth settings
   - Deploy edge functions
   - Set up email with Postmark
```

### Tiếng Việt

#### Phát Triển Cục Bộ
```bash
make install    # Cài đặt mọi thứ
make start      # Bắt đầu máy chủ phát triển
make build      # Xây dựng cho sản xuất
```

#### Sản Xuất (Vercel + Supabase)
```
1. Frontend: Vercel
   - Đẩy đến GitHub
   - Vercel triển khai tự động
   - Đặt biến môi trường trong bảng điều khiển Vercel:
     * VITE_SUPABASE_URL=https://xxxxx.supabase.co
     * VITE_SUPABASE_ANON_KEY=eyJ...

2. Backend: Supabase Cloud
   - Tạo dự án tại supabase.com
   - Cấu hình cài đặt xác thực
   - Triển khai các hàm edge
   - Thiết lập email bằng Postmark
```

---

## 📝 FILE DESCRIPTIONS / MÔ TẢ TỆP QUAN TRỌNG

### English

**Core Files:**
- `src/main.tsx` - React entry point, mounts app to DOM
- `src/App.tsx` - Root component wrapper
- `src/components/atomic-crm/root/CRM.tsx` - CRM setup, providers, routing
- `src/components/atomic-crm/providers/supabase/authProvider.ts` - Auth logic
- `src/components/atomic-crm/providers/supabase/dataProvider.ts` - CRUD operations
- `src/components/supabase/set-password-page.tsx` - Password reset UI
- `supabase/config.toml` - Database & auth configuration
- `vite.config.ts` - Build configuration
- `package.json` - Dependencies & scripts

### Tiếng Việt

**Tệp Cốt Lõi:**
- `src/main.tsx` - Điểm vào React, gắn ứng dụng vào DOM
- `src/App.tsx` - Thành phần gốc
- `src/components/atomic-crm/root/CRM.tsx` - Thiết lập CRM, nhà cung cấp, định tuyến
- `src/components/atomic-crm/providers/supabase/authProvider.ts` - Logic xác thực
- `src/components/atomic-crm/providers/supabase/dataProvider.ts` - Thao tác CRUD
- `src/components/supabase/set-password-page.tsx` - Giao diện đặt lại mật khẩu
- `supabase/config.toml` - Cấu hình cơ sở dữ liệu & xác thực
- `vite.config.ts` - Cấu hình xây dựng
- `package.json` - Phụ thuộc & script

---

## 🎓 LEARNING PATH / LỘ TRÌNH HỌC

### English

**For Beginners:**
1. Understand React fundamentals (components, hooks, state)
2. Learn TypeScript basics (types, interfaces)
3. Study the CRM.tsx file to understand the structure
4. Explore ContactList/ContactEdit components
5. Learn how data flows from API to components

**For Intermediate:**
1. Understand react-admin (ra-core) framework
2. Learn data provider pattern
3. Understand authentication flow
4. Study Supabase integration
5. Learn to add new features

**For Advanced:**
1. Customize data provider
2. Implement custom validators
3. Create custom UI components
4. Deploy to production
5. Optimize performance

### Tiếng Việt

**Cho Người Mới Bắt Đầu:**
1. Hiểu những điều cơ bản của React (thành phần, hook, trạng thái)
2. Học những điều cơ bản của TypeScript (kiểu, giao diện)
3. Nghiên cứu tệp CRM.tsx để hiểu cấu trúc
4. Khám phá các thành phần ContactList/ContactEdit
5. Tìm hiểu cách dòng dữ liệu từ API đến các thành phần

**Cho Người Trung Gian:**
1. Hiểu khung react-admin (ra-core)
2. Tìm hiểu mẫu nhà cung cấp dữ liệu
3. Hiểu luồng xác thực
4. Nghiên cứu tích hợp Supabase
5. Học cách thêm tính năng mới

**Cho Người Nâng Cao:**
1. Tùy chỉnh nhà cung cấp dữ liệu
2. Triển khai trình xác thực tùy chỉnh
3. Tạo thành phần UI tùy chỉnh
4. Triển khai cho sản xuất
5. Tối ưu hóa hiệu suất

---

**End of Documentation / Kết thúc Tài Liệu**
