// pages\quiz\index.js

import useSWR from "swr";
import FlashCardList from "@/components/FlashCardList/FlashCardList";
import styled from "styled-components";
import { useEffect, useState } from "react";

const PageTitle = styled.h1`
  padding: 0;
`;

const Button = styled.button`
  background-color: var(--color-primary);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  color: var(--text-color-light);
  font-size: 1.2rem;
  height: 60px;
  padding: 5px 60px;
  &:hover {
    background-color: var(--color-secondary);
  }
`;

const FeedbackMessage = styled.p`
  background: rgba(0, 200, 120, 0.5);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  padding: 10px 14px;
  border-radius: 20px;
  margin: 10px 0 6px;
`;

const Feedback = styled.p`
  color: var(--color-accent);
`;

export default function QuizPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [hasSeenAnswer, setHasSeenAnswer] = useState(false);

  useEffect(() => {
    setHasSeenAnswer(false); // bei neuer Karte Button wieder verstecken
  }, [currentCard]);

  const amountOfCards = 10;

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

  // 10 QUIZ CARDS ZUSAMMENSTELLEN
  function pickCards(cards, amountOfCards) {
    const copy = [...cards];
    return copy.slice(0, amountOfCards);
  }

  return (
    <>
      <PageTitle>Quiz</PageTitle>
      {currentCard < amountOfCards ? (
        <>
          <FeedbackMessage>
            {currentCard + 1}/{amountOfCards}
          </FeedbackMessage>
          <FlashCardList
            flashcards={[enrichedFlashcards[currentCard]]}
            onShowAnswer={() => setHasSeenAnswer(true)}
          />

          {hasSeenAnswer && (
            <Button onClick={() => setCurrentCard((i) => i + 1)}>
              Next Card
            </Button>
          )}
        </>
      ) : (
        <>
          <FeedbackMessage>
            All {amountOfCards} cards have been viewed.
          </FeedbackMessage>
          <Button onClick={() => setCurrentCard(0)}>Restart Quiz</Button>
        </>
      )}
    </>
  );
}

QuizPage.meta = {
  title: "Quiz",
  description: "Start quiz and learn cards.",
};
