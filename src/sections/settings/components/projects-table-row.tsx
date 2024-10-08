import { useState, useCallback } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import { menuItemClasses } from "@mui/material/MenuItem";
import { Projects } from "../proyect-types";


// ----------------------------------------------------------------------

type ProjectTableProps = {
  row: Projects;
  selected: boolean;
  onSelectRow: () => void;
};

export function ProjectTableRow({ row, selected }: ProjectTableProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );


  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);



  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{row.name}</TableCell>

        <TableCell>{new Date(row.start_date).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</TableCell>
        <TableCell>{new Date(row.end_date).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</TableCell>
        <TableCell>{row.branch_id}</TableCell>
        <TableCell>{row.is_active }</TableCell>

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



        </MenuList>
      </Popover>

    </>
  );
}
