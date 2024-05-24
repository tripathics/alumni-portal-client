import PageHeader from "@/components/layouts/PageHeader/PageHeader";
import MembershipForm from "./MembershipApplication";
import styles from "./Alumni.module.scss";
import cx from "classnames";

import MembershipApplicationPrint from "./MembershipApplicationPrint";
import ProfileCompletionStatus from "@/components/ProfileCompletionStatus/ProfileCompletionStatus";

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
        <ProfileCompletionStatus />
        <MembershipForm />
      </div>
    </>
  );
};

export { MembershipApplicationPrint };
export default AlumniMembership;
