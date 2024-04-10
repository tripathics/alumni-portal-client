import Alert from "@/components/ui/Alert/Alert";
import styles from "../Admin.module.scss";
import { useEffect, useState } from "react";
import cx from "classnames";
import {
  fetchMembershipApplications,
  MembershipApplicationType,
} from "@/utils/api/fetchMembershipApplications";
import Modal from "@/components/ui/Modal/Modal";
import {
  fetchApplicationByIdAdmin,
  FullApplicationType,
} from "@/utils/api/fetchApplicationById";
import { getDateWithTime, getMonth } from "@/utils/helper";
import Application from "@/components/Application/Application";
// import { Button } from "@/components/forms";
import { toast } from "react-toastify";
import updateApplicationStatus from "@/utils/api/updateApplicationStatus";
import Button from "@/components/ui/Elements/Button";
import {
  Table,
  TableBody,
  TableHeading,
  TableRow,
  TableCell,
} from "@/components/ui/Table/table";
import Avatar from "@/components/ui/Avatar/Avatar";

const Applications = () => {
  const [applications, setApplications] = useState<Record<
    string,
    MembershipApplicationType
  > | null>(null);
  const [applicationData, setApplicationData] =
    useState<FullApplicationType | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await fetchMembershipApplications();
        if (data) {
          const app: Record<string, MembershipApplicationType> = {};
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
              <TableHeading>
                <TableRow>
                  <TableCell heading>Applicant</TableCell>
                  <TableCell heading>Batch</TableCell>
                  <TableCell heading>Date</TableCell>
                </TableRow>
              </TableHeading>
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
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Button
                      variant="primary"
                      onClick={() => {
                        if (!applicationData) return;
                        updateStatus(applicationData?.id, "approved");
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (!applicationData) return;
                        updateStatus(applicationData?.id, "rejected");
                      }}
                    >
                      Reject
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
  application: MembershipApplicationType;
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
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
