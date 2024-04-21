import SchemaForm from "@/components/forms";
import { Button } from "@/components/ui/button";
import cx from "classnames";
import { EditPencil } from "iconoir-react";
import Modal from "@/components/custom-ui/Modal/Modal";
import { useCallback, useEffect, useState } from "react";
import readProfile from "@/utils/api/profile/readProfile";
import updateProfileApi from "@/utils/api/profile/updateProfile";
import updateAvatarApi from "@/utils/api/profile/updateAvatar";
import useUser from "@/hooks/user";
import EditAvatar from "@/components/custom-ui/Avatar/EditAvatar";
import styles from "@/components/layouts/dashboard/Dashboard.module.scss";
import AvatarUpload from "@/components/forms/AvatarUpload";
import personalDetailsFormSchema from "@/utils/formSchema/personalDetailsFormSchema";
import { FieldValues } from "react-hook-form";
import { PersonalDetailsType } from "@/types/Profile.type";
import { toast } from "react-toastify";
import Alert from "@/components/custom-ui/Alert/Alert";
import { getDate } from "@/utils/helper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileSkeleton } from "@/components/Skeletons/Skeletons";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PersonalDetailsFormProps {
  prefillData: FieldValues;
  onSubmit: (data: FieldValues) => void;
}
const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  prefillData,
  onSubmit,
}) => {
  return (
    <SchemaForm
      prefillData={prefillData}
      schema={personalDetailsFormSchema}
      onSubmit={onSubmit}
      actions={
        <Button type="submit" className="primary">
          Save changes
        </Button>
      }
    />
  );
};

