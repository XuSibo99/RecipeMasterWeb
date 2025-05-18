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
import { useMutation, useApolloClient } from "@apollo/client";
import {
  DietaryRestriction,
  GENERATE_AI_MEAL_SUGGESTION,
  SEARCH_RECIPES,
  RecipeSummary,
  SearchRecipesData,
  SearchRecipesVars,
} from "../../services/aisuggestion/AiSuggestionService";

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
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const client = useApolloClient();
  const [generateSuggestion] = useMutation(GENERATE_AI_MEAL_SUGGESTION);

  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);

  const handleSubmit = async () => {
    setHasSearched(true);
    setLoadingAI(true);
    setLoadingRecipes(false);
    setAiError(null);
    setFetchError(null);
    setRecipes([]);

    let titles: string[];
    try {
      const { data: ai } = await generateSuggestion({
        variables: { prompt, restrictions: prefsToRestrictions(prefs) },
      });
      titles = JSON.parse(ai.generateAiMealSuggestion) as string[];
    } catch (e) {
      console.error("AI error:", e);
      setAiError("Failed to generate recipe suggestions from prompt");
      setLoadingAI(false);
      return;
    }
    setLoadingAI(false);

    setLoadingRecipes(true);
    try {
      const results = await Promise.all(
        titles.map((t) =>
          client.query<SearchRecipesData, SearchRecipesVars>({
            query: SEARCH_RECIPES,
            variables: {
              query: t,
              restrictions: prefsToRestrictions(prefs),
              number: 1,
            },
          })
        )
      );
      const fetched = results
        .map((r) => r.data.searchRecipes[0])
        .filter(Boolean) as RecipeSummary[];
      setRecipes(fetched);
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (e) {
      console.error("Fetch error:", e);
      setFetchError("Failed to generate recipe details from Spoonacular");
    } finally {
      setLoadingRecipes(false);
    }
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
              onClick={() => setRecipes([]) /* 或触发一次默认搜索 */}
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
                    <Button
                      size="small"
                      href={r.spoonacularSourceUrl || r.sourceUrl}
                      target="_blank"
                    >
                      View full recipe
                    </Button>
                    <Stack direction="row" spacing={1}>
                      <IconButton onClick={() => toggleFavorite(r.title)}>
                        {favorites.includes(r.title) ? (
                          <StarIcon color="warning" />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => navigator.clipboard.writeText(r.title)}
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
    </Box>
  );
}
