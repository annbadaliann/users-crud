import { useCallback } from "react";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

import { Pagination, PaginationItem } from "@mui/material";

interface IColumn {
  title: string;
  field: string;
  layout: (row: any) => any;
}
interface IRow {
  id: string;
  isSelected?: boolean;
}
interface ITableProps {
  rows: IRow[];
  columns: IColumn[];
  disableCheckbox?: boolean;
  isSelectable?: boolean;
  pageChangeCallback: (page: number) => void;
  paginationDetails: any,
}

interface IPagination {
  count?: number;
  page: number | undefined;
  handleChange: (_: unknown, pageNumber: number) => Promise<void>;
}

const TablePagination = ({
  count,
  page,
  handleChange,
}: IPagination) => {
  return (
    <div style={{ padding: "10px", display: "flex" }}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        shape="rounded"
        renderItem={(item) => <PaginationItem {...item} />}
      />
    </div>
  );
};


const TcoTable = ({
  rows,
  columns,
  pageChangeCallback,
  paginationDetails,
}: ITableProps) => {

  const handleChangePage = async (_: unknown, pageNumber: number) => {
    pageChangeCallback(pageNumber);
  };

  const generateSingleRow = useCallback(
    (row) =>
      columns?.map((col: IColumn) => {
        const value = col.layout ? col.layout(row) : row[col.field];
        return (
          <TableCell key={col.field} align="left">
              {value}
          </TableCell>
        );
      }),
    [columns]
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCell>{item.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>{generateSingleRow(row)}</TableRow>
          ))}
        </TableBody>
        {paginationDetails !== null && paginationDetails?.total > paginationDetails.per_page && (
          <TablePagination
            count={paginationDetails?.total_pages}
            page={paginationDetails.page}
            handleChange={handleChangePage}
          />
        )}
      </Table>
    </TableContainer>
  );
};

export default TcoTable;
