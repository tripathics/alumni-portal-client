// import Table from "@/components/Table/table";
import Alert from "@/components/Alert/Alert";
import Avatar from "@/components/Avatar/Avatar";
import styles from "@/components/layouts/dashboard/Dashboard.module.scss";
import axios from "@/config/axios.config";
import { dataValueLookup } from "@/utils/constants/data";
import { useEffect, useState } from "react";

interface MembershipApplicationRow {
  user_id: "string";
  membership_level: "string";
  sign: "string";
  created_at: "string";
  updated_at: "string";
  status: "pending" | "approved" | "rejected";
  registration_no: "string";
  roll_no: "string";
  avatar: "string";
  title: "string";
  first_name: "string";
  last_name: "string";
  degree: "string";
  discipline: "string";
  graduation_date: "string";
  enrollment_date: "string";
}

const Applications = () => {
  const [applications, setApplications] = useState<Record<
    string,
    MembershipApplicationRow
  > | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/api/admin/membership-applications");
        if (response.data) {
          const app: Record<string, MembershipApplicationRow> = {};
          for (const application of response.data as MembershipApplicationRow[]) {
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

  return (
    <div>
      <header>
        <h2>Membership Applications</h2>
      </header>
      <main>
        {applications ? (
          <div className={styles.box}>
            <table>
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Membership Level</th>
                  <th scope="col">Registration and Roll No</th>
                  <th scope="col">Degree</th>
                  <th scope="col">Discipline</th>
                  <th scope="col">Graduation Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(applications).map((userId) => (
                  <tr key={userId}>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <Avatar
                          avatar={applications[userId].avatar}
                          size="2.2rem"
                        />
                        <p>
                          {dataValueLookup[applications[userId].title]}{" "}
                          {applications[userId].first_name}{" "}
                          {applications[userId].last_name}
                        </p>
                      </div>
                    </td>
                    <td>
                      {dataValueLookup[applications[userId].membership_level]}
                    </td>
                    <td>
                      <p>{applications[userId].registration_no}</p>
                      <p>{applications[userId].roll_no}</p>
                    </td>
                    <td>
                      {dataValueLookup[applications[userId].degree] ||
                        applications[userId].degree}
                    </td>
                    <td>{applications[userId].discipline}</td>
                    <td>
                      {new Date(
                        applications[userId].graduation_date
                      ).toLocaleString("default", {
                        month: "short",
                      })}
                    </td>
                    <td>{applications[userId].status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Alert severity="info">No pending applications</Alert>
        )}
      </main>
    </div>
  );
};

export default Applications;
