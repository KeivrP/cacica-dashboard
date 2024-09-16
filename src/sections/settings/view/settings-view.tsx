import { Grid, Typography, List, ListItem, ListItemText, Container } from '@mui/material'
import NavbarSettings from '../components/nav-bar'
import { useRoles } from '../../user/hook/useUser'
import RolesCard from '../components/role-card+s'
import BranchCard from '../components/branch-card'

export default function SettingsView() {
    const proyecto = {
        nombre: 'Proyecto 1',
        periodo: '2021-2022'
    }
    const { data: roles } = useRoles()

    return (
        <Container>
            <NavbarSettings />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6">Proyecto en Curso</Typography>
                    <Typography>{proyecto.nombre} - {proyecto.periodo}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">Roles</Typography>
                    <List>
                        {/* Renderizar los roles con ListItem y ListItemText */}
                       <RolesCard />
                        {/* Botón para agregar un nuevo rol */}
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">Sucursales</Typography>
                    <BranchCard />
                    {/* Estructura similar a la lista de roles */}
                </Grid>
            </Grid>
        </Container>
    )
}
