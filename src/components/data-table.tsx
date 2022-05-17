import React, { useState, MouseEvent, ChangeEvent } from "react";


import { ActionData, Loader } from "./../components";
import {  DataTableSchema, DevicesSchema, tableContainer, tableRoot } from "../utils";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useGetDeviceListByTypeQuery } from "../service";


export function DataTable({ type }: DataTableSchema) {
//   const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, isLoading, isError } = useGetDeviceListByTypeQuery(type);
  const results = data?.results || data?.locks;
  const rows =
    results?.length > 0 &&
    results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const isLockList = type === "lock_list" ? true : false;

  
  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  
  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (isLoading) return <Loader color="primary" />;
  if (isError)
    return (
      <Typography
        variant="subtitle1"
        align="center"
        gutterBottom
        component="div"
      >
        Sorry for your inconvenience, we are working on it.
      </Typography>
    );

  
  return (
    <Paper style={tableRoot}>
      <TableContainer style={tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {isLockList && <TableCell>State</TableCell>}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length > 0 ? (
              rows.map((row: DevicesSchema) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {isLockList && (
                    <TableCell component="th" scope="row">
                      {row.status ? row.status : "-"}
                    </TableCell>
                  )}
                  <TableCell component="th" scope="row">
                    <ActionData data={row} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="no-device-list">
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  colSpan={isLockList ? 3 : 2}
                >
                  Sorry!, No device list founds or Something went's.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 25]}
        component="div"
        count={results.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
