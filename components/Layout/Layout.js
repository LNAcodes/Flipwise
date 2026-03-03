// components/Layout/Layout.js
import styled from "styled-components";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MetaHeader from "@/components/MetaHeader/MetaHeader";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

export default function Layout({ children, title, description }) {
  return (
    <Wrapper>
      <MetaHeader title={title} description={description} />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  );
}
