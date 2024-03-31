export const getDate = (date: string): string => {
  const d = new Date(date).toISOString().split("T")[0];
  return new Date(d).toLocaleDateString("en-IN", {
    dateStyle: "long",
  });
};

export const getMonth = (date: string): string => {
  const d = new Date(date).toISOString().split("T")[0];
  return new Date(d).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
};

export const getDateWithTime = (date: string): string => {
  const d = new Date(date).toISOString().split("T")[0];
  const t = new Date(date).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "numeric",
  });
  return `${new Date(d).toLocaleDateString("en-IN", {
    dateStyle: "long",
  })}, ${t}`;
};
