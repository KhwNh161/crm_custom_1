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
  const [language, setLanguage] = useState("vi");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
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

  const languages = [
    { code: "vi", name: "Tiếng Việt (Việt Nam)", flag: "🇻🇳" },
    { code: "en", name: "English (US)", flag: "🇺🇸" },
    { code: "ja", name: "日本語 (Japanese)", flag: "🇯🇵" },
    { code: "zh", name: "中文 (Chinese)", flag: "🇨🇳" },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-white lg:grid lg:grid-cols-[4fr_6fr] overflow-hidden">
      
      {/* CỘT TRÁI: HÌNH ẢNH */}
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

      {/* CỘT PHẢI: LOGO & FORM ĐĂNG NHẬP */}
      <div className="flex flex-col h-full w-full bg-white text-black p-12 relative">
        
        {/* Logo góc trái trên */}
        <div className="absolute top-9 left-11">
          <img 
            className="h-7" 
            src={lightModeLogo} 
            alt={title} 
          />
        </div>

        {/* Language Selector góc phải trên */}
        <div className="absolute top-9 right-11">
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              <span className="text-lg">{currentLanguage.flag}</span>
              <span className="font-medium">{currentLanguage.name}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showLanguageDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageDropdown(false);
                      // TODO: Thêm logic thay đổi ngôn ngữ thực tế ở đây
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left ${
                      language === lang.code ? 'bg-gray-50' : ''
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                    {language === lang.code && (
                      <svg className="w-4 h-4 ml-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full max-w-[400px] space-y-8 m-auto">
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Đăng nhập CRM</h1>
            <p className="text-base text-gray-500">Quản lý hệ thống CRM chuyên nghiệp</p>
          </div>

          <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
            
            {/* Google Login Button - Disabled */}
            <button
              type="button"
              disabled
              className="w-3/4 h-9 rounded-full bg-gray-200 text-gray-400 font-bold text-xs opacity-50 cursor-not-allowed flex items-center justify-center gap-2 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Tiếp tục với Google</span>
            </button>

            {/* Divider */}
            <div className="w-3/4 flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-400 font-medium">HOẶC</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
           
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
              className="w-3/4 h-9 rounded-full bg-black text-white font-bold text-xs disabled:opacity-50 transition-all duration-300 relative overflow-hidden group"
              style={{
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700" />
              <span className="relative z-10 flex items-center justify-center h-full">
                {loading ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⟳</span>
                    Đang xử lý...
                  </>
                ) : (
                  "Đăng nhập"
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