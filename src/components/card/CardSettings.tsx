import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { Branch, Role } from "../../sections/user/user-types";
import { Iconify } from "../iconify";
interface CardSettingsProps {
    data: Role[] | Branch[];
    addData?: (item: Role | Branch) => void;
    updateData?: (item: Role | Branch) => void;
    deleteData?: (id: number) => void;
}

const CardSettings = ({ data, addData, updateData, deleteData }: CardSettingsProps) => {
    const [newItem, setNewItem] = useState("");
    const [editingItem, setEditingItem] = useState<Role | Branch | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState("");

    const dataFiltered = data ?? []

    const handleEditItem = (item: Role | Branch) => {
        setEditingItem(item);
        setOpenDialog(true);
    };

    const handleDeleteItem = (id: number) => {
    };

    const StyledListItem = styled(ListItem)(({ theme }) => ({
        transition: "background-color 0.3s",
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    }));

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>
      <Box sx={{ display: "flex", marginBottom: 2 }}>

        <Button
          variant="contained"
          color="primary"
          onClick={()=> console.log("Add new role")}
          sx={{ marginLeft: 1 }}
          aria-label="Add new role"
        >
          Add
        </Button>
      </Box>
      <List>
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
                  <Iconify icon={""}  />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => console.log(item.id)}
                >
                  <Iconify icon={""}  />
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
