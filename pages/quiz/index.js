// pages/quiz/index.js
import QuizSetup from "@/components/QuizSetup";
import styled from "styled-components";
import useSWR from "swr";
const PageTitle = styled.h1`
  padding: 0;
`;

export default function QuizPage() {
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
      <QuizSetup allCards={enrichedFlashcards} collection={collections} />
    </>
  );
}

QuizPage.meta = {
  title: "Card List",
  description: "A list of all your cards.",
};
