import Application from "@/components/Application/Application";
import Modal from "@/components/custom-ui/Modal/Modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { fetchApplicationById } from "@/utils/api/admin/fetchApplicationById";
import { MembershipApplicationType } from "@/types/Membership.type";
import { getDateWithTime } from "@/utils/helper";
import { useState } from "react";
import cx from "classnames";
import { TableRowSkeleton } from "@/components/Skeletons/Skeletons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PastApplications: React.FC<{
  applications: {
    id: string;
    application: string;
    submissionDate: string;
    status: string;
  }[];
  fetching: boolean;
}> = ({ applications = [], fetching = true }) => {
  const [loading, setLoading] = useState(false);
  const [applicationData, setApplicationData] =
    useState<MembershipApplicationType | null>(null);

  const handleRowClick = async (id: string) => {
    try {
      setLoading(true);
      const data = await fetchApplicationById(id);
      if (!data) return;
      setApplicationData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3>Past applications</h3>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application</TableHead>
              <TableHead>Submission date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetching ? (
              <>
                <TableRowSkeleton cols={3} />
                <TableRowSkeleton cols={3} />
              </>
            ) : (
              applications.map((app) => (
                <TableRow
                  onClick={() => {
                    if (loading) return;
                    handleRowClick(app.id);
                  }}
                  className={cx("cursor-pointer", {
                    ["opacity-50 pointer-events-none"]: loading,
                  })}
                  key={app.id}
                >
                  <TableCell>{app.application}</TableCell>
                  <TableCell>{getDateWithTime(app.submissionDate)}</TableCell>
                  <TableCell className="capitalize">{app.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Modal
          modalTitle="Application details"
          isOpen={!!applicationData}
          setIsOpen={(open) => {
            if (!open) setApplicationData(null);
          }}
        >
          {applicationData && <Application applicationData={applicationData} />}
        </Modal>
      </CardContent>
    </Card>
  );
};

export default PastApplications;
