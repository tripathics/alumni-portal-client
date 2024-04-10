import cx from "classnames";
import SchemaForm from "@/components/forms";
import Modal from "@/components/ui/Modal/Modal";
import { EditPencil, PlusCircle as AddIcon } from "iconoir-react";
import styles from "@/components/layouts/dashboard/Dashboard.module.scss";
import { useEffect, useState } from "react";
import {
  educationFormNITAPSchema,
  educationFormSchema,
} from "@/utils/formSchema/educationForm";
import { FieldValues } from "react-hook-form";
import fetchEducationApi from "@/utils/api/fetchEducation";
import updateEducationApi from "@/utils/api/updateEducation";
import { EducationType } from "@/types/Profile.type";
import { getMonth } from "@/utils/helper";
import useUser from "@/hooks/user";
import Card from "@/components/ui/Elements/Card/Card";
import { Table, TableCell, TableRow } from "@/components/ui/Table/FlexTable";
import Button from "@/components/ui/Elements/Button";

interface EducationFormProps {
  prefillData?: FieldValues;
  onSubmit: (data: FieldValues) => void;
}
const EducationFormNITAP: React.FC<EducationFormProps> = ({
  onSubmit,
  prefillData = {
    institute: "National Institute of Technology, Arunachal Pradesh",
  },
}) => {
  return (
    <SchemaForm
      prefillData={prefillData}
      schema={educationFormNITAPSchema}
      onSubmit={onSubmit}
      actions={
        <Button type="submit" className="primary">
          Save
        </Button>
      }
    />
  );
};

const EducationForm: React.FC<EducationFormProps> = ({
  onSubmit,
  prefillData = {},
}) => {
  return (
    <SchemaForm
      prefillData={prefillData}
      schema={educationFormSchema}
      onSubmit={onSubmit}
      actions={
        <Button type="submit" className="primary">
          Save
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
  const { user } = useUser();

  return (
    <TableRow>
      <div className={cx(styles["logo-container"])}>
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
      <div className={styles.actions}>
        <Button
          variant="link"
          disabled={!!user?.profile_locked}
          attrs={{ "aria-label": "Edit education" }}
          className={styles.btn}
          onClick={() => openEditModal(data)}
        >
          <EditPencil />
        </Button>
      </div>
    </TableRow>
  );
};

const Education: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPrefillData, setEditPrefillData] = useState<EducationType | null>(
    null
  );
  const [educations, setEducations] = useState<EducationType[] | null>([]);
  const { user } = useUser();

  // add, update or delete
  const updateEducation = async (data: FieldValues) => {
    try {
      const res = await updateEducationApi(data as EducationType);
      if (res?.success) {
        fetchEducation();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEducation = async () => {
    try {
      const data = await fetchEducationApi();
      if (data) {
        setEducations(data.educationRecords || []);
      }
    } catch (error) {
      console.error(error);
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
      <Table>
        <TableRow header>
          <TableCell>
            <h3 className={styles["title"]}>Education</h3>
          </TableCell>
          <div className={styles["actions"]}>
            <Button
              variant="link"
              disabled={!!user?.profile_locked}
              onClick={() => openModal()}
              className={styles.btn}
            >
              <AddIcon />
              Add
            </Button>
          </div>
        </TableRow>
        {educations?.map((e) => (
          <EducationRow data={e} key={e.id} openEditModal={openModal} />
        ))}

        {educations?.length === 0 ? (
          <Modal
            modalTitle="Add education at NIT Arunachal Pradesh"
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          >
            <section className={styles.box}>
              <EducationFormNITAP onSubmit={updateEducation} />
            </section>
          </Modal>
        ) : (
          <Modal
            modalTitle={editPrefillData ? "Edit Education" : "Add Education"}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          >
            <section className={styles.box}>
              <EducationForm
                onSubmit={updateEducation}
                prefillData={editPrefillData as FieldValues}
              />
            </section>
          </Modal>
        )}
      </Table>
    </Card>
  );
};

export default Education;
