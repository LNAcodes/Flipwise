// components/Layout/Layout.js
import styled from "styled-components";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MetaHead from "@/components/MetaHead/MetaHead";
import BackgroundDots from "@/components/BackgroundDots/BackgroundDots";

const Main = styled.main`
  flex: 1;
  text-align: center;
`;

export default function Layout({ children, title, description }) {
  return (
    <>
      <MetaHead title={title} description={description} />
      <BackgroundDots />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
