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

function AiSuggestionPage() {
  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setSuggestions([]);

    // For now, use dummy suggestions
    setTimeout(() => {
      setSuggestions([
        "Salmon Rice Bowl with Broccoli",
        "Teriyaki Salmon Stir-fry",
        "Salmon and Veggie Grain Bowl",
      ]);
      setLoading(false);
    }, 1000);
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
