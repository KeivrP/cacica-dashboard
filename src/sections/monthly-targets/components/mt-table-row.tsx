import { useState, useCallback } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import { MonthyTargets } from "../../goals/goals-types";
import { IconButton } from "@mui/material";
import { Iconify } from "../../../components/iconify";
import AddTarget from "../view/mt-Add";
import { convertMonthAndYearToSpanish } from "../utils";


// ----------------------------------------------------------------------

type MonthyTargetsTableProps = {
  row: MonthyTargets;
  selected: boolean;
  onSelectRow: () => void;
};

export function MonthyTargetsTableRow({ row, selected }: MonthyTargetsTableProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);



  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{row.users.name}</TableCell>
        <TableCell width={400}>{row.objective.name}</TableCell>
        <TableCell>{convertMonthAndYearToSpanish(row.month)}</TableCell>

        <TableCell align="center">{row.target_planificado}</TableCell>
        <TableCell align="center">{row.target_reportado}</TableCell>
        {row.is_closed || Number(row.target_planificado) === 0 ? null : <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>}


      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: "action.selected" },
            },
          }}
        >
          <MenuItem onClick={() => { setOpen(true); handleClosePopover(); }}>
            <Iconify icon="solar:pen-bold" />
            Registrar
          </MenuItem>
        </MenuList>
      </Popover>
      <AddTarget openF={open} handleCloseF={() => setOpen(false)} id={row.id} />
    </>
  );
}
