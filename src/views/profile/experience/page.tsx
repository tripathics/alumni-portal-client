import cx from "classnames";
import SchemaForm from "@/components/forms";
import { Button } from "@/components/ui/button";
import Modal from "@/components/custom-ui/Modal/Modal";
import { EditPencil, PlusCircle as AddIcon } from "iconoir-react";
import styles from "@/components/layouts/dashboard/Dashboard.module.scss";
import { useEffect, useState } from "react";
import experienceFormSchema from "@/utils/formSchema/experienceFormSchema";
import { FieldValues } from "react-hook-form";
import fetchExperiencesApi from "@/utils/api/profile/experience/fetchExperience";
import { ExperienceType } from "@/types/Profile.type";
import { getMonth } from "@/utils/helper";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import updateExperience from "@/utils/api/profile/experience/updateExperience";
import { toast } from "react-toastify";
import { ProfileTableRowSkeleton } from "@/components/Skeletons/Skeletons";

interface ExperienceFormProps {
  onSubmit: (data: FieldValues) => void;
  prefillData?: FieldValues;
  loading?: boolean;
}
const ExperienceForm: React.FC<ExperienceFormProps> = ({
  onSubmit,
  prefillData = {},
  loading,
}) => (
  <SchemaForm
    prefillData={prefillData}
    schema={experienceFormSchema}
    onSubmit={onSubmit}
    actions={
      <Button disabled={loading} type="submit">
        {loading ? "Saving" : "Save"}
      </Button>
    }
  />
);

interface ExperienceRowProps {
  data: FieldValues;
  openEditModal: (data: FieldValues) => void;
}
const ExperienceRow: React.FC<ExperienceRowProps> = ({
  data,
  openEditModal,
}) => {
  return (
    <TableRow>
      <TableCell className="max-w-fit w-[66px]">
        <div className={cx(styles["logo-container"])}>
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios-filled/50/university.png"
            alt="university"
          />
        </div>
      </TableCell>
      <TableCell>
        <div className={cx(styles["college-name"], styles.value)}>
          {data.organisation}
        </div>
        <div className={cx(styles["course-details"], styles.label)}>
          <p className={cx(styles["course-name"])}>
            {data.designation} {data.type === "internship" && data.type}
          </p>
          <p className={cx(styles["course-name"])}>{data.location}</p>
          <p className={cx(styles["course-duration"])}>
            {getMonth(data.start_date)}
            {" - "}
            {data.end_date ? getMonth(data.end_date) : "Present"}
          </p>
        </div>
        {!!data.description && (
          <div className={cx(styles["course-description"])}>
            {data.description}
          </div>
        )}
      </TableCell>
      <TableCell className="text-right w-12">
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

const Experience: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPrefillData, setEditPrefillData] = useState<ExperienceType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);

  // add, update or delete
  const handleUpdateExperience = async (data: FieldValues) => {
    try {
      setLoading(true);
      const response = await updateExperience(data as ExperienceType);
      if (response?.success) {
        fetchExperiences();
        toast.success("Experiences updated");
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchExperiences = async () => {
    try {
      setPageLoading(true);
      const response = await fetchExperiencesApi();
      if (response?.success) {
        setExperiences(response.experienceRecords || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const openModal = (data: FieldValues | null = null) => {
    setEditPrefillData(data as ExperienceType | null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Experience</TableHead>
              <TableHead colSpan={1} className="text-right">
                <Button
                  variant="link"
                  className="hover:no-underline px-0"
                  disabled={pageLoading}
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
              experiences.map((e) => (
                <ExperienceRow data={e} key={e.id} openEditModal={openModal} />
              ))
            )}
          </TableBody>

          <Modal
            modalTitle={editPrefillData ? "Edit Experience" : "Add Experience"}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          >
            <div className="bg-card px-8 py-6">
              <ExperienceForm
                onSubmit={handleUpdateExperience}
                prefillData={editPrefillData as FieldValues}
                loading={loading}
              />
            </div>
          </Modal>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Experience;
