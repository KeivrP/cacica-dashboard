import { Grid, Typography, List, Box, Button } from "@mui/material";
import NavbarSettings from "../components/nav-bar";
import { useBranch, useRoles } from "../../user/hook/useUser";
import ProjectTable from "../components/project-table";
import { Iconify } from "../../../components/iconify";
import { DashboardContent } from "../../../layouts/dashboard";
import { useState } from "react";
import { NewProjects } from "./settings-new";
import { useGetProjects } from "../hook/useSettings";
import CardSettings from "../../../components/card/CardSettings";
import NewBranch from "./branch-new";
import NewRol from "./rol-new";

export default function SettingsView() {
  const { data: roles } = useRoles();
  const { data: branch } = useBranch();
  const { data: projects } = useGetProjects();

  const [open, setOpen] = useState(false);
  const [openBranch, setOpenBranch] = useState(false);
  const [openRoles, setOpenRoles] = useState(false);


  return (
    <>
      <NavbarSettings />
      <DashboardContent>
        <Box display="flex" alignItems="center" mb={2} padding={2}>
          <Typography variant="h4" flexGrow={1}>
            Configuracion
          </Typography>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Nuevo Proyecto
          </Button>
        </Box>

        <Grid container spacing={2} paddingX={4}>
          <Grid item xs={12} sm={12} md={12} alignItems="flex-end">
            <Typography variant="h6">Proyecto en Curso</Typography>
            <ProjectTable data={projects!} isLoading={false} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} alignItems="flex-end">
            <List>
              <CardSettings addData={() => setOpenRoles(true)} title="Roles" data={roles!} />
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={6} alignItems="flex-end">
            <CardSettings addData={() => setOpenBranch(true)} title="Sucursales" data={branch!} />
          </Grid>
        </Grid>
      </DashboardContent>
      <NewProjects
        roles={roles!}
        branch={branch!}
        openF={open}
        handleCloseF={() => setOpen(false)}
      />
      <NewBranch  openF={openBranch} handleCloseF={() => setOpenBranch(false)} />
      <NewRol openF={openRoles} handleCloseF={() => setOpenRoles(false)} />


    </>
  );
}
