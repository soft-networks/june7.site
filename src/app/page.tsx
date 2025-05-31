"use client";

import Head from "next/head";
import GuideModal from "./components/guide";
import IFrame from "./components/iframe";
export default function Home() {
  return (
    <>
      <Head>
        <title>june7.site</title>
        <meta name="description" content="june7.site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <IFrame />
      <GuideModal />
    </>
  );
}
