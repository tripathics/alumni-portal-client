import styles from "./Alert.module.scss";
import cx from "classnames";

import {
  Xmark,
  WarningCircle,
  InfoCircle,
  CheckCircle,
  WarningTriangle,
} from "iconoir-react";

interface AlertProps {
  message: string | React.ReactNode;
  severity?: "error" | "success" | "warning" | "info";
  isOpen?: boolean;
  onClose?: () => void;
}
const Alert: React.FC<AlertProps> = ({
  message,
  severity,
  isOpen,
  onClose,
}) => {
  const AlertIcon = {
    error: WarningCircle,
    success: CheckCircle,
    warning: WarningTriangle,
    info: InfoCircle,
  }[severity || "info"];

  return (
    (isOpen || onClose === undefined) && (
      <div className={cx(styles["alert"], severity ? styles[severity] : null)}>
        <div className={styles["alert-content"]}>
          <AlertIcon className={styles["alert-icon"]} width={24} height={24} />
          <div className={styles["message"]}>{message}</div>
        </div>
        {onClose && (
          <button
            onClick={() => onClose()}
            type="button"
            className={styles["close"]}
          >
            <Xmark />
          </button>
        )}
      </div>
    )
  );
};

export default Alert;
