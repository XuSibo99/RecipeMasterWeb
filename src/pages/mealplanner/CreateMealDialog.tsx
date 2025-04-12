import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface CreateMealDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: MealEventFormData) => void;
  defaultDate: string;
}

export interface MealEventFormData {
  title: string;
  name: string;
  start: string;
  userId: string;
}

function CreatMealDialog({
  open,
  onClose,
  onSubmit,
  defaultDate,
}: CreateMealDialogProps) {
  const { control, handleSubmit, reset, getValues } =
    useForm<MealEventFormData>({
      defaultValues: {
        title: "",
        name: "",
        start: defaultDate,
        userId: "",
      },
    });

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    reset({
      ...getValues(),
      start: defaultDate,
    });
  }, [defaultDate, getValues, reset]);

  const handleFormSubmit = (data: MealEventFormData) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Meal</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Meal title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Meal Title (e.g. Lunch)"
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
                label="Meal Name (e.g. Salmon & Rice)"
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
              <TextField {...field} label="User ID" fullWidth margin="dense" />
            )}
          />

          <Controller
            name="start"
            control={control}
            defaultValue={defaultDate}
            render={({ field }) => <input type="hidden" {...field} />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreatMealDialog;
