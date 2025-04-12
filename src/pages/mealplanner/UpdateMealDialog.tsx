import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { MealEventFormData } from "../../services/mealevent/MealEventService";
import DeleteMealDialog from "./DeleteMealDialog";

interface UpdateMealDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: MealEventFormData) => void;
  defaultValues: (MealEventFormData & { id: string }) | null;
}

const UpdateMealDialog = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: UpdateMealDialogProps) => {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm<MealEventFormData>({
    defaultValues: {
      title: "",
      name: "",
      start: "",
      userId: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data: MealEventFormData) => {
    if (defaultValues) {
      onSubmit(defaultValues.id, data);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Meal</DialogTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogContent>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Meal Title"
                  fullWidth
                  margin="dense"
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              rules={{ required: "Meal name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Meal Name"
                  fullWidth
                  margin="dense"
                />
              )}
            />
            <Controller
              name="start"
              control={control}
              rules={{ required: "Start time is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Start Date"
                  fullWidth
                  margin="dense"
                />
              )}
            />
            <Controller
              name="userId"
              control={control}
              rules={{ required: "User ID is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="User ID"
                  fullWidth
                  margin="dense"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Update
            </Button>
            <Button
              onClick={() => setConfirmDeleteOpen(true)}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {confirmDeleteOpen && (
        <DeleteMealDialog
          open={confirmDeleteOpen}
          onClose={() => setConfirmDeleteOpen(false)}
          id={defaultValues?.id ?? ""}
          itemName={defaultValues?.title}
        />
      )}
    </>
  );
};

export default UpdateMealDialog;
