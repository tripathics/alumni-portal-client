import styles from "./FlexTable.module.scss";
import cx from "classnames";

export const Table: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={cx(styles.table, className)}>{children}</div>;
};

export const TableRow: React.FC<{
  children: React.ReactNode;
  header?: boolean;
  className?: string;
}> = ({ children, header, className }) => {
  return (
    <div className={cx(styles.row, className, { [styles.header]: header })}>
      {children}
    </div>
  );
};

export const TableCell: React.FC<{
  children: React.ReactNode;
  type?: "label" | "value";
  className?: string;
}> = ({ children, type = "value", className }) => {
  return (
    <div
      className={cx(styles.col, className, {
        [styles.label]: type === "label",
        [styles.value]: type === "value",
      })}
    >
      {children}
    </div>
  );
};

const FlexTable: React.FC<{
  headings?: React.ReactNode[];
  rows: React.ReactNode[][];
}> = ({ headings, rows }) => {
  return (
    <Table>
      {headings && (
        <TableRow header>
          {headings.map((heading, i) => (
            <TableCell key={i}>{heading}</TableCell>
          ))}
        </TableRow>
      )}
      {rows.map((row, i) => (
        <TableRow key={i}>
          {row.map((cell, j) => (
            <TableCell key={j}>{cell}</TableCell>
          ))}
        </TableRow>
      ))}
    </Table>
  );
};

export default FlexTable;
