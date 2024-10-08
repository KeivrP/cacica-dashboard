import { useState, useCallback } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import { menuItemClasses } from "@mui/material/MenuItem";
import { Goals } from "../goals-types";


// ----------------------------------------------------------------------

type GoalsTableProps = {
  row: Goals;
  selected: boolean;
  onSelectRow: () => void;
};

export function GoalsTableRow({ row, selected }: GoalsTableProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );


  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);



  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{row.target?.name ?? 'N/A'}</TableCell>
        <TableCell>{row.project?.name ?? 'N/A'}</TableCell>
        <TableCell>{row.general_target}</TableCell>

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
