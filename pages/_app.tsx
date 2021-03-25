import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import apolloClient from "../utils/apollo";
import { useGtag } from "../utils/gtag";

if (typeof window === "object") import("../components/NProgress");

export default function App({ Component, pageProps }: AppProps) {
  useGtag();

  // eslint-disable-next-line react/jsx-props-no-spreading
  const page = <Component {...pageProps} />;

  return <ApolloProvider client={apolloClient}>{page}</ApolloProvider>;
}
