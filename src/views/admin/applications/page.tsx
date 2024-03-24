import Alert from "@/components/Alert/Alert";
import styles from "../Admin.module.scss";
import { dataValueLookup } from "@/utils/constants/data";
import { useEffect, useState } from "react";
import cx from "classnames";
import { ProfileCircle } from "iconoir-react";
import fetchMembershipApplications, {
  MembershipApplicationType,
} from "@/utils/api/fetchMembershipApplications";
import Modal from "@/components/Modal/Modal";
import fetchApplicationById, {
  FullApplicationType,
} from "@/utils/api/fetchApplicationById";
import { getDate, getMonth } from "@/utils/helper";

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
                    <th scope="col">Applicant</th>
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
              {!!applicationData && (
                <>
                  <div className={styles["application-modal"]}>
                    <div className={styles["box-table"]}>
                      <div className={cx(styles["box-row"], styles.header)}>
                        <div className={styles["col"]}>
                          <h4 className={styles["box-col-header"]}>
                            Personal details
                          </h4>
                        </div>
                      </div>
                      <div className={styles["box-row"]}>
                        <p className={cx(styles.col, styles["label"])}>
                          Full name
                        </p>
                        <p className={cx(styles.col, styles["value"])}>
                          {dataValueLookup[applicationData.title]}{" "}
                          {applicationData.first_name}{" "}
                          {applicationData.last_name}
                        </p>
                      </div>
                      <div className={styles["box-row"]}>
                        <p className={cx(styles.col, styles["label"])}>
                          Date of Birth
                        </p>
                        <p className={cx(styles.col, styles["value"])}>
                          {getDate(applicationData.dob)}
                        </p>
                      </div>
                      <div className={styles["box-row"]}>
                        <p className={cx(styles.col, styles["label"])}>Sex</p>
                        <p className={cx(styles.col, styles["value"])}>
                          {dataValueLookup[applicationData.sex]}
                        </p>
                      </div>
                      <div className={styles["box-row"]}>
                        <p className={cx(styles.col, styles["label"])}>
                          Category
                        </p>
                        <p className={cx(styles.col, styles["value"])}>
                          {dataValueLookup[applicationData.category]}
                        </p>
                      </div>
                      <div className={styles["box-row"]}>
                        <p className={cx(styles.col, styles["label"])}>
                          Religion
                        </p>
                        <p className={cx(styles.col, styles["value"])}>
                          {applicationData.religion}
                        </p>
                      </div>
                      <div className={styles["box-row"]}>
                        <p className={cx(styles.col, styles["label"])}>
                          Nationality
                        </p>
                        <p className={cx(styles.col, styles["value"])}>
                          {applicationData.nationality}
                        </p>
                      </div>
                    </div>

                    <div className={styles["box-table"]}>
                      <div className={cx(styles["box-row"], styles.header)}>
                        <div className={styles["col"]}>
                          <h4 className={styles["box-col-header"]}>
                            Education at NIT Arunachal Pradesh
                          </h4>
                        </div>
                      </div>
                      <div className={styles["box-row"]}>
                        <p className={cx(styles.col, styles["label"])}>
                          Registration no.
                        </p>
                        <p className={cx(styles.col, styles["value"])}>
                          {applicationData.registration_no}
                        </p>
                      </div>
                      <div className={styles["box-row"]}>
                        <p className={cx(styles.col, styles["label"])}>
                          Roll no.
                        </p>
                        <p className={cx(styles.col, styles["value"])}>
                          {applicationData.roll_no}
                        </p>
                      </div>
                      <div className={styles["box-row"]}>
                        <p className={cx(styles.col, styles["label"])}>
                          Course
                        </p>
                        <p className={cx(styles.col, styles["value"])}>
                          {dataValueLookup[applicationData.degree]} in{" "}
                          {applicationData.discipline}
                        </p>
                      </div>
                      <div className={styles["box-row"]}>
                        <p className={cx(styles.col, styles["label"])}>
                          Graduation date
                        </p>
                        <p className={cx(styles.col, styles["value"])}>
                          {getMonth(applicationData.graduation_date)}
                        </p>
                      </div>
                    </div>

                    <div className={styles["box-table"]}>
                      <div className={cx(styles["box-row"], styles.header)}>
                        <div className={styles["col"]}>
                          <h4 className={styles["box-col-header"]}>Address</h4>
                        </div>
                        <div className={styles["col"]}>
                          <h4 className={styles["box-col-header"]}>
                            Email & Phone
                          </h4>
                        </div>
                      </div>
                      <div className={styles["box-row"]}>
                        <div className={styles["col"]}>
                          <p className={styles["value"]}>
                            {applicationData.address}
                          </p>
                          <p className={styles["value"]}>
                            {applicationData.city}, {applicationData.state}
                          </p>
                          <p
                            className={styles["value"]}
                          >{`${applicationData.country} (${applicationData.pincode})`}</p>
                        </div>
                        <div className={styles["col"]}>
                          <p className={styles["value"]}>
                            {applicationData.email}
                          </p>
                          <p className={styles["value"]}>
                            {applicationData.alt_email}
                          </p>
                          <p className={styles["value"]}>
                            {applicationData.phone}
                          </p>
                          <p className={styles["value"]}>
                            {applicationData.alt_phone}
                          </p>
                        </div>
                      </div>

                      <div className={styles["box-table"]}>
                        <div className={cx(styles["box-row"], styles.header)}>
                          <div className={styles["col"]}>
                            <h4 className={styles["box-col-header"]}>
                              Membership requirements
                            </h4>
                          </div>
                        </div>
                        <div className={styles["box-row"]}>
                          <p className={cx(styles.col, styles["label"])}>
                            Membership level applied
                          </p>
                          <p className={cx(styles.col, styles["value"])}>
                            {dataValueLookup[applicationData.membership_level]}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles["sign-wrapper"]}>
                      <div className={styles["sign"]}>
                        <img
                          width="100%"
                          src={`${
                            import.meta.env.VITE_SERVER_BASE_URL
                          }/media/sign/${applicationData.sign}`}
                          alt="avatar"
                        />
                      </div>
                      <div className={styles["date"]}>
                        {getDate(applicationData.created_at)}
                      </div>
                    </div>
                  </div>
                </>
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
  const [status, setStatus] = useState(application.status);

  return (
    <tr
      data-application-status={status}
      onClick={() => {
        handleApplicationClick(application.user_id);
        setStatus("approved");
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
              {dataValueLookup[application.title]} {application.first_name}{" "}
              {application.last_name}
            </p>
            <p className={styles["sub-text"]}>Roll no: {application.roll_no}</p>
          </div>
        </div>
      </td>
      <td>
        <p>
          {dataValueLookup[application.degree] || application.degree}
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
