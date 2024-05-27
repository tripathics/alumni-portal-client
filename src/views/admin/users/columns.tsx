import Avatar from "@/components/custom-ui/Avatar/Avatar";
import { UserRole } from "@/types/User.type";
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  avatar: string | null;
  name: string;
  email: string;
  role: UserRole[];
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "avatar",
    header: "",
    cell: (cell) => <Avatar avatar={cell.row.original.avatar} size="2rem" />,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Roles",
  },
];
