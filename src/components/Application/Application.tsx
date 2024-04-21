import { dataValueLookup } from "@/utils/constants/data";
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TableHead,
  TableBody,
} from "../ui/table";
import styles from "./Application.module.scss";
import { getDate, getMonth } from "@/utils/helper";
import { MembershipApplicationType } from "@/types/Membership.type";

const Application: React.FC<{ applicationData: MembershipApplicationType }> = ({
  applicationData,
}) => {
  return (
    <div className={styles["application-modal"]}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>Personal details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Full name</TableCell>
            <TableCell>
              {`${applicationData.title} ${applicationData.first_name} ${applicationData.last_name}`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Date of Birth
            </TableCell>
            <TableCell>{getDate(applicationData.dob)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Sex</TableCell>
            <TableCell>{applicationData.sex}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Category</TableCell>
            <TableCell>{applicationData.category}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Religion</TableCell>
            <TableCell>{applicationData.religion}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Nationality</TableCell>
            <TableCell>{applicationData.nationality}</TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead className="pt-6 pb-2" colSpan={2}>
              Education at NIT Arunachal Pradesh
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Registration no.
            </TableCell>
            <TableCell>{applicationData.registration_no}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Roll no.</TableCell>
            <TableCell>{applicationData.roll_no}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Course</TableCell>
            <TableCell>
              {applicationData.degree} in {applicationData.discipline}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Graduation date
            </TableCell>
            <TableCell>{getMonth(applicationData.graduation_date)}</TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead className="pt-6 pb-2">Address</TableHead>
            <TableHead className="pt-6 pb-2">Email & Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="align-top">
              <p className={styles["value"]}>{applicationData.address}</p>
              <p className={styles["value"]}>
                {applicationData.city}, {applicationData.state}
              </p>
              <p
                className={styles["value"]}
              >{`${applicationData.country} (${applicationData.pincode})`}</p>
            </TableCell>
            <TableCell className="align-top">
              <p className={styles["value"]}>{applicationData.email}</p>
              <p className={styles["value"]}>{applicationData.alt_email}</p>
              <p className={styles["value"]}>{applicationData.phone}</p>
              <p className={styles["value"]}>{applicationData.alt_phone}</p>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead className="pt-6 pb-2" colSpan={2}>
              Membership requirements
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Membership level applied
            </TableCell>
            <TableCell>
              {dataValueLookup[applicationData.membership_level]}
            </TableCell>
          </TableRow>
          <TableRow className={styles["sign-wrapper"]}>
            <TableCell>
              <div className={styles["sign"]}>
                <img
                  width="100%"
                  src={`/media/sign/${applicationData.sign}`}
                  alt={applicationData.first_name}
                />
              </div>
            </TableCell>
            <TableCell className="align-top">
              <p className="text-muted-foreground">Dated</p>
              <time>{getDate(applicationData.created_at)}</time>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Application;
