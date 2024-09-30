import { Container, Grid, Chip, Button, Box } from "@mui/material";
import { Iconify } from "../../../components/iconify";
import { Role } from "../../user/user-types";

interface CardProps {
  data: Role[] | undefined;
}

const RolesCard = ({ data }: CardProps) => {
  const cardData = data || [];

  const handleAddRole = () => {
    // Lógica para agregar un nuevo rol
    console.log("Agregar nuevo rol");
  };

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleAddRole}>
          Agregar nuevo rol
        </Button>
      </Box>
      <Grid container spacing={2} direction="column">
        {cardData.map((card, index) => (
          <Grid item key={index}>
            <Chip
              icon={<Iconify width={22} icon="solar:document-bold-duotone" />}
              label={card.name}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RolesCard;
