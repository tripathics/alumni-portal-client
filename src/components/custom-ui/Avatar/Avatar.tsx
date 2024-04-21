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
        className="w-full h-full object-cover"
        src={`/media/avatars/${avatar}`}
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
