import Avatar from "@/components/custom-ui/Avatar/Avatar";
import DataTable from "@/components/custom-ui/Table/table";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/User.type";
import getUsers from "@/utils/api/admin/getUsers";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface UserType {
  user: { name: string | null; avatar: string | null };
  email: string;
  role: UserRole[];
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        if (!data) return;
        setUsers(
          data.users.map((user) => ({
            user: {
              avatar: user.avatar,
              name: user.first_name
                ? `${user.title} ${user.first_name} ${user.last_name}`
                : null,
            },
            email: user.email,
            role: user.role,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <header>
        <h2 className="mb-4">Membership Applications</h2>
      </header>
      {loading ? (
        <Spinner />
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <DataTable
          headings={["User", "Email", "Roles", "Actions"]}
          rows={users.map((user) => userRow(user))}
        />
      )}
    </div>
  );
};

const userRow = (user: UserType) => {
  return [
    <div className="flex items-center gap-2">
      <Avatar size="2rem" avatar={user.user.avatar} />
      <div>{user.user.name || "User"}</div>
    </div>,
    user.email,
    <div className="flex gap-2">
      {user.role.map((role, i) => (
        <Badge variant="secondary" key={i}>
          {role}
        </Badge>
      ))}
    </div>,
    <Button>Delete</Button>,
  ];
};

export default Users;
