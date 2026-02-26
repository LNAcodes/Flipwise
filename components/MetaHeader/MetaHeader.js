// components/MetaHeader/MetaHeader.js

import Head from "next/head";

export default function MetaHeader({ title, description }) {
  const pageTitle = title ? `${title} | FlipWise` : "FlipWise";
  const pageDescription = description ?? "Learn with flashcards.";

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
    </Head>
  );
}
