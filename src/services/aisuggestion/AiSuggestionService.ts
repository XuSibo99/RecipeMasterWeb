import { gql } from "@apollo/client";

export enum DietaryRestriction {
  VEGETARIAN = "VEGETARIAN",
  GLUTEN_FREE = "GLUTEN_FREE",
  NUT_ALLERGY = "NUT_ALLERGY",
}

export const GENERATE_AI_MEAL_SUGGESTION = gql`
  mutation GenerateAiMealSuggestion(
    $prompt: String!
    $restrictions: [DietaryRestriction!]!
  ) {
    generateAiMealSuggestion(prompt: $prompt, restrictions: $restrictions)
  }
`;
