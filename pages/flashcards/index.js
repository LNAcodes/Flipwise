// pages/flashcards/index.js

import useSWR from "swr";
import FlashCardList from "@/components/FlashCardList/FlashCardList";
import styled from "styled-components";

const PageTitle = styled.h1`
  padding: 0;
`;

export default function FlashcardsPage() {
  const { data, error, isLoading } = useSWR("/api/flashcards");

  if (error) return <p>Error loading</p>;
  if (isLoading) return <p>Loading data... Please wait...</p>;

  return (
    <>
      <PageTitle>Card List</PageTitle>
      <FlashCardList flashcards={data} />
    </>
  );
}

FlashcardsPage.meta = {
  title: "Card List",
  description: "A list of all your cards.",
};
