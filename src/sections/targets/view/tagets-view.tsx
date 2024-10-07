import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { DashboardContent } from "../../../layouts/dashboard";

import { Iconify } from "../../../components/iconify";
import { Scrollbar } from "../../../components/scrollbar";

import { TargetTableRow } from "../targets-table-row";
import { emptyRows, applyFilter, getComparator } from "../utils";

import { renderFallback } from "../../../routes/sections";
import {
  TableToolbar,
} from "../../../components/table/table-toolbar";
import { useGetTargets } from "../hook/useTargets";
import { Targets } from "../targets-types";
import { NewTargets } from "./targets-new";
import { TableHeadComponets } from "../../../components/table/table-head";
import { TableEmptyRows } from "../../../components/table/table-empty-rows";
import { TableNoData } from "../../../components/table/table-no-data";
import { useTable } from "../../../components/table/table-componets";


// ----------------------------------------------------------------------

export function TargetsView() {
  const { data, isLoading } = useGetTargets();
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  const TargetData: Targets[] = useMemo(() => data ?? [], [data, isLoading]);

  const table = useTable();

  const [filterName, setFilterName] = useState("");

  const dataFiltered: Targets[] = applyFilter({
    inputData: TargetData || [],
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Objetivos
        </Typography>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Nuevo Objetivo
        </Button>
      </Box>

      <Card>
        <TableToolbar
          plaholder="Buscar Obejtivos..."
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          {isLoading ? (
            renderFallback
          ) : (
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <TableHeadComponets
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={TargetData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  headLabel={[
                    { id: "nomeclature", label: "ID" },
                    { id: "name", label: "Nombre" },
                    { id: "" },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <TargetTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      TargetData.length
                    )}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      <NewTargets openF={open} handleCloseF={() => handleClose()} />
    </DashboardContent>
  );
}

