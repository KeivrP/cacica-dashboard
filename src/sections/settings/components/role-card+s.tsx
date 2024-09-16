import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { Iconify } from '../../../components/iconify';


const cards = [
    { icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />, label: 'Home' },
    { icon: <Iconify width={22} icon="solar:lock-bold-duotone" />, label: 'Login' },
    { icon: <Iconify width={22} icon="solar:document-bold-duotone" />, label: 'Documentos' },
    { icon: <Iconify width={22} icon="solar:document-bold-duotone" />, label: 'Documentos' },
    { icon: <Iconify width={22} icon="solar:document-bold-duotone" />, label: 'Documentos' },
  // Añade más tarjetas según sea necesario
];

const RolesCard = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent style={{ textAlign: 'center' }}>
                {card.icon}
                <Typography variant="h6">{card.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RolesCard;
