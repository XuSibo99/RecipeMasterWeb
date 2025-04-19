import { ReactNode } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const mockClient = new ApolloClient({
  uri: "/fake",
  cache: new InMemoryCache(),
});

export const TestProviders = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={mockClient}>{children}</ApolloProvider>;
};
