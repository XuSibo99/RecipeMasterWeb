import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_RECIPE,
  RecipeFull,
  GetRecipeData,
  GetRecipeVars,
} from "../../services/aisuggestion/AiSuggestionService";

export function useRecipeDetails() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [getRecipe, { data, loading, error }] = useLazyQuery<
    GetRecipeData,
    GetRecipeVars
  >(GET_RECIPE);

  const open = (id: number) => {
    setOpenId(id);
    getRecipe({ variables: { id } });
  };
  const close = () => setOpenId(null);

  return {
    openId,
    recipe: data?.getRecipe as RecipeFull | undefined,
    loadingRecipeDetail: loading,
    recipeDetailError: error,
    open,
    close,
  };
}
