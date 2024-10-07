import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { DashboardContent } from "../../../layouts/dashboard";

import { Scrollbar } from "../../..//components/scrollbar";


import { renderFallback } from "../../../routes/sections";
import { TableHeadComponets } from "../../../components/table/table-head";
import { TableToolbar } from "../../../components/table/table-toolbar";
import { TableEmptyRows } from "../../../components/table/table-empty-rows";
import { TableNoData } from "../../../components/table/table-no-data";
import { useTable } from "../../../components/table/table-componets";
import { GoalsTableRow } from "../components/goals-table-row";
import { applyFilter, emptyRows, getComparator } from "../utils";
import { useGetTargetsObjetives } from "../hook/useGoals";

// ----------------------------------------------------------------------

export function GoalsView() {

  const { data, isLoading, error, refetch } = useGetTargetsObjetives();


  const table = useTable();

  const [filterName, setFilterName] = useState("");

  const dataFiltered = applyFilter({
    inputData: data || [],
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const GoalsTargetData = useMemo(() => dataFiltered, [dataFiltered]);
  const notFound = !dataFiltered.length && !!filterName;




  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Metas
        </Typography>
      </Box>

      <Card>
        <TableToolbar
          plaholder="Buscar Meta..."
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
                  rowCount={GoalsTargetData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  headLabel={[
                    { id: "name", label: "Objetivo" },
                    { id: "email", label: "Proyecto" },
                    { id: "role", label: "Meta" },

                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <GoalsTableRow
                        key={row.project_id}
                        row={row}
                        selected={table.selected.includes(row.general_target)}
                        onSelectRow={() => table.onSelectRow(row.general_target)}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      GoalsTargetData.length
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

    </DashboardContent>
  );
}

