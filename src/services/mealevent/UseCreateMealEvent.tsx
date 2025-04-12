import { useMutation } from "@apollo/client";
import {
  CREATE_MEAL_EVENT,
  GET_MEAL_EVENTS_BY_USER_ID,
  MealEventFormData,
} from "./MealEventService";

export const UseCreateMealEvent = () => {
  const [createMutation] = useMutation(CREATE_MEAL_EVENT, {
    refetchQueries: [
      {
        query: GET_MEAL_EVENTS_BY_USER_ID,
        variables: { userId: "sibo.xu" },
      },
    ],
  });

  const createMeal = async (data: MealEventFormData) => {
    return createMutation({
      variables: { input: data },
    });
  };

  return { createMeal };
};
