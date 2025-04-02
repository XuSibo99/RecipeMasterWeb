import { gql } from '@apollo/client';
import {client } from '../../main'

export interface MealEventDTO {
    id: string,
    title: string,
    name: string,
    start: string,
    userId: string
}

const GET_MEAL_EVENT_BY_ID = gql`
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
      console.error('Error fetching MealEvent by ID', error);
      throw new Error('Error fetching data');
    }
  };

const GET_MEAL_EVENTS_BY_USER_ID = gql`
    query getMealEventByUserId($userId: String!) {
      getMealEventByUserId(userId: $userId) {
        id
        title
        name
        start
        userId
      }
    }
  `;

export const getMealEventsByUserId = async (userId: string): Promise<MealEventDTO[]> => {
    try {
        const response = await client.query({
        query: GET_MEAL_EVENTS_BY_USER_ID,
        variables: { userId },   
        });
        return response.data.getMealEventByUserId;
    } catch (error) {
        console.error('Error fetching MealEvent by UserId', error);
        throw new Error('Error fetching data');
    }
};