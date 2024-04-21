import Alert from "@/components/custom-ui/Alert/Alert";
import styles from "../Admin.module.scss";
import { useEffect, useState } from "react";
import cx from "classnames";
import fetchMembershipApplications from "@/utils/api/admin/fetchMembershipApplications";
import Modal from "@/components/custom-ui/Modal/Modal";
import { fetchApplicationByIdAdmin } from "@/utils/api/admin/fetchApplicationById";
import { MembershipApplicationType } from "@/types/Membership.type";
import { getDateWithTime, getMonth } from "@/utils/helper";
import Application from "@/components/Application/Application";
import { toast } from "react-toastify";
import updateApplicationStatus from "@/utils/api/admin/updateApplicationStatus";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import Avatar from "@/components/custom-ui/Avatar/Avatar";
import { MembershipApplicationOverviewType } from "@/types/Membership.type";

const Applications = () => {
  const [applications, setApplications] = useState<Record<
    string,
    MembershipApplicationOverviewType
  > | null>(null);
  const [applicationData, setApplicationData] =
    useState<MembershipApplicationType | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await fetchMembershipApplications();
        if (data) {
          const app: Record<string, MembershipApplicationOverviewType> = {};
          for (const application of data) {
            app[application.id] = application;
          }
          setApplications(app);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApplications();
  }, []);

  const fetchApplicationData = async (id: string) => {
    try {
      const data = await fetchApplicationByIdAdmin(id);
      if (data) {
        setApplicationData(data);
        setIsApplicationModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const data = await updateApplicationStatus(id, status);
      if (data?.membershipApplicationRecord) {
        setApplications((prev) => ({
          ...prev,
          [id]: {
            ...prev![id],
            status,
          },
        }));
        toast.success(
          `Application ${data?.membershipApplicationRecord.status}`,
          {
            autoClose: 1000,
          }
        );
        setIsApplicationModalOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <header>
        <h2>Membership Applications</h2>
      </header>
      <main>
        {applications ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(applications).map((id) => (
                  <ApplicationRow
                    application={applications[id]}
                    handleApplicationClick={fetchApplicationData}
                    key={id}
                  />
                ))}
              </TableBody>
            </Table>
            <Modal
              isOpen={isApplicationModalOpen}
              setIsOpen={setIsApplicationModalOpen}
              modalTitle="Life membership application"
              footer={
                applicationData?.status === "pending" && (
                  <div className="flex gap-4 justify-between *:grow">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (!applicationData) return;
                        updateStatus(applicationData?.id, "rejected");
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => {
                        if (!applicationData) return;
                        updateStatus(applicationData?.id, "approved");
                      }}
                    >
                      Approve
                    </Button>
                  </div>
                )
              }
            >
              {!!applicationData && (
                <Application applicationData={applicationData} />
              )}
            </Modal>
          </>
        ) : (
          <Alert severity="info">No pending applications</Alert>
        )}
      </main>
    </div>
  );
};

const ApplicationRow: React.FC<{
  application: MembershipApplicationOverviewType;
  handleApplicationClick: (id: string) => void;
}> = ({ application, handleApplicationClick }) => {
  const [read, setRead] = useState(false);

  return (
    <TableRow
      className={cx(styles["application-row"], styles[application.status], {
        [styles["read"]]: read,
      })}
      onClick={() => {
        setRead(true);
        handleApplicationClick(application.id);
      }}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar avatar={application.avatar} size="2rem" />
          <div>
            <p className={styles["text-ellipsis"]}>
              {application.title} {application.first_name}{" "}
              {application.last_name}
            </p>
            <p className={styles["sub-text"]}>Roll no: {application.roll_no}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p>
          {application.degree}
          {" in "}
          {application.discipline}
        </p>
        <p className={styles["sub-text"]}>
          Graduation {getMonth(application.graduation_date)}
        </p>
      </TableCell>
      <TableCell className={styles["text-ellipsis"]}>
        {getDateWithTime(application.created_at)}
      </TableCell>
    </TableRow>
  );
};

export default Applications;
