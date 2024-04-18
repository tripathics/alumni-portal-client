import cx from "classnames";
import SchemaForm from "@/components/forms";
import { Button } from "@/components/ui/button";
import Modal from "@/components/custom-ui/Modal/Modal";
import { EditPencil, PlusCircle as AddIcon } from "iconoir-react";
import styles from "@/components/layouts/dashboard/Dashboard.module.scss";
import { useEffect, useState } from "react";
import experienceFormSchema from "@/utils/formSchema/experienceFormSchema";
import { FieldValues } from "react-hook-form";
import fetchExperiencesApi from "@/utils/api/fetchExperience";
import { ExperienceType } from "@/types/Profile.type";
import { getMonth } from "@/utils/helper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableCell,
  TableRow,
} from "@/components/custom-ui/Table/FlexTable";

interface ExperienceFormProps {
  prefillData?: FieldValues;
  onSubmit: (data: FieldValues) => void;
}
const ExperienceForm: React.FC<ExperienceFormProps> = ({
  onSubmit,
  prefillData = {},
}) => (
  <SchemaForm
    prefillData={prefillData}
    schema={experienceFormSchema}
    onSubmit={onSubmit}
    actions={<Button type="submit">Save changes</Button>}
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
      <div className={cx(styles["logo-container"])}>
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/ios-filled/50/university.png"
          alt="university"
        />
      </div>
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
      <div className={styles.actions}>
        <Button
          aria-label="Edit experience details"
          className="p-1.5 rounded-full w-8 h-8"
          variant="ghost"
          onClick={() => openEditModal(data)}
        >
          <EditPencil />
        </Button>
      </div>
    </TableRow>
  );
};

const Experience: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPrefillData, setEditPrefillData] = useState<ExperienceType | null>(
    null
  );
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);

  // add, update or delete
  const updateExperience = (data: FieldValues) => {
    fetch("/api/users/experience", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          fetchExperiences();
          return res.json();
        }
        return null;
      })
      .then((resJson) => {
        console.log(resJson);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchExperiences = async () => {
    try {
      const response = await fetchExperiencesApi();
      if (response?.success) {
        setExperiences(response.experienceRecords || []);
      }
    } catch (error) {
      console.error(error);
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
      <CardHeader>
        <Table>
          <TableRow header>
            <TableCell>
              <h3 className={styles["title"]}>Experience</h3>
            </TableCell>
            <div className={styles["actions"]}>
              <Button
                variant="link"
                className="hover:no-underline px-0"
                onClick={() => openModal()}
              >
                <AddIcon />
                Add
              </Button>
            </div>
          </TableRow>
        </Table>
      </CardHeader>
      <CardContent>
        <Table>
          {experiences.map((e) => (
            <ExperienceRow data={e} key={e.id} openEditModal={openModal} />
          ))}
          <Modal
            modalTitle={editPrefillData ? "Edit Experience" : "Add Experience"}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          >
            <div className="bg-card px-8 py-6">
              <ExperienceForm
                onSubmit={updateExperience}
                prefillData={editPrefillData as FieldValues}
              />
            </div>
          </Modal>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Experience;
