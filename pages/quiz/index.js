// pages\quiz\index.js

import useSWR from "swr";
import FlashCardList from "@/components/FlashCardList/FlashCardList";
import styled from "styled-components";
import { useEffect, useState } from "react";

const PageTitle = styled.h1`
  padding: 0;
`;

const FeedbackMessage = styled.p`
  background: rgba(0, 200, 120, 0.5);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  padding: 10px 14px;
  border-radius: 20px;
  margin: 10px 0 6px;
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

  if (cardsError || collectionsError) {
    return (
      <>
        <PageTitle>Edit Card</PageTitle>
        <FeedbackMessage role="alert">Error loading</FeedbackMessage>
      </>
    );
  }

  if (cardsLoading || colectionsLoading) {
    return (
      <>
        <PageTitle>Edit Card</PageTitle>
        <FeedbackMessage role="status" aria-live="polite">
          Loading data... Please wait...
        </FeedbackMessage>
      </>
    );
  }

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
      <PageTitle>Quiz</PageTitle>
      <FlashCardList flashcards={[enrichedFlashcards[0]]} />
    </>
  );
}

QuizPage.meta = {
  title: "Quiz",
  description: "Start quiz and learn cards.",
};
