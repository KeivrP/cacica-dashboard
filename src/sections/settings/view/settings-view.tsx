import { Grid, Typography, List, Box, Button } from "@mui/material";
import NavbarSettings from "../components/nav-bar";
import { useBranch, useRoles } from "../../user/hook/useUser";
import RolesCard from "../components/role-card+s";
import BranchCard from "../components/branch-card";
import ProjectTable from "../components/project-table";
import { Iconify } from "../../../components/iconify";
import { DashboardContent } from "../../../layouts/dashboard";
import { useState } from "react";
import { NewProjects } from "./settings-new";
import { useGetProjects } from "../hook/useSettings";
import { Container } from "@mui/material";
import CardSettings from "../../../components/card/CardSettings";

export default function SettingsView() {
  const { data: roles } = useRoles();
  const { data: branch } = useBranch();
  const { data: projects } = useGetProjects();

  const [open, setOpen] = useState(false);

  return (
    <>
      <NavbarSettings />
      <DashboardContent>
          <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
              Configuracion
            </Typography>
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Nuevo Pryecto
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} alignItems="flex-end">
              <Typography variant="h6">Proyecto en Curso</Typography>
              <ProjectTable data={projects!} isLoading={false} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} alignItems="flex-end">
              <Typography variant="h6">Roles</Typography>
              <List>
                <CardSettings data={roles!}  />
              </List>
            </Grid>
            <Grid item xs={12} sm={6} md={6} alignItems="flex-end">
              <Typography variant="h6">Sucursales</Typography>
              <CardSettings data={branch!} />
            </Grid>
          </Grid>
      </DashboardContent>
      <NewProjects
        roles={roles!}
        branch={branch!}
        openF={open}
        handleCloseF={() => setOpen(false)}
      />
    </>
  );
}
