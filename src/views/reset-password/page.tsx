import { TextField } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "@/components/layouts/auth/Auth.module.scss";
import { FieldValues, useForm } from "react-hook-form";
import cx from "classnames";

import { createOtpForAuth } from "@/utils/api/otp/createOtp";
import verifyOtp from "@/utils/api/otp/verifyOtp";
import updatePassword, {
  UpdatePasswordFormData,
} from "@/utils/api/auth/updatePassword";

import { Mail as MailIcon, Key as KeyIcon } from "iconoir-react";
import { toast } from "react-toastify";
import Alert from "@/components/custom-ui/Alert/Alert";
import { AuthHeader } from "@/components/layouts/auth";
import { Card, CardContent } from "@/components/ui/card";

const OTPForm: React.FC<{
  sendOtp: (formData: FieldValues) => void;
  loading: boolean;
}> = ({ sendOtp, loading }) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(sendOtp)} className={styles["login-form"]}>
      <TextField
        type="text"
        required
        label="Registered email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^(?!.*@nitap\.ac\.in).*$/,
            message: "Invalid email or @nitap.ac.in domain is not allowed",
          },
        })}
        Icon={MailIcon}
        value={watch("email")}
        error={errors["email"]}
      />
      <div className={styles["actions"]}>
        <Button disabled={loading} type="submit">
          Send OTP
        </Button>
      </div>
    </form>
  );
};

const VerifyForm: React.FC<{
  verifyOtp: (formData: FieldValues) => void;
  email: string;
  loading: boolean;
}> = ({ verifyOtp, email, loading }) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email,
      otp: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(verifyOtp)} className={styles["login-form"]}>
      <TextField
        type="text"
        required
        disabled
        label="Registered email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^(?!.*@nitap\.ac\.in).*$/,
            message: "Invalid email or @nitap.ac.in domain is not allowed",
          },
        })}
        Icon={MailIcon}
        value={email}
        error={errors["email"]}
      />
      <TextField
        type="text"
        required
        label="Enter OTP"
        value={watch("otp")}
        {...register("otp", {
          required: "OTP is required",
          pattern: {
            value: /^\d{6}$/,
            message: "Enter a 6 digit OTP",
          },
        })}
        Icon={KeyIcon}
        error={errors["otp"]}
      />
      <div className={styles["actions"]}>
        <Button disabled={loading} type="submit">
          Verify
        </Button>
      </div>
    </form>
  );
};

const UpdatePasswordForm: React.FC<{
  signup: (formData: FieldValues) => void;
  email: string;
  loading: boolean;
}> = ({ signup, email, loading }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { email, password: "", confirmPassword: "" },
  });

  return (
    <form onSubmit={handleSubmit(signup)} className={styles["login-form"]}>
      <TextField
        type="text"
        required
        disabled
        label="Registered email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^(?!.*@nitap\.ac\.in).*$/,
            message: "Invalid email or @nitap.ac.in domain is not allowed",
          },
        })}
        Icon={MailIcon}
        value={watch("email")}
        error={errors["email"]}
      />
      <TextField
        type="password"
        required
        label="Password"
        {...register("password", {
          required: "Password is required",
        })}
        Icon={KeyIcon}
        value={watch("password")}
        error={errors["password"]}
      />
      <TextField
        type="password"
        required
        label="Confirm Password"
        value={watch("confirmPassword")}
        {...register("confirmPassword", {
          required: "Confirm Password is required",
        })}
        Icon={KeyIcon}
        error={errors["confirmPassword"]}
      />
      <div className={styles["actions"]}>
        <Button disabled={loading} type="submit">
          Update password
        </Button>
      </div>
    </form>
  );
};

const ResetPassword = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | React.ReactNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<"otp" | "verify" | "update">(
    "otp"
  );
  const navigate = useNavigate();

  const createPassword = async (signupFormData: FieldValues) => {
    try {
      setError(null);
      setLoading(true);
      const data = await updatePassword(
        signupFormData as UpdatePasswordFormData
      );
      if (data?.id) {
        toast.success("Password updated successfully. Please login.");
        navigate("/login");
      }
    } catch (error) {
      if (error === "User does not exist") {
        setError(
          <>
            Email does not exist.{" "}
            <Link className="link" to="/register">
              Register?
            </Link>
          </>
        );
      } else {
        setError(error as string);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otpFormData: FieldValues) => {
    try {
      setError(null);
      setLoading(true);
      const { email, otp } = otpFormData;
      const data = await verifyOtp(email, otp);
      if (data?.success) {
        setFormState("update");
        toast.success("Email verified");
      }
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (otpFormData: FieldValues) => {
    try {
      setError(null);
      setLoading(true);
      const data = await createOtpForAuth(otpFormData.email);
      if (data?.success) {
        setEmail(otpFormData.email);
        setFormState("verify");
      }
    } catch (error) {
      const err = error as Error;
      if (err.message) {
        if (err.message === "User does not exist") {
          setError(
            <>
              The email address does not exist.{" "}
              <Link className="link" to="/register">
                Register?
              </Link>
            </>
          );
        } else {
          setError(err.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("__page-content container", styles["login-container"])}>
      <AuthHeader title="Reset password" />
      <Alert isOpen={!!error} onClose={() => setError(null)} severity="error">
        {error}
      </Alert>
      <Card>
        <CardContent>
          {formState === "otp" ? (
            <OTPForm loading={loading} sendOtp={sendOtp} />
          ) : formState === "verify" ? (
            <VerifyForm
              loading={loading}
              verifyOtp={handleVerifyOtp}
              email={email as string}
            />
          ) : (
            <UpdatePasswordForm
              loading={loading}
              signup={createPassword}
              email={email as string}
            />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p>
            Go back to{" "}
            <Link className="link" to="/login">
              login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
