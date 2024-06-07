import cx from "classnames";

interface PageHeaderProps {
  pageHeading?: string;
  subHeading?: string;
  children?: React.ReactNode;
  bgImage?: string;
  variant?: "default" | "large";
}
const PageHeader: React.FC<PageHeaderProps> = ({
  pageHeading,
  subHeading,
  children,
  bgImage,
  variant = "default",
}) => {
  const variantStyles = {
    default: "gap-4",
    large: "gap-12 md:gap-20 md:min-h-[70vh] min-h-[50vh]",
  };

  return (
    <header className="relative bg-transparent text-white">
      <div
        className="bg-no-repeat bg-center md:bg-size-header bg-cover w-full h-full -z-[1] absolute bg-black"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute w-full h-full -z-[1] md:bg-header-large bg-header-mobile" />
      <div
        className={cx(
          "container py-10 flex flex-col justify-center",
          variantStyles[variant]
        )}
      >
        {pageHeading && <PageTitle variant={variant} title={pageHeading} />}
        {subHeading && <PageSubtitle variant={variant} subtitle={subHeading} />}
        {children && children}
      </div>
    </header>
  );
};

export const PageTitle: React.FC<{
  title: string;
  variant?: "default" | "large";
}> = ({ title, variant = "default" }) => {
  const variantStyles = {
    default: "text-3xl md:text-4xl",
    large: "md:text-5xl text-4xl max-w-2xl",
  };

  return (
    <h1 className={cx("font-serif font-semibold", variantStyles[variant])}>
      {title}
    </h1>
  );
};

export const PageSubtitle: React.FC<{
  subtitle: string;
  variant?: "default" | "large";
}> = ({ subtitle, variant = "default" }) => {
  const variantStyles = {
    default: "md:text-xl text-base",
    large: "md:text-xl text-lg max-w-2xl",
  };

  return <p className={cx("font-light", variantStyles[variant])}>{subtitle}</p>;
};

export default PageHeader;
