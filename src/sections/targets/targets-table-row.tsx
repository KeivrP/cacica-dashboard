import { useState, useCallback, useEffect } from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";

import { Iconify } from "../../components/iconify";

import { CreateUsers, type Users } from "./targets-types";
import { NewUsuarios } from "./view/user-new";
import { Label } from "../../components/label";
import { useChangeStatusUser } from "./hook/useTargets";
import { useBackdrop } from "../../components/ui/backdrop";

// ----------------------------------------------------------------------

type TargetTableRowProps = {
  row: Users;
  selected: boolean;
  onSelectRow: () => void;
};

export function TargetTableRow({ row, selected }: TargetTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<CreateUsers>();
  const { mutate, isPending, isSuccess }  = useChangeStatusUser();
  const { showLoading, hideLoading } = useBackdrop();

  useEffect(() => {
    if (isPending) {
      showLoading('');
    } else {
      hideLoading();
    }
  }, [isPending, isSuccess]);


  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handeSelectRow = useCallback(() => {
    setOpenPopover(null);
    setUserData({
      id: row.id,
      name: row.name,
      email: row.email,
      roleId: row.role.id,
      branchId: row.branch.id,
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
  
  const handleStatusUser = useCallback(() => {
    setOpenPopover(null);
    mutate(row.id);
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.avatar_url} />
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.email}</TableCell>

        <TableCell>{row.role?.name}</TableCell>

        <TableCell>{row.branch?.name}</TableCell>

        <TableCell>
          <Label color={row.is_active ? "success" : "error"}>
            {row.is_active ? "Activo" : "Inactivo"}
          </Label>
        </TableCell>

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

          {!row.is_active ? (
            <MenuItem onClick={handleStatusUser} sx={{ color: "success.main" }}>
              <Iconify icon="solar:shield-check-bold" />
              Activar
            </MenuItem>
          ) : (
            <MenuItem onClick={handleStatusUser} sx={{ color: "error.main" }}>
              <Iconify icon="solar:shield-cross-bold" />
              Desactivar
            </MenuItem>
          )}
        </MenuList>
      </Popover>
      <NewUsuarios
        userData={userData}
        openF={open}
        handleCloseF={() => handleClose()}
      />
    </>
  );
}
