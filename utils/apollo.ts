import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const { GRAPHQL_ENDPOINT } = process.env;
const { GRAPHQL_TOKEN } = process.env;
if (!GRAPHQL_ENDPOINT || !GRAPHQL_TOKEN)
  throw new Error(
    "Could not detect GRAPHQL_ENDPOINT or GRAPHQL_TOKEN from environment variables."
  );

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `Bearer ${GRAPHQL_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
