import { gql } from "@apollo/client";
import React, { PropsWithChildren } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { LayoutSeoFragment } from "../__generated__/LayoutSeoFragment";

export const layoutSeoFragment = gql`
  fragment LayoutSeoFragment on SeoField {
    description
    image {
      url
    }
    title
    twitterCard
  }
`;

export default function Layout(
  props: PropsWithChildren<{
    title?: string | null;
    seo?: LayoutSeoFragment | null;
  }>
) {
  const title = props.title ? `${props.title} | UTmap Times` : "UTmap Times";
  return (
    <>
      <Head>
        <title>{props.title && `${props.title} | `}UTmap Times</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:title"
          content={
            props.seo?.title ? `${props.seo.title} | UTmap Times` : title
          }
        />
        <meta
          property="og:image"
          content={
            props.seo?.image?.url ? props.seo.image.url : "/images/utmap.png"
          }
        />
        {props.seo?.description && (
          <meta property="og:description" content={props.seo.description} />
        )}
        <meta
          name="twitter:card"
          content={
            props.seo?.twitterCard
              ? props.seo.twitterCard
              : "summary_large_image"
          }
        />
      </Head>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
