import { mergeTranslations } from "ra-core";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import { raSupabaseEnglishMessages } from "ra-supabase-language-english";

const raSupabaseEnglishMessagesOverride = {
  "ra-supabase": {
    auth: {
      password_reset: "Check your emails for a Reset Password message.",
    },
  },
};

// --- từ điển VI ---
const vietnameseMessages = {
    ra: {
        action: {
            add_filter: 'Thêm bộ lọc',
            clear_input_value: 'Xóa giá trị',
            clone: 'Sao chép',
            confirm: 'Xác nhận',
            create: 'Tạo mới',
            delete: 'Xóa',
            edit: 'Chỉnh sửa',
            archive : 'Lưu trữ',
            export: 'Xuất file',
            list: 'Danh sách',
            refresh: 'Làm mới',
            remove: 'Gỡ bỏ',
            save: 'Lưu',
            search: 'Tìm kiếm',
            show: 'Hiển thị',
            sort: 'Sắp xếp',
            undo: 'Hoàn tác',
            unselect: 'Bỏ chọn',
            expand: 'Mở rộng',
            close: 'Đóng',
            open_menu: 'Mở menu',
            close_menu: 'Đóng menu',
            import: 'Nhập file', 
        },
        page: {
            create: "Tạo mới %{name}",
            edit: "Chỉnh sửa %{name}",
            list: "Danh sách %{name}",
            show: "Chi tiết %{name}",
            dashboard: "Trang chủ",
            not_found: "Không tìm thấy",
            error: "Đã xảy ra lỗi",
        },
        sort: {
            
            ASC: 'tăng dần',
            DESC: 'giảm dần',
            sort_by: 'Sắp xếp theo %{field} %{order}', 
        },
        navigation: {
            no_results: 'Không tìm thấy kết quả nào',
            no_more_results: 'Đã hết kết quả',
            page_out_of_boundaries: 'Trang %{page} không tồn tại',
            page_range_info: '%{offsetBegin}-%{offsetEnd} của %{total}',
            page_rows_per_page: 'Số dòng mỗi trang:',
            next: 'Tiếp',
            prev: 'Trước',
        },
        message: {
            about: 'Giới thiệu',
            are_you_sure: 'Bạn có chắc chắn không?',
            bulk_delete_content: 'Bạn có chắc muốn xóa %{name} này? |||| Bạn có chắc muốn xóa %{smart_count} %{name} này?',
            bulk_delete_title: 'Xóa %{name} |||| Xóa %{smart_count} %{name}',
            delete_content: 'Bạn có chắc muốn xóa mục này?',
            delete_title: 'Xóa %{name} #%{id}',
            details: 'Chi tiết',
            error: 'Đã xảy ra lỗi bên phía client.',
            invalid_form: 'Dữ liệu nhập không hợp lệ. Vui lòng kiểm tra lại.',
            loading: 'Đang tải...',
            no: 'Không',
            not_found: 'Bạn gõ sai URL hoặc trang không tồn tại.',
            yes: 'Có',
            unsaved_changes: 'Một số thay đổi chưa được lưu. Bạn có chắc muốn bỏ qua?',
        },
        auth: {
            user_menu: 'Hồ sơ',
            logout: 'Đăng xuất',
        },
        notification: {
            updated: 'Cập nhật thành công',
            created: 'Tạo mới thành công',
            deleted: 'Đã xóa thành công',
            item_doesnt_exist: 'Mục này không tồn tại',
            http_error: 'Lỗi kết nối Server',
        },
        validation: {
            required: 'Bắt buộc nhập',
            minLength: 'Phải có ít nhất %{min} ký tự',
            maxLength: 'Không được quá %{max} ký tự',
            minValue: 'Phải lớn hơn hoặc bằng %{min}',
            maxValue: 'Phải nhỏ hơn hoặc bằng %{max}',
            number: 'Phải là số',
            email: 'Email không hợp lệ',
        },
    },
    
    // ---  ---
    resources: {
        companies: {
            name: 'Công ty |||| Công ty',
            fields: {
                // Thông tin chung
                name: 'Tên công ty',
                sector: 'Lĩnh vực',
                size: 'Quy mô',
                revenue: 'Doanh thu',
                tax_identifier: 'Mã số thuế',
                website: 'Website',
                linkedin_url: 'LinkedIn',
                phone_number: 'Số điện thoại',
                
                
                address: 'Địa chỉ',
                city: 'Thành phố',
                zipcode: 'Mã bưu chính',
                stateAbbr: 'Tỉnh/Bang',
                country: 'Quốc gia',
                
                
                description: 'Mô tả',
                context_links: 'Liên kết',
                sales_id: 'Người phụ trách',
                created_at: 'Ngày tạo',
                nb_contacts: 'Số lượng liên hệ',
            }
        },
        contacts: {
            name: 'Liên hệ |||| Liên hệ',
            fields: {
                first_name: 'Tên',
                last_name: 'Họ',
                last_seen: 'Truy cập gần nhất',
                gender: 'Giới tính',
                title: 'Chức vụ',
                company_id: 'Công ty',
                email: 'Email',
                phone_number1: 'SĐT Cá nhân',
                phone_number2: 'SĐT Công việc',
                background: 'Tiểu sử',
                avatar: 'Ảnh đại diện',
                address: 'Địa chỉ',
                city: 'Thành phố',
                zipcode: 'Mã bưu chính',
                stateAbbr: 'Tỉnh/Bang',
                country: 'Quốc gia',
                sales_id: 'Người phụ trách',
                companies: 'Công ty',
                
                has_newsletter: 'Đăng ký nhận tin'
            }
        },
        // ... (các phần companies, contacts, deals cũ giữ nguyên)

        // THÊM ĐOẠN NÀY VÀO:
        tasks: {
            name: 'Nhiệm vụ |||| Nhiệm vụ',
            fields: {
                description: 'Mô tả nhiệm vụ', // Dịch trường Description
                contact_id: 'Liên hệ',         // Dịch trường Contact
                due_date: 'Hạn chót',          // Dịch trường Due date
                type: 'Loại',                  // Dịch trường Type
            },
            
            data: {
                type: {
                    Email: 'Gửi Email',
                    Call: 'Gọi điện',
                    Meeting: 'Cuộc họp',
                    Demo: 'Demo sản phẩm',
                    Lunch: 'Ăn trưa',
                    None: 'Khác / Không chọn',
                }
            }
        },
        deals: {
            name: 'giao dịch |||| giao dịch',
            fields: {
            
                name: 'Tên giao dịch',
                budget: 'Ngân sách',
                company_id: 'Công ty',
                contact_ids: 'Người liên hệ',
                stage: 'Giai đoạn',
                type: 'Loại',
                description: 'Mô tả',
                amount: 'Giá trị',
                expected_closing_date: 'Ngày chốt dự kiến',
                
                
            }
        }
    }
};

export const i18nProvider = polyglotI18nProvider(
  () => {
    return mergeTranslations(
      englishMessages,
      raSupabaseEnglishMessages,
      raSupabaseEnglishMessagesOverride,
      vietnameseMessages 
    );
  },
  "en",
  [{ locale: "en", name: "English" }], 
  { allowMissing: true },
);