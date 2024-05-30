import getUsers from "@/utils/api/admin/getUsers";
import { User, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

async function getData(): Promise<User[]> {
  try {
    const data = await getUsers();
    if (!data) return [];
    return data.users.map((user) => ({
      id: user.id,
      avatar: user.avatar,
      name: user.first_name
        ? `${user.title} ${user.first_name} ${user.last_name}`
        : "User",
      email: user.email,
      role: user.role,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getData();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <header>
        <h2 className="mb-4">Users</h2>
      </header>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={users} />
      )}
    </div>
  );
}
