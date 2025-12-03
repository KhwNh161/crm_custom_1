import { useState } from "react";
import { useLogin, useNotify } from "ra-core";
import { Link } from "react-router-dom";
import { useConfigurationContext } from "@/components/atomic-crm/root/ConfigurationContext";

export const LoginPage = () => {
  const { lightModeLogo, title } = useConfigurationContext();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  
  const login = useLogin();
  const notify = useNotify(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    login({ email, password }).catch((error) => {
      setLoading(false);
      notify(error?.message || "Đăng nhập thất bại", { type: 'error' });
    });
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-white lg:grid lg:grid-cols-[4fr_6fr] overflow-hidden">
      
     
      <div className="hidden lg:flex relative h-full w-full flex-col bg-zinc-900 text-white p-6 justify-end">
     
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/signin.png')" }} 
        />
       
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

      {/* --- CỘT PHẢI: LOGO & FORM ĐĂNG NHẬP (6/10) --- */}
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
            <h1 className="text-3xl font-bold">Đăng nhập CRM</h1>
            <p className="text-base text-gray-500">Quản lý hệ thống CRM chuyên nghiệp</p>
          </div>

          <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
            
           
            <div className="space-y-2 w-3/4"> 
              <label className="text-xs font-bold">Địa chỉ Email</label> 
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-9 w-full rounded-full border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 transition-all"
                placeholder="Email của bạn"
              />
            </div>
            
          
            <div className="space-y-2 w-3/4">
              <label className="text-xs font-bold">Mật khẩu</label> 
              <div className="relative"> 
                <input
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-9 w-full rounded-full border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 transition-all pr-10" 
                  placeholder="Mật khẩu của bạn"
                />
                
               
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <span className="text-xs">👀</span> 
                  ) : (
                    <span className="text-xs">😝</span> 
                  )}
                </div>
              </div>
            </div>

           
            <div className="flex items-center justify-end w-3/4">
              <Link 
                to="/forgot-password" 
                className="text-xs font-medium text-black hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            
            <button
              type="submit"
              disabled={loading}
              className="w-3/4 h-9 rounded-full bg-black text-white font-bold text-xs hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">
            Chưa có tài khoản?{" "}
            <Link to="/sign-up" className="font-bold text-sm text-black hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};