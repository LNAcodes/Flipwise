// components/Layout/Layout.js
import styled from "styled-components";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MetaHeader from "@/components/MetaHeader/MetaHeader";
import BackgroundDots from "@/components/BackgroundDots/BackgroundDots";

const Main = styled.main`
  flex: 1;
  text-align: center;
`;

export default function Layout({ children, title, description }) {
  return (
    <>
      <MetaHeader title={title} description={description} />
      <BackgroundDots />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
