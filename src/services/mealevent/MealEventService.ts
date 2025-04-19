import { gql } from "@apollo/client";
import { client } from "../../lib/apolloClient";
export interface MealEventDTO {
  id: string;
  title: string;
  name: string;
  start: string;
  userId: string;
}

export interface MealEventFormData {
  title: string;
  name: string;
  start: string;
  userId: string;
}

export const GET_MEAL_EVENT_BY_ID = gql`
  query getMealEventById($id: String!) {
    getMealEventById(id: $id) {
      id
      title
      name
      start
      userId
    }
  }
`;

export const getMealEventById = async (id: string): Promise<MealEventDTO> => {
  try {
    const response = await client.query({
      query: GET_MEAL_EVENT_BY_ID,
      variables: { id },
    });
    return response.data.getMealEventById;
  } catch (error) {
    console.error("Error fetching MealEvent by ID", error);
    throw new Error("Error fetching data");
  }
};

export const GET_MEAL_EVENTS_BY_USER_ID = gql`
  query getMealEventsByUserId($userId: String!) {
    getMealEventsByUserId(userId: $userId) {
      id
      title
      name
      start
      userId
    }
  }
`;

export const getMealEventsByUserId = async (
  userId: string
): Promise<MealEventDTO[]> => {
  try {
    const response = await client.query({
      query: GET_MEAL_EVENTS_BY_USER_ID,
      variables: { userId },
    });
    return response.data.getMealEventsByUserId;
  } catch (error) {
    console.error("Error fetching MealEvent by UserId", error);
    throw new Error("Error fetching data");
  }
};

export const CREATE_MEAL_EVENT = gql`
  mutation CreateMealEvent($input: MealEventInput!) {
    createMealEvent(input: $input) {
      id
      title
      name
      start
      userId
    }
  }
`;

export const UPDATE_MEAL_EVENT = gql`
  mutation UpdateMealEvent($id: String!, $input: UpdateMealEventInput!) {
    updateMealEvent(id: $id, input: $input) {
      id
      title
      name
      start
      userId
    }
  }
`;

export const DELETE_MEAL_EVENT = gql`
  mutation DeleteMealEvent($id: String!) {
    deleteMealEvent(id: $id)
  }
`;
