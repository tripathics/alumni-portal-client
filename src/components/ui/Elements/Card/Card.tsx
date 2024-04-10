import cx from "classnames";
import styles from "./Card.module.scss";

const Card: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={cx(styles.card, className)}>{children}</div>;
};

export default Card;
