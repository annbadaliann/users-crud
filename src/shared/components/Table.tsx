import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

import { Pagination, PaginationItem } from "@mui/material";
import { useCallback } from "react";

interface IColumn {
  title: string;
  field: string;
  layout: (row: any) => any
}

interface IRow {
  id: string;
  isSelected?: boolean;
}
interface IMcTableProps {
  rows: IRow[];
  columns: IColumn[];
  disableCheckbox?: boolean;
  isSelectable?: boolean;
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
  rowsPerPage,
}: IPagination) => {
  return (
    <Pagination
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onChange={handleChange}
      shape="rounded"
      renderItem={(item) => <PaginationItem {...item} />}
    />
  );
};

const generateValue = (value: string | any, col: IColumn) => {
  if (col.format && col.format === EGridColumnFormat.date && value) {
    return moment(value).format("L"); // todo create helper function date formater
  }
  return value;
};

const McTable = ({
  rows,
  columns,
  pageChangeCallback,
  paginationDetails,
}: IMcTableProps) => {
  console.log(paginationDetails, "paginationDetails");

  const handleChangePage = async (_: unknown, pageNumber: number) => {
    pageChangeCallback(pageNumber);
  };

  const generateSingleRow = useCallback(
    (row) =>
      columns?.map((col: IColumn) => {
        const value = col.layout ? col.layout(row) : row[col.field];
        return (
          <TableCell key={col.field} align="left">
            {generateValue(value, col)}
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
          {paginationDetails !== null && paginationDetails?.total > 8 && (
            <TablePagination
              count={paginationDetails?.total_pages}
              page={paginationDetails.page}
              handleChange={handleChangePage}
              rowsPerPage={paginationDetails.per_page}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default McTable;
