import styles from "./PastApplications.module.scss";
import Application from "@/components/Application/Application";
import Alert from "@/components/custom-ui/Alert/Alert";
import Modal from "@/components/custom-ui/Modal/Modal";
import {
  Table,
  TableHeading,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/custom-ui/Table/table";
import { fetchApplicationById } from "@/utils/api/admin/fetchApplicationById";
import { MembershipApplicationType } from "@/types/Membership.type";
import fetchUserMembershipApplications from "@/utils/api/alumni/fetchUserMembershipApplications";
import { dataValueLookup } from "@/utils/constants/data";
import { getDateWithTime } from "@/utils/helper";
import { useEffect, useState } from "react";
import cx from "classnames";

const PastApplications = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<
    {
      id: string;
      application: string;
      submissionDate: string;
      status: string;
    }[]
  >([]);
  const [applicationData, setApplicationData] =
    useState<MembershipApplicationType | null>(null);

  useEffect(() => {
    // fetch past applications
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await fetchUserMembershipApplications();
        if (!data) return;
        setApplications(
          data.map((app) => ({
            id: app.id,
            application:
              "Life membership " + dataValueLookup[app.membership_level],
            submissionDate: app.created_at,
            status: app.status,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

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
    <div className={styles["past-applications"]}>
      <header className={styles.header}>
        <h4>Past applications</h4>
      </header>
      {applications.length ? (
        <>
          <Table>
            <TableHeading>
              <TableRow>
                <TableCell heading>Application</TableCell>
                <TableCell heading>Submission date</TableCell>
                <TableCell heading>Status</TableCell>
              </TableRow>
            </TableHeading>
            <TableBody>
              {applications.map((app) => (
                <TableRow
                  onClick={() => {
                    if (loading) return;
                    handleRowClick(app.id);
                  }}
                  className={cx(styles.row, {
                    [styles["row-disabled"]]: loading,
                  })}
                  key={app.id}
                >
                  <TableCell>{app.application}</TableCell>
                  <TableCell>{getDateWithTime(app.submissionDate)}</TableCell>
                  <TableCell className={styles.cell}>{app.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Modal
            modalTitle="Application details"
            isOpen={!!applicationData}
            setIsOpen={(open) => {
              if (!open) setApplicationData(null);
            }}
          >
            {applicationData && (
              <Application applicationData={applicationData} />
            )}
          </Modal>
        </>
      ) : (
        <Alert>No past applications found</Alert>
      )}
    </div>
  );
};

export default PastApplications;
