import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Divider,
  Skeleton,
} from "@mui/material";
import { RecipeFull } from "../../services/aisuggestion/AiSuggestionService";

export interface RecipeDetailDialogProps {
  open: boolean;
  loading: boolean;
  recipe?: RecipeFull;
  error?: string;
  onClose: () => void;
}

export function RecipeDetailDialog({
  open,
  loading,
  recipe,
  error,
  onClose,
}: RecipeDetailDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Recipe Details</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton width="40%" sx={{ mt: 2 }} />
            <Skeleton width="30%" />
            <Skeleton width="80%" sx={{ mt: 1 }} />
            <Skeleton width="60%" />
          </>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : recipe ? (
          <>
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
            />

            <Typography variant="h5" gutterBottom>
              {recipe.title}
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" mb={2}>
              <Chip label={`Health Score: ${recipe.healthScore ?? "N/A"}`} />
              <Chip
                label={`Calories: ${
                  recipe.calories != null ? recipe.calories.toFixed(0) : "N/A"
                } kcal`}
              />
              <Chip label={`Ready in: ${recipe.readyInMinutes ?? "?"} min`} />
              <Chip label={`Serves: ${recipe.servings ?? "?"}`} />
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
              {recipe.dishTypes?.map((d) => (
                <Chip key={d} label={d} variant="outlined" size="small" />
              ))}
              {recipe.cuisines?.map((c) => (
                <Chip key={c} label={c} color="secondary" size="small" />
              ))}
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
              {recipe.vegetarian && <Chip label="Vegetarian" />}
              {recipe.vegan && <Chip label="Vegan" />}
              {recipe.glutenFree && <Chip label="Gluten-Free" />}
              {recipe.dairyFree && <Chip label="Dairy-Free" />}
            </Stack>

            <Divider sx={{ my: 2 }} />

            {recipe.summary && (
              <Typography
                component="div"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
                sx={{ mb: 2 }}
              />
            )}

            {recipe.instructions && (
              <>
                <Typography variant="subtitle1">Instructions</Typography>
                <Typography paragraph>{recipe.instructions}</Typography>
              </>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
              Steps
            </Typography>
            <List dense>
              {recipe.analyzedInstructions?.map((step, i) => (
                <ListItem key={i} alignItems="flex-start">
                  <ListItemText
                    primary={`Step ${i + 1}: ${step.step}`}
                    secondary={
                      <>
                        {step.ingredients.length > 0 && (
                          <Typography variant="body2">
                            Ingredients:{" "}
                            {step.ingredients.map((ing) => ing.name).join(", ")}
                          </Typography>
                        )}
                        {step.equipment.length > 0 && (
                          <Typography variant="body2">
                            Equipment:{" "}
                            {step.equipment.map((eq) => eq.name).join(", ")}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Divider sx={{ my: 2 }} />

            {recipe.nutrition && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Nutrition
                </Typography>
                <List dense>
                  {recipe.nutrition.nutrients.map((n) => (
                    <ListItem key={n.name}>
                      <ListItemText
                        primary={`${n.name}: ${n.amount} ${n.unit}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </>
        ) : (
          <Typography>No details available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
