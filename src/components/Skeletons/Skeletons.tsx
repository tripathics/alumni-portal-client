import {
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHeader,
  TableHead,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export const ProfileTableRowSkeleton: React.FC = () => (
  <TableRow>
    <TableCell className="w-[66px]">
      <Skeleton className="w-[50px] h-[50px] rounded-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-2/3 h-4 mb-4" />
      <Skeleton className="w-1/2 h-4 mb-2" />
      <Skeleton className="w-1/3 h-4" />
    </TableCell>
    <TableCell className="w-12 text-right">
      <Skeleton className="inline-block w-8 h-8 rounded-full" />
    </TableCell>
  </TableRow>
);

export const TableRowSkeleton: React.FC<{ cols?: number }> = ({ cols = 2 }) => (
  <TableRow>
    {[...Array(cols)].map((_, i) => (
      <TableCell key={i}>
        <Skeleton className="h-4 w-full" />
      </TableCell>
    ))}
  </TableRow>
);
export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({
  rows = 2,
  cols = 2,
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        {[...Array(cols)].map((_, i) => (
          <TableHead key={i}>
            <Skeleton className="h-4 w-full" />
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(rows)].map((_, i) => (
        <TableRowSkeleton key={i} cols={cols} />
      ))}
    </TableBody>
  </Table>
);

export const ProfileSkeleton = () => (
  <>
    <div className="p-6 mb-6 flex flex-row-reverse flex-wrap gap-x-5 gap-y-3">
      <Skeleton className="w-20 h-9" />
      <div className="flex grow flex-wrap gap-x-5 gap-y-3 justify-center">
        <Skeleton className="rounded-full md:w-[150px] md:h-[150px] w-[100px] h-[100px]" />
        <div className="grow">
          <Skeleton className="w-[250px] h-6 mb-6" />
          <div className="flex flex-col gap-3">
            <Skeleton className="w-[80px] h-3" />
            <Skeleton className="w-[100px] h-3" />
            <Skeleton className="w-[200px] h-4" />
          </div>
        </div>
      </div>
    </div>
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-2">
        <Skeleton className="w-40 h-4" />
        <Skeleton className="w-80 h-3" />
      </div>
      <div>
        <div className="flex">
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
        </div>
        <div className="flex">
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
        </div>
        <div className="flex">
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
        </div>
        <div className="flex">
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
          <div className="grow py-2">
            <Skeleton className="w-40 h-4" />
          </div>
        </div>
      </div>
    </div>
  </>
);

export const PageHeaderSkeleton = () => (
  <div className="bg-black/5 py-10">
    <div className="container">
      <Skeleton className="max-w-[300px] w-1/3 md:h-10 h-9 mb-6" />
      <Skeleton className="w-5/6 md:h-5 h-4" />
    </div>
  </div>
);
