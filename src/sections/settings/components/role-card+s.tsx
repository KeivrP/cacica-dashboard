import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { Iconify } from "../../../components/iconify";
import { Role } from "../../user/user-types";

interface CardProps {
  data: Role[] | undefined;
}


const RolesCard = ({ data }: CardProps) => {

  const cardDara = data || []

  return (
    <Container>
      <Grid container spacing={3}>
        {cardDara.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
              <Iconify width={22} icon="solar:document-bold-duotone" />
                <Typography variant="h6">{card.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RolesCard;
