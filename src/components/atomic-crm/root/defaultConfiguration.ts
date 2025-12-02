import { Mars, NonBinary, Venus } from "lucide-react";

export const defaultDarkModeLogo = "./logos/logo_atomic_crm_dark.svg";
export const defaultLightModeLogo = "./logos/logo_atomic_crm_light.svg";

export const defaultTitle = "Miagent.io";

export const defaultCompanySectors = [
  "Dịch vụ Truyền thông",
  "Tiêu dùng không thiết yếu",
  "Tiêu dùng thiết yếu",
  "Năng lượng",
  "Tài chính",
  "Chăm sóc sức khỏe",
  "Công nghiệp",
  "Công nghệ thông tin",
  "Vật liệu",
  "Bất động sản",
  "Tiện ích",
];

export const defaultDealStages = [
  { value: "opportunity", label: "Tiềm năng" },
  { value: "proposal-sent", label: "Đã gửi đề xuất báo giá" },
  { value: "in-negociation", label: "Đang thương lượng" },
  { value: "won", label: "Thu về" },
  { value: "lost", label: "Mất mát" },
  { value: "delayed", label: "Trì hoãn" },
];

export const defaultDealPipelineStatuses = ["won"];

export const defaultDealCategories = [
  "Khác",
  "In ấn",
  "In dự án",
  "Thiết kế UI",
  "Thiết kế Website",
];

export const defaultNoteStatuses = [
  { value: "cold", label: "Cold", color: "#7dbde8" },
  { value: "warm", label: "Warm", color: "#e8cb7d" },
  { value: "hot", label: "Hot", color: "#e88b7d" },
  { value: "in-contract", label: "In Contract", color: "#a4e87d" },
];

export const defaultTaskTypes = [
  "None",
  "Gửi Email",
  "Demo Sản phẩm",
  "Ăn trưa",
  "Họp",
  "Liên hệ lại",
  "Cảm ơn",
  "Giao hàng",
  "Gọi điện",
];

export const defaultContactGender = [
  { value: "male", label: "Nam", icon: Mars },
  { value: "female", label: "Nữ", icon: Venus },
  { value: "nonbinary", label: "Tập thể", icon: NonBinary },
];
