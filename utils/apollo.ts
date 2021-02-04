import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
