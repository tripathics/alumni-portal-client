import Avatar from "@/components/custom-ui/Avatar/Avatar";
import { getDateWithTime, getMonth } from "@/utils/helper";
import { ColumnDef } from "@tanstack/react-table";

export type MembershipApplication = {
  id: string;
  avatar: string | null;
  name: string;
  roll_no: string;
  degree: string;
  discipline: string;
  graduation_date: string;
  created_at: string;
};

export const columns: ColumnDef<MembershipApplication>[] = [
  {
    accessorKey: "applicant",
    header: "Applicant",
    cell: (cell) => (
      <div className="flex items-center">
        <Avatar avatar={cell.row.original.avatar} size="2rem" />
        <div className="flex flex-col ml-2">
          <span>{cell.row.original.name}</span>
          <span className="text-muted-foreground">Roll no: {cell.row.original.roll_no}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "batch",
    header: "Batch",
    cell: (cell) => (
      <div className="flex flex-col">
        <span>
          {cell.row.original.degree}
          {" in "}
          {cell.row.original.discipline}
        </span>
        <span className="text-muted-foreground">
          Graduation {getMonth(cell.row.original.graduation_date)}
        </span>
      </div>
    )
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (cell) => getDateWithTime(cell.row.original.created_at)
  }
];
