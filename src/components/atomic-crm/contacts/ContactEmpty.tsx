import { CreateButton } from "@/components/admin/create-button";

import useAppBarHeight from "../misc/useAppBarHeight";
import { ContactImportButton } from "./ContactImportButton";

export const ContactEmpty = () => {
  const appbarHeight = useAppBarHeight();
  return (
    <div
      className="flex flex-col justify-center items-center gap-3"
      style={{
        height: `calc(100dvh - ${appbarHeight}px)`,
      }}
    >
      <img src="./img/empty.svg" alt="Không tìm thấy liên hệ nào" />
      <div className="flex flex-col gap-0 items-center">
        <h6 className="text-lg font-bold">Không tìm thấy liên hệ nào</h6>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Có vẻ như danh sách liên hệ của bạn đang trống.
        </p>
      </div>
      <div className="flex flex-row gap-2">
        <CreateButton label="Tạo mới" />
        <ContactImportButton />
      </div>
    </div>
  );
};
