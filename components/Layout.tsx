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

export type LayoutSeo = {
  description?: string | null;
  image?: LayoutSeoFragment["image"];
  title?: string | null;
  twitterCard?: LayoutSeoFragment["twitterCard"] | null;
};

export default function Layout(
  props: PropsWithChildren<{
    title?: string | null;
    seo?: LayoutSeo | null;
  }>
) {
  const title = props.title ? `${props.title} | UTmap` : "UTmap";
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>{props.title && `${props.title} | `}UTmap</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {props.seo?.description && (
          <meta name="description" content={props.seo.description} />
        )}
        <meta
          property="og:title"
          content={props.seo?.title ? `${props.seo.title} | UTmap` : title}
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
