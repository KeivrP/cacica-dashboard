import { useState, useCallback } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import { Projects } from "../proyect-types";
import { Iconify } from "../../../components/iconify";


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
        <TableCell>{row.name}</TableCell>

        <TableCell>{row.start_date.toString()}</TableCell>
        <TableCell>{row.end_date.toString()}</TableCell>
        <TableCell>{row.branch_id}</TableCell>
{/* 
        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
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
