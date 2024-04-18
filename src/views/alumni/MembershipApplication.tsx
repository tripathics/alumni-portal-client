import SchemaForm from "@/components/forms";
import { Button } from "@/components/ui/button";
import styles from "@/components/layouts/dashboard/Dashboard.module.scss";
import alumniPrefillApi from "@/utils/api/alumniPrefill";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import alumniMembershipSubmit from "@/utils/api/alumniMembershipSubmit";
import { MembershipPrefillDataType } from "@/types/Alumni.type";
import Alert from "@/components/custom-ui/Alert/Alert";
import { getDate, getMonth } from "@/utils/helper";
import {
  Table,
  TableCell,
  TableRow,
} from "@/components/custom-ui/Table/FlexTable";
import useUser from "@/hooks/user";
import { toast } from "react-toastify";

const MembershipForm = () => {
  const [userData, setUserData] = useState<MembershipPrefillDataType | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchPrefillData = async () => {
      try {
        setLoading(true);
        const data = await alumniPrefillApi();
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        setErrorMsg((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (!user?.role.includes("alumni")) fetchPrefillData();
  }, [user]);

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "sign") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });
    try {
      const response = await alumniMembershipSubmit(formData);
      if (response?.success) {
        toast.success(response.message);
        setErrorMsg("Your membership application is pending for approval");
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return user?.role.includes("alumni") ? (
    <Alert>You are already a verified Alumni</Alert>
  ) : loading ? (
    <p>Please wait</p>
  ) : errorMsg ? (
    <Alert>{errorMsg}</Alert>
  ) : (
    userData && (
      <>
        <Alert severity="info">
          Make sure your details are correct before applying for life
          membership. Go to your <NavLink to="/profile">profile</NavLink> to
          make any corrections.
        </Alert>
        <section className={styles["box"]}>
          <h1 className={styles["title"]}>Profile details</h1>
          <Table>
            <TableRow header>
              <TableCell>Personal details</TableCell>
            </TableRow>
            <TableRow>
              <TableCell type="label">Full name</TableCell>
              <TableCell>
                {userData.title} {userData.first_name} {userData.last_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell type="label">Date of Birth</TableCell>
              <TableCell>{getDate(userData.dob)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell type="label">Category</TableCell>
              <TableCell>{userData.category}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell type="label">Nationality</TableCell>
              <TableCell>{userData.nationality}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell type="label">Religion</TableCell>
              <TableCell>{userData.religion}</TableCell>
            </TableRow>
          </Table>

          <Table>
            <TableRow header>
              <TableCell>Education at NIT Arunachal Pradesh</TableCell>
            </TableRow>
            <TableRow>
              <TableCell type="label">Registration no.</TableCell>
              <TableCell>{userData.registration_no}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell type="label">Roll no.</TableCell>
              <TableCell>{userData.roll_no}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell type="label">Course</TableCell>
              <TableCell>
                {userData.degree} in {userData.discipline}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell type="label">Graduation date</TableCell>
              <TableCell>{getMonth(userData.graduation_date)}</TableCell>
            </TableRow>
          </Table>

          <Table>
            <TableRow header>
              <TableCell>Address</TableCell>
              <TableCell>Email & Phone</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>{userData.address}</p>
                <p>
                  {userData.city}, {userData.state}
                </p>
                <p>{`${userData.country} (${userData.pincode})`}</p>
              </TableCell>
              <TableCell>
                <p>{userData.email}</p>
                <p>{userData.alt_email}</p>
                <p>{userData.phone}</p>
                <p>{userData.alt_phone}</p>
              </TableCell>
            </TableRow>
          </Table>
        </section>
        <section className={styles["box"]}>
          <SchemaForm
            schema={[
              { type: "section", label: "Membership Preferences" },
              {
                name: "membership_level",
                label: "Membership level",
                type: "select",
                required: "Membership level is required",
                options: [
                  {
                    value: "level1_networking",
                    label:
                      "I am Interested to get information and networking only",
                  },
                  {
                    value: "level2_volunteering",
                    label:
                      "I am Interested in volunteering for events and activities",
                  },
                ],
              },
              {
                name: "sign",
                label: "Signature",
                type: "file",
                required: "Signature is required",
                allowedFormats: ["image/jpeg", "image/png", "image/gif"],
                maxFileSize: 200 * 1024,
              },
            ]}
            onSubmit={onSubmit}
            actions={<Button type="submit">Submit for approval</Button>}
          />
        </section>
      </>
    )
  );
};

export default MembershipForm;
