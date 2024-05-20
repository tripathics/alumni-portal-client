import useUser from "@/hooks/user";
import Alert from "../custom-ui/Alert/Alert";
import { Link } from "react-router-dom";

const ProfileCompletionStatus = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    !user.profile_locked &&
    !user.role.includes("alumni") && (
      <Alert>
        Complete{" your "}
        {!user.first_name && (
          <Link className="link" to="/profile">
            personal details,{" "}
          </Link>
        )}
        {!user.education_at_nitap_exists && (
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
