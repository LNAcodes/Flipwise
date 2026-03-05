// pages\quiz\index.js

import useSWR from "swr";
import FlashCardList from "@/components/FlashCardList/FlashCardList";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import useLocalStorageState from "use-local-storage-state";

const PageTitle = styled.h1`
  padding: 0;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 30px;
`;
const Button = styled.button`
  background-color: ${(props) =>
    props.$correct
      ? "var(--color-correct)"
      : props.$wrong
        ? "var(--color-wrong)"
        : "var(--color-primary)"};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: var(--text-color-light);
  font-size: 1.2rem;
  height: 50px;
  padding: 5px 20px;
  width: 50%;
  min-width: ${(props) => (props.$restart ? "300px" : "auto")};
  margin: ${(props) => (props.$restart ? "10px 0 6px" : "0")};
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
const HeadUpDisplay = styled.p`
  font-size: 13px;
  font-weight: 400;
  text-align: left;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--color-border);
  color: var(--text-color-dark);
  padding: 10px 14px;
  border-radius: 20px;
  margin: 10px 0 6px;
  min-width: 300px;
`;
const List = styled.ul`
  list-style: none;
  text-align: left;
  font-size: 18px;
  font-weight: 400;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--color-border);
  padding: 20px;
  border-radius: 20px;
  margin: 20px 0 20px 0;
  line-height: 2;
  min-width: 300px;
`;
const ListItem = styled.li`
  text-align: left;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--color-border);
  padding: 5px 20px;
  border-radius: 20px;
  margin: 10px 0 10px 0;
  &:nth-child(2) {
    border: 1px solid var(--color-correct);
    color: var(--color-correct);
  }
  &:nth-child(3) {
    border: 1px solid var(--color-wrong);
    color: var(--color-wrong);
  }
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

  const [session, setSession] = useState({
    defaultValue: { status: "idle", startedAt: null, finishedAt: null },
    defaultServerValue: { status: "idle", startedAt: null, finishedAt: null },
  });
  console.log(session);

  // verstrichene Zeit in Millisekunden
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalRef = useRef(null);

  const formatSeconds = (ms) =>
    new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(ms / 1000);

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

  function startQuiz() {
    setSession({
      status: "running",
      startedAt: new Date().toISOString(),
      finishedAt: null,
    });
  }

  function finishQuiz() {
    setSession((s) => ({
      ...s,
      status: "finished",
      finishedAt: new Date().toISOString(),
    }));
  }

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
    startQuiz();
  }

  useEffect(() => {
    if (!flashcards?.length) return;
    if (!collections?.length) return;
    if (quizCards.length > 0) return;

    setQuizCards(pickRandomCards(enrichedFlashcards, amountOfCards));
    setCurrentCard(0);
    startQuiz();
  }, [
    flashcards,
    collections,
    enrichedFlashcards,
    amountOfCards,
    quizCards.length,
    setCurrentCard,
    setQuizCards,
    startQuiz,
  ]);

  useEffect(() => {
    if (session.status !== "running") return;
    if (quizCards.length === 0) return;
    if (currentCard < quizCards.length) return;

    finishQuiz();
  }, [currentCard, quizCards.length, session.status, finishQuiz]);

  useEffect(() => {
    if (session.status !== "running" || !session.startedAt) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const startMs = Date.parse(session.startedAt);
      setElapsedTime(Date.now() - startMs);
    }, 250);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [session.status, session.startedAt, setElapsedTime]);
  console.log("Elapsed Time: ", elapsedTime);

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
          <HeadUpDisplay>
            Correct: {countCorrect} | Wrong {countWrong} | Time:{" "}
            {formatSeconds(elapsedTime)}s | Card: {currentCard + 1}/
            {quizCards.length}
          </HeadUpDisplay>
          <FlashCardList
            flashcards={[quizCards[currentCard]]}
            onShowAnswer={() => setHasSeenAnswer(true)}
            showActions={false}
          />

          {hasSeenAnswer && (
            <ButtonGroup>
              <Button $wrong onClick={() => onHandleAnswer(false)}>
                Wrong
              </Button>
              <Button $correct onClick={() => onHandleAnswer(true)}>
                Correct
              </Button>
            </ButtonGroup>
          )}
        </>
      ) : (
        <>
          <FeedbackMessage>Quiz finished.</FeedbackMessage>
          <List>
            <ListItem>Answered cards: {quizCards.length}</ListItem>
            <ListItem>Correct: {countCorrect}</ListItem>
            <ListItem>Wrong: {countWrong} </ListItem>
            <ListItem>
              Acuracy: {(countCorrect / quizCards.length) * 100}%
            </ListItem>
            <ListItem>Total time: {formatSeconds(elapsedTime)} sec</ListItem>
            <ListItem>
              Ø Avg time/card: {formatSeconds(elapsedTime / quizCards.length)}{" "}
              sec
            </ListItem>
          </List>
          <Button $restart onClick={() => handleQuizRestart()}>
            Restart Quiz
          </Button>
        </>
      )}
    </>
  );
}

QuizPage.meta = {
  title: "Quiz",
  description: "Start quiz and learn cards.",
};
