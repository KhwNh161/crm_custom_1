import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useDataProvider, useLogin, useNotify } from "ra-core";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { CrmDataProvider } from "../providers/types";
import { useConfigurationContext } from "../root/ConfigurationContext";
import type { SignUpData } from "../types";

export const SignupPage = () => {
  const queryClient = useQueryClient();
  const dataProvider = useDataProvider<CrmDataProvider>();
  const { lightModeLogo, title } = useConfigurationContext();

  const login = useLogin();
  const notify = useNotify();

  const { isPending: isSignUpPending, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignUpData) => {
      return dataProvider.signUp(data);
    },
    onSuccess: (data) => {
      login({
        email: data.email,
        password: data.password,
        redirectTo: "/contacts",
      }).then(() => {
        notify("Initial user successfully created");
        queryClient.invalidateQueries({
          queryKey: ["auth", "canAccess"],
        });
      });
    },
    onError: () => {
      notify("An error occurred. Please try again.");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignUpData>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    mutate(data);
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

      {/* --- CỘT PHẢI: LOGO & FORM ĐĂNG KÝ (6/10) --- */}
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
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Đăng ký tài khoản</h1>
            <p className="text-base text-gray-500">Tạo tài khoản để bắt đầu sử dụng CRM</p>
          </div>

          <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Tên */}
            <div className="space-y-2 w-3/4">
              <label htmlFor="first_name" className="text-xs font-bold text-black">Tên</label>
              <Input
                {...register("first_name", { required: true })}
                id="first_name"
                type="text"
                required
                className="flex h-9 w-full rounded-full border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 transition-all"
                placeholder="Tên của bạn"
              />
            </div>

            {/* Họ */}
            <div className="space-y-2 w-3/4">
              <label htmlFor="last_name" className="text-xs font-bold text-black">Họ</label>
              <Input
                {...register("last_name", { required: true })}
                id="last_name"
                type="text"
                required
                className="flex h-9 w-full rounded-full border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 transition-all"
                placeholder="Họ của bạn"
              />
            </div>
            
            {/* Email */}
            <div className="space-y-2 w-3/4">
              <label htmlFor="email" className="text-xs font-bold text-black">Địa chỉ Email</label>
              <Input
                {...register("email", { required: true })}
                id="email"
                type="email"
                required
                className="flex h-9 w-full rounded-full border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 transition-all"
                placeholder="Email của bạn"
              />
            </div>
            
            {/* Mật khẩu */}
            <div className="space-y-2 w-3/4">
              <label htmlFor="password" className="text-xs font-bold text-black">Mật khẩu</label>
              <Input
                {...register("password", { required: true })}
                id="password"
                type="password"
                required
                className="flex h-9 w-full rounded-full border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 transition-all"
                placeholder="Mật khẩu của bạn"
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={!isValid || isSignUpPending}
              className="w-3/4 h-9 rounded-full bg-black text-white font-bold text-xs hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {isSignUpPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Đang xử lý...
                </>
              ) : (
                "Đăng ký"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-bold text-sm text-black hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

SignupPage.path = "/sign-up";