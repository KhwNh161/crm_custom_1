import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// Đảm bảo đường dẫn này đúng với cấu trúc thư mục của bạn
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts'

console.log("Webhook Contact Listener is running!")

// Thêm ': Request' để sửa lỗi implicit any
serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const secret = req.headers.get('x-api-secret')
    // Sửa lỗi Deno đỏ bằng cách kệ nó, hoặc dùng Deno.env.get nếu server hiểu
    const correctSecret = Deno.env.get('APP_TO_CRM_SECRET')

    if (!correctSecret || secret !== correctSecret) {
      return new Response(JSON.stringify({ error: 'Sai mật khẩu kết nối (Secret)' }), { 
        status: 401,
        headers: { "Content-Type": "application/json" }
      })
    }

    const { email, first_name, last_name, phone } = await req.json()

    if (!email) {
      return new Response(JSON.stringify({ error: 'Thiếu email' }), { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('contacts')
      .insert([
        {
          email: email,
          first_name: first_name || '',
          last_name: last_name || '',
          phone_1_number: phone || '',
          status: 'new',
          sales_id: null // Để null chờ chia số
        }
      ])
      .select()

    if (error) {
      console.error("Lỗi ghi DB:", error)
      throw error
    }

    return new Response(JSON.stringify({ success: true, data: data }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    })

  } catch (error: any) { // <-- QUAN TRỌNG: Thêm : any vào đây để sửa lỗi dòng 63
    return new Response(JSON.stringify({ error: error.message || String(error) }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    })
  }
})