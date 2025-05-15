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

export interface SearchRecipesData {
  searchRecipes: RecipeSummary[];
}

export interface SearchRecipesVars {
  query: string;
  restrictions: DietaryRestriction[];
  number: number;
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
