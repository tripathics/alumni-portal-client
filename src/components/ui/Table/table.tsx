import styles from "./Table.module.scss";
import cx from "classnames";

export const Table: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={styles["table-wrapper"]}>
      <table className={cx(styles.table, className)}>{children}</table>
    </div>
  );
};

export const TableHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <thead className={className}>{children}</thead>
);

export const TableBody: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <thead className={className}>{children}</thead>
);

export const TableRow: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <tr className={className}>{children}</tr>;
};

export const TableCell: React.FC<{
  children: React.ReactNode;
  heading?: boolean;
  className?: string;
}> = ({ children, heading, className }) => {
  return heading ? (
    <th className={className}>{children}</th>
  ) : (
    <tr className={className}>{children}</tr>
  );
};

const DataTable: React.FC<{
  headings: string[];
  rows: React.ReactNode[][];
}> = ({ headings, rows }) => (
  <Table>
    <TableHeading>
      <TableRow>
        {headings.map((heading, index) => (
          <th key={index}>{heading}</th>
        ))}
      </TableRow>
    </TableHeading>
    <TableBody>
      {rows.map((row, index) => (
        <tr key={index}>
          {row.map((cell, index) => (
            <td key={index}>{cell}</td>
          ))}
        </tr>
      ))}
    </TableBody>
  </Table>
);

export default DataTable;
