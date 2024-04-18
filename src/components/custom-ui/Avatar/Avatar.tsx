import AvatarProps from "./AvatarProp.type";
import { ProfileCircle } from "iconoir-react";
import styles from "./Avatar.module.scss";
import cx from "classnames";

const Avatar: React.FC<AvatarProps> = ({ avatar, className, size }) => {
  return avatar ? (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={cx(styles.avatar, className)}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/media/avatars/${avatar}`}
        alt="avatar"
      />
    </div>
  ) : (
    <ProfileCircle
      className={styles.fallbackIcon}
      strokeWidth={0.8}
      style={{
        width: size,
        height: size,
      }}
      width={size}
      height={size}
    />
  );
};

export default Avatar;
