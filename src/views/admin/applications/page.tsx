import fetchMembershipApplications from "@/utils/api/admin/fetchMembershipApplications";
import { MembershipApplication, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

async function getData(): Promise<MembershipApplication[]> {
  try {
    const data = await fetchMembershipApplications();
    if (!data) return [];
    return data.map((d) => ({
      id: d.id,
      avatar: d.avatar,
      created_at: d.created_at,
      degree: d.degree,
      discipline: d.discipline,
      graduation_date: d.graduation_date,
      name: `${d.title} ${d.first_name} ${d.last_name}`,
      roll_no: d.roll_no,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function Users() {
  const [users, setUsers] = useState<MembershipApplication[]>([]);
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
        <h2 className="mb-4">Membership applications</h2>
      </header>
      {loading ? <Spinner /> : <DataTable columns={columns} data={users} />}
    </div>
  );
}
