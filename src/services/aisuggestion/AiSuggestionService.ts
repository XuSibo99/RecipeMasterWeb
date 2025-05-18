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
  sourceUrl: string;
  spoonacularSourceUrl: string;
}

export interface RecipeFull {
  id: number;
  title: string;
  image: string;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
  healthScore?: number;
  calories?: number;
  dishTypes?: string[];
  cuisines?: string[];
  readyInMinutes?: number;
  servings?: number;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
  summary?: string;
  instructions?: string;
  analyzedInstructions?: Instruction[];
  nutrition?: Nutrition;
}

export interface Instruction {
  step: string;
  ingredients: IngredientRef[];
  equipment: EquipmentRef[];
}

export interface IngredientRef {
  id: number;
  name: string;
}

export interface EquipmentRef {
  id: number;
  name: string;
}

export interface Nutrition {
  nutrients: Nutrient[];
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
}

export interface GenerateAiData {
  generateAiMealSuggestion: string;
}
export interface GenerateAiVars {
  prompt: string;
  restrictions: DietaryRestriction[];
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
      sourceUrl
      spoonacularSourceUrl
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
      sourceUrl
      spoonacularSourceUrl
    }
  }
`;

export const GET_RECIPE = gql`
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      image
      sourceUrl
      spoonacularSourceUrl
      healthScore
      calories
      dishTypes
      cuisines
      readyInMinutes
      servings
      vegetarian
      vegan
      glutenFree
      dairyFree
      summary
      instructions
      analyzedInstructions {
        step
        ingredients {
          id
          name
        }
        equipment {
          id
          name
        }
      }
      nutrition {
        nutrients {
          name
          amount
          unit
        }
      }
    }
  }
`;
