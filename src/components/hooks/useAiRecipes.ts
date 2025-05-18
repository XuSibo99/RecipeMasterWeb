import { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { z } from "zod";
import {
  BATCH_SEARCH_RECIPES,
  BatchSearchRecipesData,
  BatchSearchRecipesVars,
  DietaryRestriction,
  GENERATE_AI_MEAL_SUGGESTION,
  RecipeSummary,
} from "../../services/aisuggestion/AiSuggestionService";

const TitlesSchema = z.array(z.string());

export function useAiRecipes() {
  const client = useApolloClient();
  const [generateSuggestion] = useMutation(GENERATE_AI_MEAL_SUGGESTION);

  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const search = async (prompt: string, prefs: DietaryRestriction[]) => {
    setAiError(null);
    setFetchError(null);
    setLoadingAI(true);
    setRecipes([]);

    let titles: string[];
    try {
      const { data } = await generateSuggestion({
        variables: { prompt, restrictions: prefs },
      });
      const raw = data.generateAiMealSuggestion;

      titles = TitlesSchema.parse(JSON.parse(raw)) as string[];
    } catch (e) {
      console.error("AI error:", e);
      setAiError("Failed to generate recipe suggestions from prompt");
      setLoadingAI(false);
      return;
    }
    setLoadingAI(false);

    setLoadingRecipes(true);
    try {
      const { data } = await client.query<
        BatchSearchRecipesData,
        BatchSearchRecipesVars
      >({
        query: BATCH_SEARCH_RECIPES,
        variables: { titles, restrictions: prefs },
      });
      setRecipes(data.searchRecipesByTitles);
    } catch (e) {
      console.error("Fetch error:", e);
      setFetchError("Failed to generate recipe details from Spoonacular");
    } finally {
      setLoadingRecipes(false);
    }
  };

  return {
    recipes,
    loadingAI,
    loadingRecipes,
    aiError,
    fetchError,
    search,
    setRecipes,
  };
}
