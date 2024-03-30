import AvatarProps from "./AvatarProp.type";
import styles from "./Avatar.module.scss";
import cx from "classnames";

const EditAvatar: React.FC<AvatarProps> = ({
  avatar,
  className = "",
  size = "200px",
}) => (
  <div
    style={className.length ? {} : { width: size, height: size }}
    className={cx(styles["avatar"], className)}
  >
    {avatar ? (
      avatar.includes("blob:") ? (
        <img src={avatar} alt="avatar" />
      ) : (
        <img
          src={`${
            import.meta.env.VITE_SERVER_BASE_URL
          }/media/avatars/${avatar}`}
          alt="avatar"
        />
      )
    ) : (
      <img src="https://via.placeholder.com/200" alt="avatar" />
    )}
  </div>
);

export default EditAvatar;
