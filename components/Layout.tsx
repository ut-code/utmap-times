import React, { PropsWithChildren } from "react";
import Head from "next/head";
import Header from "./Header";

export default function Layout(
  props: PropsWithChildren<{ title?: string | null }>
) {
  return (
    <>
      <Head>
        <title>{props.title && `${props.title} | `}UTmap Times</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {props.children}
    </>
  );
}
