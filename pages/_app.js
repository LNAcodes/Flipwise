// pages/_app.js

import GlobalStyle from "../styles";
import Header from "@/components/Header/Header";
import { SWRConfig } from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Header />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
