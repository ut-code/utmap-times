import React, { PropsWithChildren } from "react";
import Head from "next/head";

const Layout = ({
  children,
  title = "This is the default title",
}: PropsWithChildren<{ title?: string }>) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </div>
);

export default Layout;
