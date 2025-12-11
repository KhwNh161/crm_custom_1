import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useDataProvider, useLogin, useNotify } from "ra-core";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { CrmDataProvider } from "../providers/types";
import { useConfigurationContext } from "../root/ConfigurationContext";
import type { SignUpData } from "../types";
import { LoginSkeleton } from "./LoginSkeleton";

export const SignupPage = () => {
  const queryClient = useQueryClient();
  const dataProvider = useDataProvider<CrmDataProvider>();
  const { lightModeLogo, title } = useConfigurationContext();
  const { data: isInitialized, isPending } = useQuery({
    queryKey: ["init"],
    queryFn: async () => {
      return dataProvider.isInitialized();
    },
  });

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

  const login = useLogin();
  const notify = useNotify();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignUpData>({
    mode: "onChange",
  });

  if (isPending) {
    return <LoginSkeleton />;
  }

  // For the moment, we only allow one user to sign up. Other users must be created by the administrator.
  if (isInitialized) {
    return <Navigate to="/login" />;
  }

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    mutate(data);
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-white lg:grid lg:grid-cols-[4fr_6fr] overflow-hidden">
      
      {/* CỘT TRÁI: HÌNH ẢNH (4/10) */}
      <div className="hidden lg:flex relative h-full w-full flex-col bg-zinc-900 text-white p-6 justify-end">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/signin.png')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
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

      {/* CỘT PHẢI: LOGO & FORM ĐĂNG KÝ (6/10) */}
      <div className="flex flex-col h-full w-full bg-white text-black p-12 relative overflow-y-auto">
        
        {/* Logo góc trái trên */}
        <div className="absolute top-9 left-11">
          <img 
            className="h-7" 
            src={lightModeLogo} 
            alt={title} 
          />
        </div>

        <div className="w-full max-w-[400px] space-y-6 m-auto">
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Đăng ký tài khoản</h1>
            <p className="text-base text-gray-500">Tạo tài khoản người dùng đầu tiên để hoàn tất cài đặt</p>
          </div>

          <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Tên */}
            <div className="space-y-2 w-3/4">
              <label htmlFor="first_name" className="text-xs font-bold">Tên</label>
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
              <label htmlFor="last_name" className="text-xs font-bold">Họ</label>
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
              <label htmlFor="email" className="text-xs font-bold">Địa chỉ Email</label>
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
              <label htmlFor="password" className="text-xs font-bold">Mật khẩu</label>
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
            <button
              type="submit"
              disabled={!isValid || isSignUpPending}
              className="w-3/4 h-9 rounded-full bg-black text-white font-bold text-xs disabled:opacity-50 transition-all duration-300 relative overflow-hidden group"
              style={{
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700" />
              <span className="relative z-10 flex items-center justify-center h-full">
                {isSignUpPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Đang xử lý...
                  </>
                ) : (
                  "Tạo tài khoản"
                )}
              </span>
              <style>{`
                button:not(:disabled):hover {
                  transform: translateY(-2px);
                  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
                }
                button:not(:disabled):active {
                  transform: translateY(0);
                  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
                }
              `}</style>
            </button>
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