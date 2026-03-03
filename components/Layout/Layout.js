// components/Layout/Layout.js
import styled from "styled-components";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MetaHeader from "@/components/MetaHeader/MetaHeader";

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  text-align: center;
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
