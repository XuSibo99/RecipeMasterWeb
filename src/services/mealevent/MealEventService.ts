import { gql } from "@apollo/client";
export interface MealEventDTO {
  id: string;
  title: string;
  name: string;
  start: string;
  userId: string;
  recurrence?: Recurrence;
}

export interface MealEventFormData {
  title: string;
  name: string;
  start: string;
  userId: string;
  recurrence?: Recurrence;
}

export enum Recurrence {
  YEARLY = "YEARLY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  DAILY = "DAILY",
}

export const recurrenceOptions = [
  { label: "Daily", value: Recurrence.DAILY },
  { label: "Weekly", value: Recurrence.WEEKLY },
  { label: "Monthly", value: Recurrence.MONTHLY },
  { label: "Yearly", value: Recurrence.YEARLY },
];

export const GET_MEAL_EVENT_BY_ID = gql`
  query getMealEventById($id: String!) {
    getMealEventById(id: $id) {
      id
      title
      name
      start
      userId
      recurrence
    }
  }
`;

export const GET_MEAL_EVENTS_BY_USER_ID = gql`
  query getMealEventsByUserId($userId: String!) {
    getMealEventsByUserId(userId: $userId) {
      id
      title
      name
      start
      userId
      recurrence
    }
  }
`;

export const CREATE_MEAL_EVENT = gql`
  mutation CreateMealEvent($input: MealEventInput!) {
    createMealEvent(input: $input) {
      id
      title
      name
      start
      userId
      recurrence
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
      recurrence
    }
  }
`;

export const DELETE_MEAL_EVENT = gql`
  mutation DeleteMealEvent($id: String!) {
    deleteMealEvent(id: $id)
  }
`;
