import { SchemaField } from "@/components/forms/SchemaForm/Schema.type";

const personalDetailsFormSchema: SchemaField[] = [
  { type: "section", label: "Personal Details" },
  {
    name: "title",
    label: "Title",
    type: "select",
    required: "Title is required",
    options: [
      { value: "Mr", label: "Mr" },
      { value: "Mrs", label: "Mrs" },
      { value: "Ms", label: "Ms" },
      { value: "Dr", label: "Dr" },
    ],
  },
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    required: "Please provide first name",
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    required: "Please provide last name",
  },
  {
    name: "registration_no",
    label: "Registration no.",
    type: "text",
    required: "Please provide registration number",
  },
  {
    name: "roll_no",
    label: "Roll no.",
    type: "text",
    required: "Please provide roll number",
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: "Please provide date of birth",
  },
  {
    name: "sex",
    label: "Sex",
    type: "select",
    required: "Sex is required",
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Others", label: "Others" },
    ],
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: "Category is required",
    options: [
      { value: "General", label: "General" },
      { value: "OBC", label: "OBC" },
      { value: "SC", label: "SC" },
      { value: "ST", label: "ST" },
      { value: "EWS", label: "EWS" },
    ],
  },
  {
    name: "nationality",
    label: "Nationality",
    type: "text",
    required: "Nationality is required",
  },
  {
    name: "religion",
    label: "Religion",
    type: "text",
    required: "Religion is required",
  },
  { type: "section", label: "Contact Details" },
  {
    name: "address",
    label: "Address",
    type: "text",
    required: "Please provide your street address",
  },
  {
    name: "pincode",
    label: "Pincode",
    type: "number",
    required: "Pincode is required",
  },
  {
    name: "state",
    label: "State/Province/Region",
    type: "text",
    required: "State/Province/Region is required",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: "City is required",
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    required: "Country is required",
  },
  {
    name: "email",
    label: "Email (update primary email from account settings)",
    type: "email",
    required: "Primary email is required",
    disabled: true,
  },
  { name: "alt_email", label: "Alternate Email", type: "email" },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    required: "Phone number is required",
  },
  { name: "alt_phone", label: "Alternate Phone", type: "text" },
  { name: "linkedin", label: "Linkedin", type: "text" },
  { name: "github", label: "Github", type: "text" },
];

export default personalDetailsFormSchema;
