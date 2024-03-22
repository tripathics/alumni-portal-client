import Alert from "@/components/Alert/Alert";
import styles from "../Admin.module.scss";
import { dataValueLookup } from "@/utils/constants/data";
import { useEffect, useState } from "react";
import cx from "classnames";
import { ProfileCircle } from "iconoir-react";
import fetchMembershipApplications, {
  MembershipApplication,
} from "@/utils/api/fetchMembershipApplications";
import Modal from "@/components/Modal/Modal";
import fetchApplicationById from "@/utils/api/fetchApplicationById";

const Applications = () => {
  const [applications, setApplications] = useState<Record<
    string,
    MembershipApplication
  > | null>(null);
  const [applicationData, setApplicationData] = useState<unknown | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await fetchMembershipApplications();
        if (data) {
          const app: Record<string, MembershipApplication> = {};
          for (const application of data) {
            app[application.user_id] = application;
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
                    <th scope="col" aria-label="Status"></th>
                    <th scope="col">Applicant</th>
                    <th scope="col">Reg/Roll no</th>
                    <th scope="col">Batch</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(applications).map((userId) => (
                    <ApplicationRow
                      application={applications[userId]}
                      handleApplicationClick={fetchApplicationData}
                      key={userId}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              isOpen={isApplicationModalOpen}
              setIsOpen={setIsApplicationModalOpen}
              modalTitle="Life membership application"
            >
              <pre>{JSON.stringify(applicationData, null, 2)}</pre>
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
  application: MembershipApplication;
  handleApplicationClick: (id: string) => void;
}> = ({ application, handleApplicationClick }) => {
  const [status, setStatus] = useState(application.status);

  return (
    <tr
      data-application-status={application.status}
      onClick={() => {
        handleApplicationClick(application.user_id);
        setStatus("approved");
      }}
    >
      <td>
        <div
          style={{
            borderRadius: "50%",
            width: "6px",
            height: "6px",
            backgroundColor: status === "pending" ? "blue" : "green",
          }}
        ></div>
      </td>
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
          <p className={styles["text-ellipsis"]}>
            {dataValueLookup[application.title]} {application.first_name}{" "}
            {application.last_name}
          </p>
        </div>
      </td>
      <td>
        <p>{application.registration_no}</p>
        <p>{application.roll_no}</p>
      </td>
      <td>
        <p>
          {dataValueLookup[application.degree] || application.degree}
          {" in "}
          {application.discipline}
        </p>
        <p>
          Graduated{" "}
          {new Date(application.graduation_date).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </td>
      <td className={styles["text-ellipsis"]}>
        {new Date(application.created_at).toLocaleString("default", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </td>
    </tr>
  );
};

export default Applications;
