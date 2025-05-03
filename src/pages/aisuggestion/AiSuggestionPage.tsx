import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { GENERATE_AI_MEAL_SUGGESTION } from "../../services/aisuggestion/AiSuggestionService";

function AiSuggestionPage() {
  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [generateSuggestion] = useMutation(GENERATE_AI_MEAL_SUGGESTION);

  const handleSubmit = async () => {
    setLoading(true);
    setSuggestions([]);

    try {
      const res = await generateSuggestion({
        variables: { prompt: prompt },
      });

      const text = res.data?.generateAiMealSuggestion || "";
      const lines = text
        .split("\n")
        .map((line: string) => line.replace(/^\d+[).\s-]?\s*/, "").trim())
        .filter(Boolean);

      setSuggestions(lines);
    } catch (err) {
      console.error("Failed to fetch AI suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI-Powered Recipe Suggestions
      </Typography>

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

      {suggestions.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Suggestions:</Typography>
          <List>
            {suggestions.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

export default AiSuggestionPage;
