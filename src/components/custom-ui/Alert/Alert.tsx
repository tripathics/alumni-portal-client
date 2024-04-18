import { Card, CardContent } from "@/components/ui/card";
import styles from "./Alert.module.scss";
import cx from "classnames";

import {
  Xmark,
  WarningCircle,
  InfoCircle,
  CheckCircle,
  WarningTriangle,
} from "iconoir-react";
import { Button } from "@/components/ui/button";

interface AlertProps {
  children: React.ReactNode;
  severity?: "error" | "success" | "warning" | "info";
  isOpen?: boolean;
  onClose?: () => void;
}
const Alert: React.FC<AlertProps> = ({
  children,
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
    (isOpen || (onClose === undefined && isOpen === undefined)) && (
      <Card
        role="alert"
        className={cx(styles.alert, severity && styles[severity])}
      >
        <CardContent className={styles["alert-content"]}>
          <AlertIcon className={styles["alert-icon"]} width={24} height={24} />
          <div className={styles["message"]}>
            <p
              className={cx(styles["message-text"], {
                ["pr-6"]: !!onClose,
              })}
            >
              {children}
            </p>
            {onClose && (
              <Button
                variant="ghost"
                aria-label="Close alert"
                onClick={() => onClose()}
                type="button"
                className={styles["close"]}
              >
                <Xmark />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default Alert;
