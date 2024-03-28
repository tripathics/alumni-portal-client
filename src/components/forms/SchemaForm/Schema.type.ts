interface TextField {
  type: "text" | "email" | "password";
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean | string;
}

interface SelectField {
  type: "select";
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean | string;
  options: {
    value: string;
    label: string;
  }[];
}

interface DateField {
  type: "date" | "month" | "week" | "time" | "datetime-local";
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean | string;
}

interface NumberField {
  type: "number";
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean | string;
  min?: string | number;
  max?: string | number;
}

interface RadioField {
  type: "radio";
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean | string;
  options: {
    value: string;
    label: string;
  }[];
}

interface TextareaField {
  type: "textarea";
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean | string;
}

/**
 * Represents a file field in a form.
 */
interface FileField {
  type: "file";
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean | string;
  /**
   * Specifies whether multiple files can be selected.
   */
  multiple?: boolean;
  /**
   * An array of allowed file formats.
   */
  allowedFormats: string[];
  /**
   * The maximum file size allowed in bytes.
   */
  maxFileSize?: number;
  /**
   * The minimum file size allowed in bytes.
   */
  minFileSize?: number;
}

interface SectionField {
  type: "section";
  label: string;
}

export type SchemaField =
  | TextField
  | SelectField
  | DateField
  | NumberField
  | RadioField
  | TextareaField
  | FileField
  | SectionField;
