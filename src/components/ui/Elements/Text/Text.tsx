interface TextProps {
  component?:
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "span"
    | "strong"
    | "em";
  children?: React.ReactNode;
  className?: string;
}
const Text: React.FC<TextProps> = ({
  component: Component = "p",
  children,
  className,
}) => {
  return <Component className={className}>{children}</Component>;
};

export default Text;
