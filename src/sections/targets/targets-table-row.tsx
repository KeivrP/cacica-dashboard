import { useState, useCallback } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";

import { Iconify } from "../../components/iconify";
import { Targets } from "./targets-types";
import { NewTargets } from "./view/targets-new";

// ----------------------------------------------------------------------

type TargetTableRowProps = {
  row: Targets;
  selected: boolean;
  onSelectRow: () => void;
};

export function TargetTableRow({ row, selected }: TargetTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [TargetData, setTargetData] = useState<Targets>();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handeSelectRow = useCallback(() => {
    setOpenPopover(null);
    setTargetData({
      id: row.id,
      nomenclature: row.nomenclature,
      name: row.name,
    });
    setOpen(true);
  }, []);

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
        <TableCell>{row.nomenclature}</TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
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
          <MenuItem onClick={handeSelectRow}>
            <Iconify icon="solar:pen-bold" />
            Editar
          </MenuItem>

          
        </MenuList>
      </Popover>
      <NewTargets targetData={TargetData} openF={open} handleCloseF={() => handleClose()} />

    </>
  );
}
