import cx from "classnames";
import SchemaForm from "@/components/forms";
import Modal from "@/components/custom-ui/Modal/Modal";
import { EditPencil, PlusCircle as AddIcon } from "iconoir-react";
import styles from "@/components/layouts/dashboard/Dashboard.module.scss";
import { useEffect, useState } from "react";
import {
  educationFormNITAPSchema,
  educationFormSchema,
} from "@/utils/formSchema/educationForm";
import { FieldValues } from "react-hook-form";
import fetchEducationApi from "@/utils/api/profile/education/fetchEducation";
import updateEducationApi from "@/utils/api/profile/education/updateEducation";
import { EducationType } from "@/types/Profile.type";
import { getMonth } from "@/utils/helper";
import useUser from "@/hooks/user";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ProfileTableRowSkeleton } from "@/components/Skeletons/Skeletons";
import { toast } from "react-toastify";

interface EducationFormProps {
  onSubmit: (data: FieldValues) => void;
  prefillData?: FieldValues;
  loading?: boolean;
}
const EducationFormNITAP: React.FC<EducationFormProps> = ({
  onSubmit,
  prefillData = {
    institute: "National Institute of Technology, Arunachal Pradesh",
  },
  loading,
}) => {
  return (
    <SchemaForm
      prefillData={prefillData}
      schema={educationFormNITAPSchema}
      onSubmit={onSubmit}
      actions={
        <Button disabled={loading} type="submit">
          {loading ? "Saving" : "Save"}
        </Button>
      }
    />
  );
};

const EducationForm: React.FC<EducationFormProps> = ({
  onSubmit,
  prefillData = {},
  loading,
}) => {
  return (
    <SchemaForm
      prefillData={prefillData}
      schema={educationFormSchema}
      onSubmit={onSubmit}
      actions={
        <Button disabled={loading} type="submit">
          {loading ? "Saving" : "Save"}
        </Button>
      }
    />
  );
};

interface EducationRowProps {
  data: EducationType;
  openEditModal: (data: FieldValues) => void;
}
const EducationRow: React.FC<EducationRowProps> = ({ data, openEditModal }) => {
  return (
    <TableRow>
      <TableCell className="max-w-fit w-[66px]">
        <div className={styles["logo-container"]}>
          {data.institute ===
          "National Institute of Technology, Arunachal Pradesh" ? (
            <img
              className={styles["logo"]}
              src="/nitap-logo.svg"
              alt="nitap-logo"
            />
          ) : (
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/university.png"
              alt="university"
            />
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className={cx(styles["college-name"], styles.value)}>
          {data.institute}
        </div>
        <div className={cx(styles["course-details"], styles.label)}>
          <p className={cx(styles["course-name"])}>
            {data.degree} ({data.type}) in {data.discipline}
          </p>
          <p className={cx(styles["course-duration"])}>
            {getMonth(data.start_date)}
            {" - "}
            {getMonth(data.end_date)}
            {new Date(data.end_date) > new Date() ? " (Expected)" : ""}
          </p>
        </div>
        {!!data.description && (
          <div className={cx(styles["course-description"])}>
            {data.description}
          </div>
        )}
      </TableCell>
      <TableCell className="w-12 text-right">
        <Button
          aria-label="Edit experience details"
          className="p-1.5 rounded-full w-8 h-8"
          variant="secondary"
          onClick={() => openEditModal(data)}
        >
          <EditPencil />
        </Button>
      </TableCell>
    </TableRow>
  );
};

const Education: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPrefillData, setEditPrefillData] = useState<EducationType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [educations, setEducations] = useState<EducationType[] | null>([]);
  const { user } = useUser();

  // add, update or delete
  const updateEducation = async (data: FieldValues) => {
    try {
      setLoading(true);
      const res = await updateEducationApi(data as EducationType);
      if (res?.success) {
        fetchEducation();
        setIsModalOpen(false);
        toast.success("Educations updated");
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEducation = async () => {
    try {
      setPageLoading(true);
      const data = await fetchEducationApi();
      if (data) {
        setEducations(data.educationRecords || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const openModal = (data: FieldValues | null = null) => {
    if (user?.profile_locked) return;
    setEditPrefillData(data as EducationType | null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Education</TableHead>
              <TableHead colSpan={1} className="text-right">
                <Button
                  variant="link"
                  className="hover:no-underline px-0"
                  disabled={!!user?.profile_locked || pageLoading}
                  onClick={() => openModal()}
                >
                  <AddIcon />
                  Add
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageLoading ? (
              <>
                <ProfileTableRowSkeleton />
                <ProfileTableRowSkeleton />
              </>
            ) : (
              educations?.map((e) => (
                <EducationRow data={e} key={e.id} openEditModal={openModal} />
              ))
            )}
          </TableBody>

          {!pageLoading &&
            (educations?.length === 0 ? (
              <Modal
                modalTitle="Add education at NIT Arunachal Pradesh"
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
              >
                <div className="bg-card px-8 py-6">
                  <EducationFormNITAP
                    onSubmit={updateEducation}
                    loading={loading}
                  />
                </div>
              </Modal>
            ) : (
              <Modal
                modalTitle={
                  editPrefillData ? "Edit Education" : "Add Education"
                }
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
              >
                <div className="bg-card px-8 py-6">
                  <EducationForm
                    onSubmit={updateEducation}
                    prefillData={editPrefillData as FieldValues}
                    loading={loading}
                  />
                </div>
              </Modal>
            ))}
        </Table>
      </CardContent>
    </Card>
  );
};

export default Education;
