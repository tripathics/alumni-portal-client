import SchemaForm from "@/components/forms";
import { Button } from "@/components/ui/button";
import alumniPrefillApi from "@/utils/api/alumni/alumniPrefill";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import alumniMembershipSubmit from "@/utils/api/alumni/alumniMembershipSubmit";
import { MembershipPrefillDataType } from "@/types/Alumni.type";
import Alert from "@/components/custom-ui/Alert/Alert";
import { getDate, getMonth } from "@/utils/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUser from "@/hooks/user";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PastApplications from "./PastApplications";
import fetchUserMembershipApplications from "@/utils/api/alumni/fetchUserMembershipApplications";
import { dataValueLookup } from "@/utils/constants/data";
import { TableSkeleton } from "@/components/Skeletons/Skeletons";
import { Skeleton } from "@/components/ui/skeleton";

const MembershipForm = () => {
  const [userData, setUserData] = useState<MembershipPrefillDataType | null>(
    null
  );
  const [applications, setPastApplications] = useState<
    {
      id: string;
      application: string;
      submissionDate: string;
      status: string;
    }[]
  >([]);
  const [errorMsg, setAlertMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useUser();

  const fetchPrefillData = async () => {
    try {
      const prefillData = await alumniPrefillApi();
      if (prefillData) {
        setUserData(prefillData);
      }
    } catch (error) {
      setAlertMsg((error as Error).message);
    }
  };

  const fetchApplications = async () => {
    try {
      const data = await fetchUserMembershipApplications();
      if (!data) return;
      setPastApplications(
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
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      !user?.role.includes("alumni") && fetchPrefillData(),
      fetchApplications(),
    ]).finally(() => setLoading(false));
  }, [user]);

  const onSubmit = async (data: FieldValues) => {
    setSubmitting(true);
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
        setAlertMsg(
          "Membership application is pending and will be reviewed by the admin"
        );
        setLoading(true);
        await fetchApplications();
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {loading ? (
          <Card>
            <CardHeader>
              <Skeleton className="w-[120px] h-4" />
            </CardHeader>
            <CardContent>
              <TableSkeleton rows={4} cols={2} />
            </CardContent>
          </Card>
        ) : userData ? (
          <>
            <div>
              <Alert severity="info">
                Make sure your details are correct before applying for life
                membership. Go to your <NavLink to="/profile">profile</NavLink>{" "}
                to make any corrections.
              </Alert>
            </div>
            <Card>
              <CardHeader className="py-3">
                <h3>Profile details</h3>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead colSpan={2} className="pt-6 pb-1">
                        Personal details
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground">
                        Full name
                      </TableCell>
                      <TableCell>
                        {userData.title} {userData.first_name}{" "}
                        {userData.last_name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">
                        Date of Birth
                      </TableCell>
                      <TableCell>{getDate(userData.dob)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">
                        Category
                      </TableCell>
                      <TableCell>{userData.category}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">
                        Nationality
                      </TableCell>
                      <TableCell>{userData.nationality}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">
                        Religion
                      </TableCell>
                      <TableCell>{userData.religion}</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHeader>
                    <TableRow>
                      <TableHead colSpan={2} className="pt-6 pb-1">
                        Education at NIT Arunachal Pradesh
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground">
                        Registration no.
                      </TableCell>
                      <TableCell>{userData.registration_no}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">
                        Roll no.
                      </TableCell>
                      <TableCell>{userData.roll_no}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">
                        Course
                      </TableCell>
                      <TableCell>
                        {userData.degree} in {userData.discipline}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">
                        Graduation date
                      </TableCell>
                      <TableCell>
                        {getMonth(userData.graduation_date)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pt-6 pb-1">Address</TableHead>
                      <TableHead className="pt-6 pb-1">Email & Phone</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
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
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-3">
                <h3>Membership preference</h3>
              </CardHeader>
              <CardContent>
                <SchemaForm
                  schema={[
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
                  actions={
                    <Button disabled={submitting} type="submit">
                      Submit for approval
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </>
        ) : (
          <Alert>{errorMsg}</Alert>
        )}
      </div>
      <hr />
      <PastApplications applications={applications} fetching={loading} />
    </>
  );
};

export default MembershipForm;
