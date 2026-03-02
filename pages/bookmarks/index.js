// pages/index.js

import styled from "styled-components";

const PageTitle = styled.h1`
  padding: 0;
`;

export default function HomePage() {
  return (
    <>
      <PageTitle>Bookmark List</PageTitle>
    </>
  );
}

HomePage.meta = {
  title: "Bookmark list",
  description: "List of my marked Cards",
};
