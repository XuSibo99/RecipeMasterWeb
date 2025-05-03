import { gql } from "@apollo/client";

export const GENERATE_AI_MEAL_SUGGESTION = gql`
  mutation GenerateAiMealSuggestion($prompt: String!) {
    generateAiMealSuggestion(prompt: $prompt)
  }
`;
