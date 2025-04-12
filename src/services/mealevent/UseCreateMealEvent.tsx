import { useMutation } from "@apollo/client";
import { CREATE_MEAL_EVENT } from "./MealEventService";
import { MealEventFormData } from "../../pages/mealplanner/CreateMealDialog";

export const UseCreateMealEvent = () => {
  const [createMutation] = useMutation(CREATE_MEAL_EVENT);

  const createMeal = async (data: MealEventFormData) => {
    return createMutation({
      variables: { input: data },
    });
  };

  return { createMeal };
};
