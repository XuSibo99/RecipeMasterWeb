import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Grid2 as Grid,
  Skeleton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StarIcon from "@mui/icons-material/Star";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { DietaryRestriction } from "../../services/aisuggestion/AiSuggestionService";
import { useAiRecipes } from "../../components/hooks/useAiRecipes";
import { useRecipeDetails } from "../../components/hooks/useRecipeDetails";
import { RecipeDetailDialog } from "./RecipeDetailDialog";

type Prefs = Record<DietaryRestriction, boolean>;
const prefsToRestrictions = (p: Prefs) =>
  (Object.keys(p) as DietaryRestriction[]).filter((k) => p[k]);

export default function AiSuggestionPage() {
  const FAVORITES_KEY = "aiFavorites";

  const DEFAULTPREFS: Prefs = {
    [DietaryRestriction.VEGETARIAN]: false,
    [DietaryRestriction.GLUTEN_FREE]: false,
    [DietaryRestriction.NUT_ALLERGY]: false,
  };

  const [prefs, setPrefs] = useState<Prefs>(() => {
    try {
      return {
        ...DEFAULTPREFS,
        ...JSON.parse(localStorage.getItem("dietPrefs") || "{}"),
      };
    } catch {
      return DEFAULTPREFS;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("dietPrefs", JSON.stringify(prefs));
  }, [prefs]);

  const toggleFavorite = (title: string) => {
    setFavorites((favs) => {
      const next = favs.includes(title)
        ? favs.filter((r) => r !== title)
        : [...favs, title];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  };

  const [prompt, setPrompt] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const {
    recipes,
    loadingAI,
    loadingRecipes,
    aiError,
    fetchError,
    search,
    setRecipes,
  } = useAiRecipes();

  const {
    openId,
    recipe,
    loadingRecipeDetail,
    recipeDetailError,
    open,
    close,
  } = useRecipeDetails();

  const handleSubmit = async () => {
    setHasSearched(true);
    search(prompt, prefsToRestrictions(prefs));
  };

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI-Powered Recipe Suggestions
      </Typography>

      <Typography variant="subtitle1">Your dietary preferences:</Typography>
      <FormGroup row>
        {Object.values(DietaryRestriction).map((key) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={prefs[key]}
                onChange={(e) =>
                  setPrefs((c) => ({ ...c, [key]: e.target.checked }))
                }
              />
            }
            label={
              {
                [DietaryRestriction.VEGETARIAN]: "Vegetarian",
                [DietaryRestriction.GLUTEN_FREE]: "Gluten-Free",
                [DietaryRestriction.NUT_ALLERGY]: "Nut Allergy",
              }[key]
            }
          />
        ))}
      </FormGroup>

      <TextField
        label="What do you feel like eating?"
        fullWidth
        multiline
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loadingAI || !prompt.trim()}
        startIcon={loadingAI ? <RefreshIcon /> : undefined}
      >
        {loadingAI ? "Generating..." : "Suggest Recipes"}
      </Button>

      {aiError && (
        <Box sx={{ mt: 2 }}>
          <Typography color="error">{aiError}</Typography>
          <Button onClick={handleSubmit}>Regenerate recipes</Button>
        </Box>
      )}

      {!aiError && fetchError && (
        <Box sx={{ mt: 2 }}>
          <Typography color="error">{fetchError}</Typography>
          <Button onClick={handleSubmit}>Regenerate recipes</Button>
        </Box>
      )}

      <Box mt={4} ref={resultsRef}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h6">Results</Typography>
          <IconButton
            onClick={handleSubmit}
            disabled={loadingAI || loadingRecipes}
          >
            <RefreshIcon />
          </IconButton>
        </Stack>

        {loadingRecipes ? (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <Card>
                  <Skeleton variant="rectangular" height={140} />
                  <CardContent>
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                    <Skeleton width="30%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : !hasSearched ? (
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", py: 4 }}
          >
            Enter a prompt above and click “Suggest Recipes” to begin.
          </Typography>
        ) : recipes.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              color: "text.secondary",
            }}
          >
            <RestaurantMenuIcon sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h6">No recipes found</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Try a different prompt to discover new meals!
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 3 }}
              onClick={() => setRecipes([])}
            >
              Try again
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {recipes.map((r) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={r.id}>
                <Card>
                  <CardMedia
                    component="img"
                    loading="lazy"
                    height="140"
                    image={r.image}
                    alt={r.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{r.title}</Typography>
                    <Typography variant="body2">
                      Ready in {r.readyInMinutes} mins
                    </Typography>
                    <Typography variant="body2">
                      Servings: {r.servings}
                    </Typography>
                    <Typography variant="body2">
                      {r.calories.toFixed(0)} kcal
                    </Typography>
                  </CardContent>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        href={r.spoonacularSourceUrl || r.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View full recipe for ${r.title}`}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        onClick={() => open(r.id)}
                        aria-label={`View details for ${r.title}`}
                      >
                        Details
                      </Button>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => toggleFavorite(r.title)}
                        aria-label={
                          favorites.includes(r.title)
                            ? `Remove ${r.title} from favorites`
                            : `Add ${r.title} to favorites`
                        }
                      >
                        {favorites.includes(r.title) ? (
                          <StarIcon color="warning" />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => navigator.clipboard.writeText(r.title)}
                        aria-label={`Copy recipe title ${r.title}`}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <RecipeDetailDialog
        open={openId !== null}
        loading={loadingRecipeDetail}
        recipe={recipe}
        error={recipeDetailError?.message}
        onClose={close}
      />
    </Box>
  );
}
