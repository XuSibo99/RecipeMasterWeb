import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Fade,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useMutation } from "@apollo/client";
import {
  DietaryRestriction,
  GENERATE_AI_MEAL_SUGGESTION,
} from "../../services/aisuggestion/AiSuggestionService";

type Prefs = Record<DietaryRestriction, boolean>;

function prefsToRestrictions(p: Prefs): DietaryRestriction[] {
  return (Object.keys(p) as DietaryRestriction[]).filter((k) => p[k]);
}

function AiSuggestionPage() {
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

  const toggleFavorite = (recipe: string) => {
    setFavorites((favs) => {
      const next = favs.includes(recipe)
        ? favs.filter((r) => r !== recipe)
        : [...favs, recipe];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  };

  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [generateSuggestion] = useMutation(GENERATE_AI_MEAL_SUGGESTION);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const restrictions = prefsToRestrictions(prefs);
    try {
      const { data } = await generateSuggestion({
        variables: { prompt, restrictions },
      });
      const text = data.generateAiMealSuggestion || "";
      // const lines = text
      //   .split("\n")
      //   .map((line: string) => line.replace(/^\d+[).\s-]?\s*/, "").trim())
      //   .filter(Boolean);
      const lines = JSON.parse(text) as string[];
      setSuggestions(lines);
    } catch (e: unknown) {
      console.error(e);
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (suggestions.length && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [suggestions]);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI-Powered Recipe Suggestions
      </Typography>

      {/* Dietary Preferences */}
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

      {/* Prompt input */}
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
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Generating..." : "Suggest Recipes"}
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* My Favorites */}
      {favorites.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">My Favorites:</Typography>
          <List>
            {favorites.map((fav) => (
              <ListItem key={fav}>
                <ListItemText primary={fav} />
                <IconButton
                  edge="end"
                  aria-label="unfavorite"
                  onClick={() => toggleFavorite(fav)}
                >
                  <StarIcon color="warning" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Box mt={4} ref={resultsRef}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">Suggestions:</Typography>
            <IconButton
              onClick={handleSubmit}
              disabled={loading}
              aria-label="Regenerate"
            >
              <RefreshIcon />
            </IconButton>
          </Stack>

          <List>
            {suggestions.map((s, i) => (
              <Fade in style={{ transitionDelay: `${i * 100}ms` }} key={s}>
                <ListItem
                  sx={{
                    mb: 1,
                    boxShadow: 1,
                    borderRadius: 1,
                    position: "relative",
                  }}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        aria-label="favorite"
                        onClick={() => toggleFavorite(s)}
                      >
                        {favorites.includes(s) ? (
                          <StarIcon color="warning" />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="copy"
                        onClick={() => navigator.clipboard.writeText(s)}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText primary={s} />
                </ListItem>
              </Fade>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

export default AiSuggestionPage;
