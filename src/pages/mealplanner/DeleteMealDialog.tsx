// src/components/shared/DeleteConfirmationDialog.tsx

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { UseDeleteMealEvent } from "../../services/mealevent/UseDeleteMealEvent";

interface DeleteMealDialogProps {
  open: boolean;
  onClose: () => void;
  // onConfirm: () => void;
  id: string;
  itemName?: string;
}

const DeleteMealDialog = ({
  open,
  onClose,
  id,
  itemName = "this meal",
}: DeleteMealDialogProps) => {
  const { deleteMeal } = UseDeleteMealEvent();
  const handleDelete = () => {
    deleteMeal(id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{itemName}</strong>? This
          action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMealDialog;
