import { Box, Button, Container, Grid } from "@mui/material";
import { Iconify } from "../../../components/iconify";
import { Branch } from "../../user/user-types";
import { Chip } from "@mui/material";

interface CardProps {
  data: Branch[] | undefined;
}

const BranchCard = ({ data }: CardProps) => {
  const cardData = data || [];

  const handleAddRole = () => {
    // Lógica para agregar un nuevo rol
    console.log("Agregar nuevo rol");
  };

  return (
    <Container>
        <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleAddRole}>
          Agregar Sucursal
        </Button>
      </Box>
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} key={index}>
             <Chip  
              icon={<Iconify width={22} icon="solar:document-bold-duotone" />}
              label={`${card.name}, ${card.location}`}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BranchCard;
