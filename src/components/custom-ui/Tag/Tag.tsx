import styles from "./Tag.module.scss";

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className={styles.tag}>{children}</span>;
};

export default Tag;
