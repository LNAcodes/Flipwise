// pages/index.js

import styled from "styled-components";

const PageTitle = styled.h1`
  padding: 0;
`;

export default function HomePage() {
  return (
    <>
      <PageTitle>Welcome to FlipWise</PageTitle>
    </>
  );
}

HomePage.meta = {
  title: "Home",
  description: "Your Dashboard and overview.",
};
