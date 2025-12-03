import { useState } from "react";
import { useResetPassword } from "ra-supabase-core";
import { Form, required, useNotify, useTranslate } from "ra-core";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { TextInput } from "@/components/admin/text-input";
import { Button } from "@/components/ui/button";
import { useConfigurationContext } from "@/components/atomic-crm/root/ConfigurationContext";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
}

export const ForgotPasswordPage = () => {
  const { lightModeLogo, title } = useConfigurationContext();
  const [loading, setLoading] = useState(false);

  const notify = useNotify();
  const translate = useTranslate();
  const [, { mutateAsync: resetPassword }] = useResetPassword();

  const submit = async (values: FormData) => {
    try {
      setLoading(true);
      await resetPassword({
        email: values.email,
      });
    } catch (error: any) {
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message
            ? "ra.auth.sign_in_error"
            : error.message,
        {
          type: "warning",
          messageArgs: {
            _:
              typeof error === "string"
                ? error
                : error && error.message
                  ? error.message
                  : undefined,
          },
        },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-white lg:grid lg:grid-cols-[4fr_6fr] overflow-hidden">
      
      {/* --- CỘT TRÁI: HÌNH ẢNH (4/10) --- */}
      <div className="hidden lg:flex relative h-full w-full flex-col bg-zinc-900 text-white p-6 justify-end">
        {/* Hình nền */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/signin.png')" }} 
        />
        
        {/* Lớp phủ gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* PHẦN CHỮ */}
        <div className="relative z-20 mb-0">
          <blockquote className="space-y-3">
            <p className="text-lg font-bold leading-tight shadow-black drop-shadow-lg">
              Super AI Platform dành cho nhà bán lẻ.
            </p>
            <p className="text-xs font-medium leading-relaxed opacity-95 shadow-black drop-shadow-md">
              Giúp doanh nghiệp Việt Nam chuyển đổi số bằng AI, tối ưu doanh thu, giảm chi phí vận hành, và nâng cao trải nghiệm khách hàng.
            </p>
            <footer className="text-xs font-medium italic pt-1 shadow-black drop-shadow-md">
              Nguyễn Hải Long - CEO
            </footer>
          </blockquote>
        </div>
      </div>

      {/* --- CỘT PHẢI: LOGO & FORM QUÊN MẬT KHẨU (6/10) --- */}
      <div className="flex flex-col h-full w-full bg-white text-black p-12 relative">
        
        {/* Logo góc trái trên */}
        <div className="absolute top-9 left-11">
          <img 
            className="h-7" 
            src={lightModeLogo} 
            alt={title} 
          />
        </div>

        <div className="w-full max-w-[400px] space-y-8 m-auto">
          
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Quên mật khẩu?
            </h1>
            <p>
              Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Form<FormData>
              className="space-y-6 w-4/5"
              onSubmit={submit as SubmitHandler<FieldValues>}
            >
              <div className="space-y-2">
                <label className="text-xs font-bold text-black block">
                  Địa chỉ Email
                </label>
                <TextInput
                  source="email"
                  label=""
                  autoComplete="email"
                  validate={required()}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-9 rounded-full bg-black text-white font-bold text-xs hover:bg-gray-800 disabled:opacity-50 transition-colors cursor-pointer" 
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Gửi liên kết đặt lại"}
              </Button>
            </Form>
          </div>

          <div className="text-center text-sm text-gray-500">
            <Link to="/login" className="font-medium text-black hover:underline">
              ← Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ForgotPasswordPage.path = "forgot-password";