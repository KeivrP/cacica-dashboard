import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { Branch, Role } from "../../sections/user/user-types";
import { Iconify } from "../iconify";
interface CardSettingsProps {
  data: Role[] | Branch[];
  addData: () => void;
  title: string;
}

const CardSettings = ({ data, title, addData }: CardSettingsProps) => {

  const dataFiltered = data ?? []

  const StyledListItem = styled(ListItem)(({ theme }) => ({
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  return (
    <Box
      sx={{
        margin: "auto",
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box sx={{ display: "flex", marginBottom: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          onClick={addData}
          sx={{ marginLeft: 1 }}
          startIcon={<Iconify icon="mingcute:add-line" />}

        >
          Añadir
        </Button>
      </Box>

      <List sx={{ maxHeight: 160, minHeight:160, overflow: 'auto' }}>
        {dataFiltered.map((item) => (
          <StyledListItem
        key={item.id}
        secondaryAction={
          <Box>
            <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => console.log(item)}
            >
          <Iconify icon={""} />
            </IconButton>
            <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => console.log(item.id)}
            >
          <Iconify icon={""} />
            </IconButton>
          </Box>
        }
          >
        <ListItemText primary={item.name} />
          </StyledListItem>
        ))}
      </List>

    </Box>
  );
};

export default CardSettings;