const PersonalDetails = () => {
  const { user, fetchUser } = useUser();

  const [isProfileFormModalOpen, setIsProfileFormModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsType>();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const updateProfile = async (data: FieldValues) => {
    try {
      setLoading(true);
      const response = await updateProfileApi(data as PersonalDetailsType);
      if (response?.success) {
        fetchProfile();

        setIsProfileFormModalOpen(false);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateAvatar = async (file: File) => {
    try {
      setLoading(true);
      const data = await updateAvatarApi(file);
      if (data?.success) {
        fetchProfile();
        setIsProfileModalOpen(false);
        toast.success("Profile picture updated successfully", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = useCallback(async () => {
    try {
      setPageLoading(true);
      const data = await readProfile();
      if (data?.success && data.user) {
        setPersonalDetails((prev) => ({
          ...prev,
          ...data.user,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();

    return () => {
      fetchUser();
    };
  }, [fetchProfile, fetchUser]);

  return pageLoading ? (
    <ProfileSkeleton />
  ) : personalDetails?.registration_no ? (
    <div className={styles["dashboard-page"]}>
      <Card>
        <CardContent className={styles["basic-info-wrapper"]}>
          <div className={styles["actions"]}>
            {user?.profile_locked ? (
              <Button disabled>
                <EditPencil />
                Edit
              </Button>
            ) : (
              <>
                <Button onClick={() => setIsProfileFormModalOpen(true)}>
                  <EditPencil />
                  Edit
                </Button>
                <Modal
                  isOpen={isProfileFormModalOpen}
                  modalTitle="Edit personal details"
                  setIsOpen={(val) => {
                    setIsProfileFormModalOpen(val);
                  }}
                >
                  <section className={styles.box}>
                    <PersonalDetailsForm
                      prefillData={
                        {
                          ...personalDetails,
                          email: user?.email,
                        } as FieldValues
                      }
                      onSubmit={updateProfile}
                    />
                  </section>
                </Modal>
              </>
            )}
          </div>
          <div className={styles["basic-info"]}>
            <div className={styles["avatar-container"]}>
              <EditAvatar
                avatar={personalDetails.avatar}
                className={styles["avatar-crop"]}
              />
              <Button
                aria-label="Edit profile picture"
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={() => {
                  setIsProfileModalOpen(true);
                }}
              >
                <EditPencil />
              </Button>
              <Modal
                isOpen={isProfileModalOpen}
                setIsOpen={(val) => {
                  setIsProfileModalOpen(val);
                }}
                modalTitle="Change profile picture"
              >
                <AvatarUpload
                  avatar={personalDetails.avatar}
                  updateAvatar={updateAvatar}
                  loading={loading}
                />
              </Modal>
            </div>
            <div className={styles["basic-info-content"]}>
              <h2 className={styles["title"]}>
                {personalDetails.title} {personalDetails.first_name}{" "}
                {personalDetails.last_name}
              </h2>
              <div className="flex flex-col gap-1">
                <p>Class of 2020</p>
                <div>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-muted-foreground font-mono font-semibold text-sm tracking-wide">
                        {personalDetails.registration_no}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={2}>
                      Registration no.
                    </TooltipContent>
                  </Tooltip>
                  |
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-muted-foreground font-mono font-semibold text-sm tracking-wide">
                        {personalDetails.roll_no}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={2}>Roll no.</TooltipContent>
                  </Tooltip>
                </div>
                <div>{user?.email}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal details</CardTitle>
          <CardDescription>
            These details are used for account safety purposes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={styles["box-table"]}>
            <div className={styles["box-row"]}>
              <p className={cx(styles.col, styles["label"])}>Date of Birth</p>
              <p className={cx(styles.col, styles["value"])}>
                {getDate(personalDetails.dob)}
              </p>
            </div>
            <div className={styles["box-row"]}>
              <p className={cx(styles.col, styles["label"])}>Sex</p>
              <p className={cx(styles.col, styles["value"])}>
                {personalDetails.sex}
              </p>
            </div>
            <div className={styles["box-row"]}>
              <p className={cx(styles.col, styles["label"])}>Category</p>
              <p className={cx(styles.col, styles["value"])}>
                {personalDetails.category}
              </p>
            </div>
            <div className={styles["box-row"]}>
              <p className={cx(styles.col, styles["label"])}>Nationality</p>
              <p className={cx(styles.col, styles["value"])}>
                {personalDetails.nationality}
              </p>
            </div>
            <div className={styles["box-row"]}>
              <p className={cx(styles.col, styles["label"])}>Religion</p>
              <p className={cx(styles.col, styles["value"])}>
                {personalDetails.religion}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles["box-table"]}>
            <div className={cx(styles["box-row"], styles.header)}>
              <div className={styles["col"]}>
                <h4 className={styles["box-col-header"]}>Address</h4>
              </div>
              <div className={styles["col"]}>
                <h4 className={styles["box-col-header"]}>Email & Phone</h4>
              </div>
            </div>
            <div className={styles["box-row"]}>
              <div className={styles["col"]}>
                <p className={styles["value"]}>{personalDetails.address}</p>
                <p className={styles["value"]}>
                  {personalDetails.city}, {personalDetails.state}
                </p>
                <p
                  className={styles["value"]}
                >{`${personalDetails.country} (${personalDetails.pincode})`}</p>
              </div>
              <div className={styles["col"]}>
                <p className={styles["value"]}>{user?.email}</p>
                <p className={styles["value"]}>{personalDetails.alt_email}</p>
                <p className={styles["value"]}>{personalDetails.phone}</p>
                <p className={styles["value"]}>{personalDetails.alt_phone}</p>
              </div>
            </div>
          </div>
          <div className={styles["box-table"]}>
            <div className={cx(styles["box-row"], styles.header)}>
              <h4 className={cx(styles["col"], styles["box-col-header"])}>
                Your Social Profiles
              </h4>
            </div>
            <div className={styles["box-row"]}>
              <p
                className={cx(
                  styles.col,
                  styles["label"],
                  "flex gap-1 items-center"
                )}
              >
                <LinkedInLogoIcon />
                LinkedIn
              </p>
              <p className={cx(styles.col, styles["value"])}>
                {personalDetails.linkedin ? (
                  <a
                    className="link"
                    href={personalDetails.linkedin}
                    target="_blank"
                  >
                    {personalDetails.linkedin}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
            <div className={styles["box-row"]}>
              <p
                className={cx(
                  styles.col,
                  styles["label"],
                  "flex gap-1 items-center"
                )}
              >
                <GitHubLogoIcon />
                GitHub
              </p>
              <p className={cx(styles.col, styles["value"])}>
                {personalDetails.github ? (
                  <a
                    className="link"
                    href={personalDetails.github}
                    target="_blank"
                  >
                    {personalDetails.github}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className={styles["dashboard-page"]}>
      <Alert severity="info">
        {user?.role.includes("admin")
          ? "Fill in your personal details to complete creating your profile"
          : "Fill in your personal details to complete creating your alumni profile"}
      </Alert>
      <Card>
        <CardContent>
          <PersonalDetailsForm
            prefillData={
              { ...personalDetails, email: user?.email } as FieldValues
            }
            onSubmit={updateProfile}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalDetails;
