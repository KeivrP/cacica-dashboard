import React from 'react';
import { Card, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import { Scrollbar } from '../../../components/scrollbar';
import { emptyRows } from '../../targets/utils';
import { TableHeadComponets } from '../../../components/table/table-head';
import { TableEmptyRows } from '../../../components/table/table-empty-rows';
import { TableNoData } from '../../../components/table/table-no-data';
import { useTable } from '../../../components/table/table-componets';
import { Projects } from '../proyect-types';
import { ProjectTableRow } from './projects-table-row';

interface ProjectTableProps {
    isLoading: boolean;
    data: Projects[];
   
}

const ProjectTable: React.FC<ProjectTableProps> = ({
    isLoading,
    data,
}) => {
    const table = useTable();

    const dataFiltered = data ?? []; 

    const renderFallback = <div>Loading...</div>;

    const notFound = !dataFiltered.length;


    return (
        <Card>
            

            <Scrollbar>
                {isLoading ? renderFallback : (
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHeadComponets
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={dataFiltered.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                headLabel={[
                                    { id: 'name', label: 'Proyecto' },
                                    { id: 'fecini', label: 'Fecha Inicio' },
                                    { id: 'fecfin', label: 'Fecha Fin' },
                                    { id: 'status', label: 'Sucursal' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(
                                        table.page * table.rowsPerPage,
                                        table.page * table.rowsPerPage + table.rowsPerPage,
                                    )
                                    .map((row) => (
                                        <ProjectTableRow
                                            key={row.id}
                                            row={row}
                                            selected={table.selected.includes(row.id.toString())}
                                            onSelectRow={() => table.onSelectRow(row.id.toString())}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={68}
                                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                                />

                                {notFound && <TableNoData searchQuery={'Proyectos'} />}
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
    );
};

export default ProjectTable;