import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { useGtag } from "../utils/gtag";

if (typeof window === "object") import("../components/NProgress");

export default function App({ Component, pageProps }: AppProps) {
  useGtag();

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}
