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
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer } from "iconoir-react";

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
  const navigate = useNavigate();

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

  const handlePrint = (id: string) => {
    setApplicationData(null);
    navigate(`/alumni-membership/print/${id}`);
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
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No past applications found
                </TableCell>
              </TableRow>
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
          footer={
            applicationData && (
              <div>
                <Button
                  onClick={() => {
                    handlePrint(applicationData.id);
                  }}
                >
                  <Printer />
                  Print
                </Button>
              </div>
            )
          }
        >
          {applicationData && <Application applicationData={applicationData} />}
        </Modal>
      </CardContent>
    </Card>
  );
};

export default PastApplications;
