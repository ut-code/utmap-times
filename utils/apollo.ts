import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { datoCmsPagination } from "./datocms";

const { NEXT_PUBLIC_GRAPHQL_ENDPOINT } = process.env;
const { NEXT_PUBLIC_GRAPHQL_TOKEN } = process.env;
if (!NEXT_PUBLIC_GRAPHQL_ENDPOINT || !NEXT_PUBLIC_GRAPHQL_TOKEN)
  throw new Error(
    "Could not detect NEXT_PUBLIC_GRAPHQL_ENDPOINT or NEXT_PUBLIC_GRAPHQL_TOKEN from environment variables."
  );

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_GRAPHQL_TOKEN}`,
    },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allClubs: datoCmsPagination,
        },
      },
    },
  }),
});

export default apolloClient;
