import { TextField } from "@/components/forms";
import styles from "@/components/layouts/auth/Auth.module.scss";
import useUser from "@/hooks/user";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import cx from "classnames";
import { Mail as MailIcon, Key as KeyIcon } from "iconoir-react";
import Alert from "@/components/custom-ui/Alert/Alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthHeader } from "@/components/layouts/auth";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [error, setError] = useState<string | React.ReactNode | null>(null);

  const [loading, setLoading] = useState(false);
  const { login, user } = useUser();

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      await login(data as { email: string; password: string });
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading || !user) return;
    if (!user.first_name) {
      if (user.role.includes("admin")) {
        return navigate("/admin");
      }
      navigate("/profile");
    } else {
      const { from } = location.state || { from: { pathname: "/" } };
      navigate(from);
    }
  }, [user, loading, location, navigate]);

  return (
    <div className={cx("container", styles["login-container"])}>
      <AuthHeader title="Sign in to NIT AP Alumni" />
      <div className="last:*:mb-0">
        {location.state?.from && <Alert>Please login to continue</Alert>}
        <Alert isOpen={!!error} severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </div>
      <Card>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cx(styles["login-form"])}
          >
            <TextField
              type="text"
              required
              label="Email"
              Icon={MailIcon}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
              value={watch("email")}
              error={errors["email"]}
            />
            <TextField
              type="password"
              required
              label="Password"
              Icon={KeyIcon}
              {...register("password", { required: "Password is required" })}
              value={watch("password")}
              error={errors["password"]}
            />
            <div className={styles["actions"]}>
              <Button loading={loading} type="submit">
                {loading ? "Signing in" : "Sign in"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardContent className={styles["action-links"]}>
          <p>
            Forgot your password?{" "}
            <Link className="link" to="/reset-password">
              Reset it here
            </Link>
          </p>
          <p>
            {"Don't have an account?"}{" "}
            <Link className="link" to="/register">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
