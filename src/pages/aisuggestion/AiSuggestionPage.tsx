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
  List,
  ListItem,
  ListItemText,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Grid2 as Grid,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useMutation, useLazyQuery } from "@apollo/client";
import {
  DietaryRestriction,
  GENERATE_AI_MEAL_SUGGESTION,
  RecipeBrief,
  SEARCH_RECIPES,
  SearchRecipesData,
  SearchRecipesVars,
} from "../../services/aisuggestion/AiSuggestionService";

type Prefs = Record<DietaryRestriction, boolean>;

const prefsToRestrictions = (p: Prefs): DietaryRestriction[] =>
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
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [generateSuggestion] = useMutation(GENERATE_AI_MEAL_SUGGESTION);
  const [searchRecipes, { data: recipeData, loading: loadingRecipes }] =
    useLazyQuery<SearchRecipesData, SearchRecipesVars>(SEARCH_RECIPES);

  const handleSubmit = async () => {
    setLoadingAI(true);
    setError(null);

    try {
      const { data } = await generateSuggestion({
        variables: {
          prompt,
          restrictions: prefsToRestrictions(prefs),
        },
      });
      const titles = JSON.parse(data.generateAiMealSuggestion) as string[];

      await searchRecipes({
        variables: {
          query: prompt,
          restrictions: prefsToRestrictions(prefs),
          number: titles.length,
        },
      });

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("dietPrefs", JSON.stringify(prefs));
  }, [prefs]);

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
                  setPrefs((curr) => ({ ...curr, [key]: e.target.checked }))
                }
              />
            }
            label={
              key === DietaryRestriction.VEGETARIAN
                ? "Vegetarian"
                : key === DietaryRestriction.GLUTEN_FREE
                ? "Gluten-Free"
                : "Nut Allergy"
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
      >
        {loadingAI ? "Generating..." : "Suggest Recipes"}
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {favorites.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">My Favorites</Typography>
          <List>
            {favorites.map((fav) => (
              <ListItem key={fav}>
                <ListItemText primary={fav} />
                <IconButton onClick={() => toggleFavorite(fav)}>
                  <StarIcon color="warning" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Box mt={4} ref={resultsRef}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h6">Suggestions</Typography>
          <IconButton onClick={handleSubmit} disabled={loadingAI}>
            <RefreshIcon />
          </IconButton>
        </Stack>

        {loadingRecipes ? (
          <Typography>Loading recipes...</Typography>
        ) : (
          <Grid container spacing={2}>
            {recipeData?.searchRecipes.map((r: RecipeBrief) => (
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
                    <Typography variant="body2" color="text.secondary">
                      Ready in {r.readyInMinutes} mins
                    </Typography>
                  </CardContent>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={1}
                    pr={1}
                    pb={1}
                  >
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
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
