import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts'

console.log("Webhook Contact Listener (Clean Version) is running!")

serve(async (req: Request) => {
  // 1. Chỉ nhận lệnh POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    // 2. Lấy dữ liệu từ body
    const { email, first_name, last_name, phone } = await req.json()

    // Validate
    if (!email) {
      return new Response(JSON.stringify({ error: 'Thiếu email' }), { status: 400 })
    }

    // 3. Chuẩn bị dữ liệu insert
    const newContact = {
      first_name: first_name || 'Khach',
      last_name: last_name || 'Moi',
      gender: 'male',
      sales_id: 1, // ID của Admin hoặc Sale mặc định
      
      
      // Cấu trúc JSONB chuẩn cho Email
      email_jsonb: [
        {
          "type": "Work",
          "email": email
        }
      ],
      
      // Cấu trúc JSONB chuẩn cho Phone
      phone_jsonb: phone ? [
        {
          "type": "Work",
          "number": phone
        }
      ] : [],

      
      // bổ sung các trường khác
      first_seen: new Date().toISOString(),
      last_seen: new Date().toISOString(),
     
       "tags": [2]

      
      
    }

    // 4. Ghi vào DB
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .insert([newContact])
      .select()

    if (error) {
      console.error("Lỗi ghi DB:", error)
      throw error
    }

    return new Response(JSON.stringify({ success: true, data: data }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || String(error) }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    })
  }
})