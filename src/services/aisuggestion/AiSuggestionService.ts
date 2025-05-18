import { gql } from "@apollo/client";

export enum DietaryRestriction {
  VEGETARIAN = "VEGETARIAN",
  GLUTEN_FREE = "GLUTEN_FREE",
  NUT_ALLERGY = "NUT_ALLERGY",
}

export interface RecipeSummary {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  calories: number;
}

export interface RecipeFull {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  sourceUrl: string;
  extendedIngredients: string[];
}

export interface SearchRecipesData {
  searchRecipes: RecipeSummary[];
}

export interface SearchRecipesVars {
  query: string;
  restrictions: DietaryRestriction[];
  number: number;
}

export interface BatchSearchRecipesData {
  searchRecipesByTitles: RecipeSummary[];
}
export interface BatchSearchRecipesVars {
  titles: string[];
  restrictions: DietaryRestriction[];
}

export interface GetRecipeData {
  getRecipe: RecipeFull;
}

export interface GetRecipeVars {
  id: number;
}

export const GENERATE_AI_MEAL_SUGGESTION = gql`
  mutation GenerateAiMealSuggestion(
    $prompt: String!
    $restrictions: [DietaryRestriction!]!
  ) {
    generateAiMealSuggestion(prompt: $prompt, restrictions: $restrictions)
  }
`;

export const SEARCH_RECIPES = gql`
  query SearchRecipes(
    $query: String!
    $restrictions: [DietaryRestriction!]!
    $number: Int!
  ) {
    searchRecipes(query: $query, restrictions: $restrictions, number: $number) {
      id
      title
      image
      readyInMinutes
      servings
      sourceUrl
      spoonacularSourceUrl
      calories
    }
  }
`;

export const GET_RECIPE = gql`
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      image
      readyInMinutes
      servings
      summary
      sourceUrl
      extendedIngredients
    }
  }
`;

export const BATCH_SEARCH_RECIPES = gql`
  query SearchRecipesByTitles(
    $titles: [String!]!
    $restrictions: [DietaryRestriction!]!
  ) {
    searchRecipesByTitles(titles: $titles, restrictions: $restrictions) {
      id
      title
      image
      readyInMinutes
      servings
      sourceUrl
      spoonacularSourceUrl
      calories
    }
  }
`;
