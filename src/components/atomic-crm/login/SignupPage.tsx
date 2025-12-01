import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useDataProvider, useLogin, useNotify } from "ra-core";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { CrmDataProvider } from "../providers/types";
import { useConfigurationContext } from "../root/ConfigurationContext";
import type { SignUpData } from "../types";

export const SignupPage = () => {
  const queryClient = useQueryClient();
  const dataProvider = useDataProvider<CrmDataProvider>();
  const { darkModeLogo: logo, title } = useConfigurationContext();

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
        // FIXME: We should probably provide a hook for that in the ra-core package
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

  //  Bỏ phần kiểm tra isInitialized:
  //  Không dùng useQuery
  //Xóa useQuery + state isInitialized, isPending

 //Xóa Navigate + LoginSkeleton vì không dùng nữa.

//Bỏ điều kiện chặn:
// if (isInitialized) {
//   return <Navigate to="/login" />;
// }
  

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    mutate(data);
  };

  return (
    <div className="h-screen p-8">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt={title}
          width={24}
          className="filter brightness-0 invert"
        />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="h-full">
        <div className="max-w-sm mx-auto h-full flex flex-col justify-center gap-4">
          <h1 className="text-2xl font-bold mb-4">Chào mừng đến với Miagent.io CRM</h1>
          <p className="text-base mb-4">
            Tạo tài khoản người dùng đầu tiên để hoàn tất cài đặt.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="first_name">Tên</Label>
              <Input
                {...register("first_name", { required: true })}
                id="first_name"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="last_name">Họ</Label>
              <Input
                {...register("last_name", { required: true })}
                id="last_name"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                id="email"
                type="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                {...register("password", { required: true })}
                id="password"
                type="password"
                required
              />
            </div>
            <div className="flex justify-between items-center mt-8">
              <Button
                type="submit"
                disabled={!isValid || isSignUpPending}
                className="w-full"
              >
                {isSignUpPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

SignupPage.path = "/sign-up";
