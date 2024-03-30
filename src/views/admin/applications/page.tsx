import Alert from "@/components/ui/Alert/Alert";
import styles from "../Admin.module.scss";
import { useEffect, useState } from "react";
import cx from "classnames";
import { ProfileCircle } from "iconoir-react";
import fetchMembershipApplications, {
  MembershipApplicationType,
} from "@/utils/api/fetchMembershipApplications";
import Modal from "@/components/ui/Modal/Modal";
import fetchApplicationById, {
  FullApplicationType,
} from "@/utils/api/fetchApplicationById";
import { getDate, getMonth } from "@/utils/helper";
import Application from "@/components/Application/Application";
// import { Button } from "@/components/forms";
import { toast } from "react-toastify";
import updateApplicationStatus from "@/utils/api/updateApplicationStatus";

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
      const data = await fetchApplicationById(id);
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
            <div className={cx(styles["table-wrapper"])}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Applicant</th>
                    <th scope="col">Batch</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(applications).map((id) => (
                    <ApplicationRow
                      application={applications[id]}
                      handleApplicationClick={fetchApplicationData}
                      key={id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              isOpen={isApplicationModalOpen}
              setIsOpen={setIsApplicationModalOpen}
              modalTitle="Life membership application"
              footer={
                applicationData?.status === "pending" && (
                  <div style={{ display: "flex" }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (!applicationData) return;
                        updateStatus(applicationData?.id, "approved");
                      }}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!applicationData) return;
                        updateStatus(applicationData?.id, "rejected");
                      }}
                    >
                      Reject
                    </button>
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
  return (
    <tr
      data-application-status={application.status}
      onClick={() => {
        handleApplicationClick(application.id);
      }}
    >
      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {application.avatar ? (
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/media/avatars/${
                  application.avatar
                }`}
                alt="avatar"
              />
            </div>
          ) : (
            <ProfileCircle strokeWidth={0.8} width={32} height={32} />
          )}
          <div>
            <p className={styles["text-ellipsis"]}>
              {application.title} {application.first_name}{" "}
              {application.last_name}
            </p>
            <p className={styles["sub-text"]}>Roll no: {application.roll_no}</p>
          </div>
        </div>
      </td>
      <td>
        <p>
          {application.degree}
          {" in "}
          {application.discipline}
        </p>
        <p className={styles["sub-text"]}>
          Graduated {getMonth(application.graduation_date)}
        </p>
      </td>
      <td className={styles["text-ellipsis"]}>
        {getDate(application.created_at)}
      </td>
    </tr>
  );
};

export default Applications;
