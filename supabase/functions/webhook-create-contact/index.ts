import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts'

console.log("Webhook Contact Listener (JSONB Version) is running!")

serve(async (req: Request) => {
  // 1. Chỉ nhận lệnh POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    // 2. Nhận dữ liệu thô từ App (Google Login + Input SĐT)
    const { email, first_name, last_name, phone, avatar_url } = await req.json()

    // Validate cơ bản
    if (!email) {
      return new Response(JSON.stringify({ error: 'Thiếu email' }), { status: 400 })
    }

    // 3. Chuẩn bị dữ liệu theo đúng cấu trúc CRM yêu cầu (JSONB)
    const newContact = {
      first_name: first_name || 'Khach',
      last_name: last_name || 'Moi',
      gender: 'male', // Mặc định hoặc lấy từ Google nếu có
      sales_id: 1,    // Gán mặc định cho Admin (ID=1) như mẫu bạn gửi
      
      // QUAN TRỌNG: Đóng gói vào mảng JSONB như CRM yêu cầu
      email_jsonb: [
        {
          "type": "Work",
          "email": email
        }
      ],
      
      phone_jsonb: phone ? [
        {
          "type": "Work",
          "number": phone
        }
      ] : [], // Nếu không có sđt thì để mảng rỗng
      

      avatar: avatar_url ? { "src": avatar_url } : {},
      
      first_seen: new Date().toISOString(), // Đánh dấu thời gian tạo
      tags: ['App Register'] // Gắn thẻ để biết khách này từ App chui ra
    }

    // 4. Ghi vào bảng CONTACTS
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