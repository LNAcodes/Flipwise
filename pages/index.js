// pages/index.js

import FlashCardList from "@/components/FlashCardList/FlashCardList";
import styled from "styled-components";
import useSWR from "swr";

const PageTitle = styled.h1`
  padding: 0;
`;

export default function HomePage() {
  const { data, error, isLoading, mutate } = useSWR("/api/flashcards");

  if (error) return <p>Error loading flashcards.</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <PageTitle>Home (Dashbord)</PageTitle>
      <FlashCardList flashcards={data} />
    </>
  );
}

HomePage.meta = {
  title: "Home (Dashboard)",
  description: "Dashboard and overview.",
};
