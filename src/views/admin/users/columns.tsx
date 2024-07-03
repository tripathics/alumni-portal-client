import Avatar from "@/components/custom-ui/Avatar/Avatar";
import { Badge } from "@/components/ui/badge";
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
    accessorKey: "name",
    header: "Name",
    cell: (cell) => (
      <div className="flex items-center">
        <Avatar avatar={cell.row.original.avatar} size="2rem" />
        <span className="ml-2">{cell.row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Roles",
    cell: (cell) => (
      <div className="flex flex-wrap">
        {cell.row.original.role.map((role) => (
          <Badge key={role} className="mr-2" variant="secondary">
            {role}
          </Badge>
        ))}
      </div>
    ),
  },
];
