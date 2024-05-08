import PageHeader from "@/components/layouts/PageHeader/PageHeader";
import MembershipForm from "./MembershipApplication";
import styles from "./Alumni.module.scss";
import cx from "classnames";

const AlumniMembership: React.FC = () => {
  return (
    <>
      <PageHeader
        pageHeading="Alumni membership"
        subHeading="Apply for life membership for NIT Arunachal Pradesh, alumni association"
        bgImage="/header-bg/2022-01-03.jpg"
      />
      <div
        className={cx(
          "__page-content container",
          styles["membership-form-wrapper"]
        )}
      >
        <MembershipForm />
      </div>
    </>
  );
};

export default AlumniMembership;
