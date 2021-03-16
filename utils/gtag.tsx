import { useRouter } from "next/router";
import { useEffect } from "react";

export const GOOGLE_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;

export const gtagInjectedHeadElements = GOOGLE_MEASUREMENT_ID ? (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_MEASUREMENT_ID}`}
    />
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "${GOOGLE_MEASUREMENT_ID}", {
            page_path: window.location.pathname,
          });
        `,
      }}
    />
  </>
) : null;

export function useGtag() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "object" || !GOOGLE_MEASUREMENT_ID) {
      return undefined;
    }

    const onRouteChangeComplete = (url: string) => {
      window.gtag("event", "page_view", { page_path: url });
    };

    router.events.on("routeChangeComplete", onRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router.events]);
}
