// pages/_app.js

import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Layout from "@/components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import styled from "styled-components";

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
const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const meta = Component.meta ?? {};
  return (
    <SessionProvider session={session}>
      <Wrapper>
        <GlobalStyle />
        <SWRConfig value={{ fetcher }}>
          <Layout title={meta.title} description={meta.description}>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </Wrapper>
    </SessionProvider>
  );
}
