import Head from "next/head";
import React from "react";

export interface BasicTemplateProps {
  children: React.ReactNode;
  title?: string;
}

function Basic({ children, title }: BasicTemplateProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title}</title>
      </Head>

      <main>{children}</main>
    </>
  );
}

export default Basic;
