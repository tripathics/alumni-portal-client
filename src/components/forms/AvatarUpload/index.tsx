import EditAvatar from "@/components/custom-ui/Avatar/EditAvatar";
import styles from "./AvatarUpload.module.scss";
import formStyles from "@/components/forms/Form.module.scss";
import cx from "classnames";
import { Upload as UploadIcon, Trash as TrashIcon } from "iconoir-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useState } from "react";

interface AvatarUploadProps {
  avatar: string | null;
  updateAvatar: (avatar: File) => void;
  loading?: boolean;
}
const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatar,
  updateAvatar,
  loading,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [fileUrl, setFileUrl] = useState(avatar);

  const onSubmit = async (data: FieldValues) => {
    updateAvatar(data.avatar);
  };

  const checkFileType = (file: File): string | true => {
    if (!file) {
      return true;
    }
    if (
      !["image/webp", "image/png", "image/jpeg", "image/jpg"].includes(
        file.type
      )
    ) {
      return "Inavalid file format";
    }
    return true;
  };

  const checkFileSize = (file: File): string | true => {
    if (!file) {
      return true;
    }
    const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
    const minFileSize = 10 * 1024; // 10kB in bytes
    if (file.size > maxFileSize) {
      return `File size should be less than ${maxFileSize / (1024 * 1024)} MB`;
    }
    if (file.size < minFileSize) {
      return `File size should be greater than ${minFileSize / 1024} kB`;
    }
    return true;
  };

  return (
    <div className={cx(styles["avatar-upload"])}>
      <EditAvatar avatar={fileUrl} className={styles["avatar-crop"]} />
      <div className={styles["avatar-upload-info"]}>
        <p>
          For best results, use an image at least 200px by 200px in .jpg format
        </p>
      </div>
      {errors.avatar && (
        <p className={formStyles["error"]}>{errors.avatar.message as string}</p>
      )}
      <form className="w-full">
        <div className={styles["avatar-upload-actions"]}>
          <Controller
            control={control}
            rules={{
              validate: {
                checkFileType, // Use the checkFileType function as a validation rule
                checkFileSize,
              },
            }}
            name="avatar"
            render={({ field }) => (
              <>
                <label
                  tabIndex={0}
                  className={buttonVariants({
                    variant: "outline",
                    size: "default",
                  })}
                >
                  <UploadIcon />
                  {fileUrl ? "Change picture" : "Upload picture"}
                  <input
                    {...field}
                    className="hidden"
                    type="file"
                    multiple={false}
                    value={field.value?.fileName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files && e.target.files.length > 0) {
                        field.onChange(e.target.files[0]);
                        setFileUrl(URL.createObjectURL(e.target.files[0]));
                      } else {
                        field.onChange(null);
                        setFileUrl(null);
                      }
                    }}
                  />
                </label>
                {fileUrl && (
                  <Button
                    onClick={() => {
                      field.onChange(null);
                      setFileUrl(null);
                    }}
                    variant="outline"
                  >
                    <TrashIcon />
                    Remove picture
                  </Button>
                )}
              </>
            )}
          />
          {avatar !== fileUrl && (
            <Button
              className="text-base"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AvatarUpload;
