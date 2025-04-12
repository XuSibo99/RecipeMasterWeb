import { useMutation } from "@apollo/client";
import {
  DELETE_MEAL_EVENT,
  GET_MEAL_EVENTS_BY_USER_ID,
} from "./MealEventService";

export const UseDeleteMealEvent = () => {
  const [deleteMealEventMutation] = useMutation(DELETE_MEAL_EVENT, {
    refetchQueries: [
      {
        query: GET_MEAL_EVENTS_BY_USER_ID,
        variables: { userId: "sibo.xu" },
      },
    ],
  });

  const deleteMeal = async (id: string) => {
    try {
      await deleteMealEventMutation({ variables: { id } });
    } catch (err) {
      console.error("Failed to delete meal event:", err);
    }
  };

  return { deleteMeal };
};
