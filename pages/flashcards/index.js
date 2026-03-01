// pages/flashcards/index.js

import useSWR from "swr";
import FlashCardList from "@/components/FlashCardList/FlashCardList";

import styled from "styled-components";

const PageTitle = styled.h1`
  padding: 0;
`;

export default function FlashcardsPage() {
  const {
    data: flashcards,
    error: cardsError,
    isLoading: cardsLoading,
  } = useSWR("/api/flashcards");
  const {
    data: collections,
    error: collectionsError,
    isLoading: colectionsLoading,
  } = useSWR("/api/collections");

  if (cardsError || collectionsError) return <p>Error loading</p>;
  if (cardsLoading || colectionsLoading)
    return <p>Loading data... Please wait...</p>;
  const enrichedFlashcards = flashcards.map((card) => {
    const matchingCollection = collections.find(
      (col) => col.name === card.collection
    );
    return {
      ...card,
      color: matchingCollection ? matchingCollection.color : "#defaultColor#",
    };
  });
  return (
    <>
      <PageTitle>Card List</PageTitle>
      <FlashCardList flashcards={enrichedFlashcards} />
    </>
  );
}

FlashcardsPage.meta = {
  title: "Card List",
  description: "A list of all your cards.",
};
