import { useEffect, useMemo, useState } from "react";

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
import { useBranch } from "../../user/hook/useUser";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useGetMonthlyTargets } from "../../goals/hook/useGoals";
import { applyFilter, emptyRows, getComparator } from "../utils";
import { MonthyTargetsTableRow } from "../components/mt-table-row";

// ----------------------------------------------------------------------

export function MonthlyTargetView() {

    const { data, isLoading, error, refetch } = useGetMonthlyTargets();
    const { data: branches, isLoading: isLoadingBranches } = useBranch();

    const [selectedBranch, setSelectedBranch] = useState(branches?.[0]?.id);

    const filteredDataActive = useMemo(() => data?.filter(item => item.project.is_active), [data]);

    const filteredData = useMemo(() => {
        if (!selectedBranch) return filteredDataActive;
        return filteredDataActive?.filter((item) => item.project.branch_id === selectedBranch);
    }, [filteredDataActive, selectedBranch]);


    const months = useMemo(() => {
        const uniqueMonths = new Set(filteredData?.map(item => item.month));
        return Array.from(uniqueMonths).map(month => ({
            value: month,
            label: month
        }));
    }, [data, filteredData]);

    const [selectedMonth, setSelectedMonth] = useState(months?.[0]?.value);


    useEffect(() => {
        if (branches) {
            setSelectedBranch(branches[0]?.id);
        }

    }, [branches]);




    const filteredDataByMonth = useMemo(() => {
        if (!selectedMonth) return filteredData;
        return filteredData?.filter((item) => item.month === selectedMonth);
    }, [filteredData, selectedMonth]);


    const table = useTable();

    const [filterName, setFilterName] = useState("");

    const dataFiltered = applyFilter({
        inputData: filteredDataByMonth || [],
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });

    const GoalsTargetData = useMemo(() => dataFiltered, [dataFiltered]);
    const notFound = !dataFiltered.length && !!filterName;

    const SelectMonthlyTargets = () => {
        return (
            <Box display="flex" gap={2}>
                <Select
                    value={selectedBranch}
                    onChange={(event) => {
                        setSelectedBranch(event.target.value);
                        table.onResetPage();
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Sucursal' }}
                >
                    {branches?.map((branch) => (
                        <MenuItem key={branch.id} value={branch.id}>
                            {branch.name}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    value={selectedMonth}
                    onChange={(event) => {
                        setSelectedMonth(event.target.value);
                        table.onResetPage();
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Mes' }}
                >
                    {months.map((month) => (
                        <MenuItem key={month.value} value={month.value}>
                            {month.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        );
    }


    return (
        <DashboardContent>
            <Box display="flex" alignItems="center" mb={5}>
                <Typography variant="h4" flexGrow={1}>
                    Metas Mensuales
                </Typography>
            </Box>

            <Card>
                <TableToolbar
                    plaholder="Buscar Persona..."
                    filterName={filterName}
                    onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterName(event.target.value);
                        table.onResetPage();
                    }}

                    children={SelectMonthlyTargets()}

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
                                        { id: "name", label: "Usuario" },
                                        { id: "email", label: "Objetivo" },
                                        { id: "role", label: "Meses" },
                                        { id: "role", label: "Meta Planificada", align: 'center' },
                                        { id: "role", label: "Meta Reportada", align: "center" },
                                        { id: "", label: "" },

                                    ]}
                                />
                                <TableBody>
                                    {dataFiltered
                                        .slice(
                                            table.page * table.rowsPerPage,
                                            table.page * table.rowsPerPage + table.rowsPerPage
                                        )
                                        .map((row) => (
                                            <MonthyTargetsTableRow
                                                key={row.project_id}
                                                row={row}
                                                selected={table.selected.includes(row.project_id.toString())}
                                                onSelectRow={() => table.onSelectRow(row.project_id.toString())}
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
