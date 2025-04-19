const API = import.meta.env.VITE_API_BASE_URL;
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `${API}/graphql`,
  cache: new InMemoryCache(),
});
