import Alert from "../custom-ui/Alert/Alert";
import { Link } from "react-router-dom";
import useUser from "@/hooks/user";

const ProfileCompletionStatus = () => {
  const { user, profileCompletionStatus } = useUser();

  if (!profileCompletionStatus) return null;

  const { personal_profile, education, membership_application } =
    profileCompletionStatus;

  return (
    !membership_application &&
    !user?.role.includes("alumni") && (
      <Alert>
        Complete{" your "}
        {!personal_profile && (
          <Link className="link" to="/profile">
            personal details,{" "}
          </Link>
        )}
        {!education && (
          <>
            <Link className="link" to="/profile/education">
              education at NITAP
            </Link>
            {" then fill "}
          </>
        )}
        <Link className="link" to="/alumni-membership">
          Alumni Membership form
        </Link>{" "}
        to apply for life membership.
      </Alert>
    )
  );
};

export default ProfileCompletionStatus;
