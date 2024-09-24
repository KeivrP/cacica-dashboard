import {
  Grid,
  Typography,
  List,
  Container,
} from "@mui/material";
import NavbarSettings from "../components/nav-bar";
import { useBranch, useRoles } from "../../user/hook/useUser";
import RolesCard from "../components/role-card+s";
import BranchCard from "../components/branch-card";

export default function SettingsView() {
  const proyecto = {
    nombre: "Proyecto 1",
    periodo: "2021-2022",
  };
  const { data: roles } = useRoles();
  const { data: branch } = useBranch();

  return (
    <Container>
      <NavbarSettings />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Proyecto en Curso</Typography>
          <Typography>
            {proyecto.nombre} - {proyecto.periodo}
          </Typography>
        </Grid>
        <Grid item xs={6} alignItems="flex-start">
          <Typography variant="h6">Roles</Typography>
          <List>
            <RolesCard data={roles} />
          </List>
        </Grid>
        <Grid item xs={6} alignItems="flex-end">
          <Typography variant="h6">Sucursales</Typography>
          <BranchCard data={branch} />
        </Grid>
      </Grid>
    </Container>
  );
}
