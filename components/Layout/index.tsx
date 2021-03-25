import React, { PropsWithChildren } from "react";
import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";
import { LayoutSeoFragment } from "../../__generated__/LayoutSeoFragment";

export default function Layout(
  props: PropsWithChildren<{
    title?: string | null;
    seo?: LayoutSeoFragment | null;
  }>
) {
  return (
    <>
      <Head>
        <title>{props.title && `${props.title} | `}UTmap Times</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:title"
          content={
            props.seo?.title?.toString() && `${props.seo.title} | UTmap Times`
          }
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={props.seo?.image?.url} />
        <meta
          property="og:description"
          content={props.seo?.description?.toString()}
        />
        <meta
          name="twitter:card"
          content={props.seo?.twitterCard?.toString()}
        />
      </Head>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
