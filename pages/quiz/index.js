// pages\quiz\index.js

import useSWR from "swr";
import FlashCardList from "@/components/FlashCardList/FlashCardList";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

const PageTitle = styled.h1`
  padding: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 30px;
`;

const CorrectAnswerButton = styled.button`
  background-color: var(--color-correct);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: var(--text-color-light);
  font-size: 1.2rem;
  height: 50px;
  padding: 5px 20px;
  width: 50%;
  &:hover {
    background-color: var(--color-secondary);
  }
`;
const WrongAnswerButton = styled.button`
  background-color: var(--color-wrong);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: var(--text-color-light);
  font-size: 1.2rem;
  height: 50px;
  padding: 5px 20px;
  width: 50%;
  &:hover {
    background-color: var(--color-secondary);
  }
`;
const RestartButton = styled.button`
  background-color: var(--color-primary);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: var(--text-color-light);
  font-size: 1.2rem;
  height: 50px;
  padding: 5px 20px;
  width: 50%;
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
  min-width: 300px;
`;
const StatsCorrect = styled.span`
  color: var(--color-correct);
`;
const StatsWrong = styled.span`
  color: var(--color-wrong);
`;

// ZUFÄLLIGE QUIZ CARDS ZUSAMMENSTELLEN
function pickRandomCards(cards, amountOfCards) {
  const copy = [...cards];
  copy.sort(() => Math.random() - 0.5);
  return copy.slice(0, Math.min(amountOfCards, copy.length));
}

export default function QuizPage() {
  const [quizCards, setQuizCards] = useLocalStorageState("quizcards", {
    defaultValue: [],
  });
  const [currentCard, setCurrentCard] = useLocalStorageState("currentcard", {
    defaultValue: 0,
  });
  const [countCorrect, setCountCorrect] = useLocalStorageState("countcorrect", {
    defaultValue: 0,
  });
  const [countWrong, setCountWrong] = useLocalStorageState("countwrong", {
    defaultValue: 0,
  });

  const [hasSeenAnswer, setHasSeenAnswer] = useState(false);

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

  const enrichedFlashcards = (flashcards ?? []).map((card) => {
    const matchingCollection = (collections ?? []).find(
      (col) => col.name === card.collection
    );
    return {
      ...card,
      color: matchingCollection ? matchingCollection.color : "#000000",
    };
  });

  function onHandleAnswer(isCorrect) {
    if (isCorrect) {
      setCountCorrect((i) => i + 1);
    } else {
      setCountWrong((i) => i + 1);
    }
    setCurrentCard((i) => i + 1);
  }

  function handleQuizRestart() {
    setCurrentCard(0);
    setCountCorrect(0);
    setCountWrong(0);
    setQuizCards([]);
  }

  useEffect(() => {
    if (!flashcards?.length) return;
    if (!collections?.length) return;
    if (quizCards.length > 0) return;

    setQuizCards(pickRandomCards(enrichedFlashcards, amountOfCards));
    setCurrentCard(0);
  }, [
    flashcards,
    collections,
    enrichedFlashcards,
    amountOfCards,
    quizCards.length,
  ]);

  useEffect(() => {
    setHasSeenAnswer(false);
  }, [currentCard]);

  if (cardsError || collectionsError) {
    return (
      <>
        <PageTitle>Quiz</PageTitle>
        <FeedbackMessage role="alert">Error loading</FeedbackMessage>
      </>
    );
  }

  if (cardsLoading || colectionsLoading) {
    return (
      <>
        <PageTitle>Quiz</PageTitle>
        <FeedbackMessage role="status" aria-live="polite">
          Loading data... Please wait...
        </FeedbackMessage>
      </>
    );
  }

  if (quizCards.length === 0) {
    return (
      <>
        <PageTitle>Quiz</PageTitle>
        <FeedbackMessage role="status">Preparing quiz...</FeedbackMessage>
      </>
    );
  }

  return (
    <>
      <PageTitle>Quiz</PageTitle>
      {currentCard < quizCards.length ? (
        <>
          <FeedbackMessage>
            {currentCard + 1}/{quizCards.length} | Correct: {countCorrect} |
            Wrong {countWrong}
          </FeedbackMessage>
          <FlashCardList
            flashcards={[quizCards[currentCard]]}
            onShowAnswer={() => setHasSeenAnswer(true)}
            showActions={false}
          />

          {hasSeenAnswer && (
            <ButtonGroup>
              <WrongAnswerButton onClick={() => onHandleAnswer(false)}>
                Wrong
              </WrongAnswerButton>
              <CorrectAnswerButton onClick={() => onHandleAnswer(true)}>
                Correct
              </CorrectAnswerButton>
            </ButtonGroup>
          )}
        </>
      ) : (
        <>
          <FeedbackMessage>Quiz finished.</FeedbackMessage>
          <ul>
            <li>Answered cards: {quizCards.length}.</li>
            <li>
              <StatsCorrect>Correct: {countCorrect}</StatsCorrect>{" "}
            </li>
            <li>
              <StatsWrong>Wrong: {countWrong}</StatsWrong>
            </li>
          </ul>
          <RestartButton onClick={() => handleQuizRestart()}>
            Restart Quiz
          </RestartButton>
        </>
      )}
    </>
  );
}

QuizPage.meta = {
  title: "Quiz",
  description: "Start quiz and learn cards.",
};
