import { dataValueLookup } from "@/utils/constants/data";
import { Table, TableCell, TableRow } from "../Table/FlexTable";
import styles from "./Application.module.scss";
import { FullApplicationType } from "@/utils/api/fetchApplicationById";
import { getDate, getMonth } from "@/utils/helper";

const Application: React.FC<{ applicationData: FullApplicationType }> = ({
  applicationData,
}) => {
  return (
    <div className={styles["application-modal"]}>
      <Table>
        <TableRow header>
          <TableCell>Personal details</TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="label">Full name</TableCell>
          <TableCell type="value">
            {`${applicationData.title} ${applicationData.first_name} ${applicationData.last_name}`}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="label">Date of Birth</TableCell>
          <TableCell type="value">{getDate(applicationData.dob)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="label">Sex</TableCell>
          <TableCell type="value">{applicationData.sex}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="label">Category</TableCell>
          <TableCell type="value">{applicationData.category}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="label">Religion</TableCell>
          <TableCell type="value">{applicationData.religion}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="label">Nationality</TableCell>
          <TableCell type="value">{applicationData.nationality}</TableCell>
        </TableRow>
      </Table>

      <Table>
        <TableRow header>
          <TableCell>Education at NIT Arunachal Pradesh</TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="label">Registration no.</TableCell>
          <TableCell>{applicationData.registration_no}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="label">Roll no.</TableCell>
          <TableCell>{applicationData.roll_no}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="label">Course</TableCell>
          <TableCell>
            {applicationData.degree} in {applicationData.discipline}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="label">Graduation date</TableCell>
          <TableCell>{getMonth(applicationData.graduation_date)}</TableCell>
        </TableRow>
      </Table>

      <Table>
        <TableRow header>
          <TableCell>Address</TableCell>
          <TableCell>Email & Phone</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <p className={styles["value"]}>{applicationData.address}</p>
            <p className={styles["value"]}>
              {applicationData.city}, {applicationData.state}
            </p>
            <p
              className={styles["value"]}
            >{`${applicationData.country} (${applicationData.pincode})`}</p>
          </TableCell>
          <TableCell>
            <p className={styles["value"]}>{applicationData.email}</p>
            <p className={styles["value"]}>{applicationData.alt_email}</p>
            <p className={styles["value"]}>{applicationData.phone}</p>
            <p className={styles["value"]}>{applicationData.alt_phone}</p>
          </TableCell>
        </TableRow>
      </Table>

      <Table>
        <TableRow header>
          <TableCell>Membership requirements</TableCell>
        </TableRow>
        <TableRow>
          <TableCell type="label">Membership level applied</TableCell>
          <TableCell>
            {dataValueLookup[applicationData.membership_level]}
          </TableCell>
        </TableRow>
        <TableRow className={styles["sign-wrapper"]}>
          <TableCell>
            <div className={styles["sign"]}>
              <img
                width="100%"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/media/sign/${
                  applicationData.sign
                }`}
                alt={applicationData.first_name}
              />
            </div>
          </TableCell>
          <TableCell>
            <p className="muted">Dated</p>
            <time>{getDate(applicationData.created_at)}</time>
          </TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

export default Application;
