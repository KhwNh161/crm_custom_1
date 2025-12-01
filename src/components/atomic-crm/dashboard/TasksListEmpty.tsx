import { useGetIdentity, useGetList } from "ra-core";

export const TasksListEmpty = () => {
  const { identity } = useGetIdentity();

  const { total } = useGetList(
    "tasks",
    {
      pagination: { page: 1, perPage: 1 },
      filter: {
        sales_id: identity?.id,
      },
    },
    { enabled: !!identity },
  );

  if (total) return null;

  return (
    <p className="text-sm">Các nhiệm vụ được thêm vào danh bạ của bạn sẽ xuất hiện ở đây.</p>
  );
};
