import AvatarProps from "./AvatarProp.type";
import { ProfileCircle } from "iconoir-react";
import cx from "classnames";

const Avatar: React.FC<AvatarProps> = ({ avatar, className, size }) => {
  return avatar ? (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={cx(
        className,
        "rounded-full overflow-hidden aspect-square shrink-0 w-48"
      )}
    >
      <img
        className="w-full h-full object-cover"
        src={`/media/avatars/${avatar}`}
        alt="avatar"
      />
    </div>
  ) : (
    <ProfileCircle
      className="w-48 h-48 shrink-0"
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
