// pages/index.js

import styled from "styled-components";

const PageTitle = styled.h1`
  padding: 0;
`;

export default function HomePage() {
  return (
    <>
      <PageTitle>Home (Dashbord)</PageTitle>
    </>
  );
}

HomePage.meta = {
  title: "Home (Dashboard)",
  description: "Dashboard and overview.",
};
