import styles from "./Button.module.scss";
import cx from "classnames";

const Button: React.FC<{
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "primary" | "secondary" | "link";
  severity?: "default" | "danger" | "warning" | "success";
  className?: string;
  attrs?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}> = ({
  children,
  type = "button",
  variant = "default",
  severity = "default",
  className,
  attrs = {},
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={cx(styles.btn, styles[variant], styles[severity], className)}
      disabled={disabled}
      {...attrs}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
