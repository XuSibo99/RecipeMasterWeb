import { RecipeFull } from "../../services/aisuggestion/AiSuggestionService";
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
  Skeleton,
} from "@mui/material";

export interface RecipeDetailDialogProps {
  open: boolean;
  loading: boolean;
  recipe?: RecipeFull;
  error?: string;
  onClose: () => void;
}

export function RecipeDetailDialog(prop: RecipeDetailDialogProps) {
  const { open, loading, recipe, error, onClose } = prop;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Recipe Details</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton width="80%" sx={{ mt: 2 }} />
            <Skeleton width="60%" />
          </>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : recipe ? (
          <>
            {recipe.summary && (
              <Typography
                component="div"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
                sx={{ mb: 2 }}
              />
            )}

            <Typography variant="subtitle1">Ingredients:</Typography>
            <List dense>
              {recipe.extendedIngredients.map((ing, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={ing} />
                </ListItem>
              ))}
            </List>

            {/* 如果后端返回了 nutrition 字段，可以类似渲染：
          recipe.nutrition?.nutrients.map(...) */}
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
