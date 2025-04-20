import { useMutation } from "@apollo/client";
import {
  GET_MEAL_EVENTS_BY_USER_ID,
  MealEventDTO,
  UPDATE_MEAL_EVENT,
} from "./MealEventService";

export const useUpdateMealEvent = () => {
  const [updateMealEventMutation] = useMutation(UPDATE_MEAL_EVENT, {
    refetchQueries: [
      {
        query: GET_MEAL_EVENTS_BY_USER_ID,
        variables: { userId: "sibo.xu" },
      },
    ],
  });

  const updateMeal = async (id: string, input: Partial<MealEventDTO>) => {
    const { title, name, start, userId, recurrence } = input;
    return updateMealEventMutation({
      variables: {
        id,
        input: { title, name, start, userId, recurrence },
      },
    });
  };

  return { updateMeal };
};
