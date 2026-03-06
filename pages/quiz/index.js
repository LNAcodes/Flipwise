// pages/quiz/index.js
import useSWR from "swr";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import QuizSetup from "@/components/QuizSetup";

import FlashCardList from "@/components/FlashCardList/FlashCardList";

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
  min-width: 300px;
`;

export default function QuizPage() {
  const [quizCards, setQuizCards] = useLocalStorageState("quizcards", {
    defaultValue: [],
  });
  const [currentCard, setCurrentCard] = useLocalStorageState("currentcard", {
    defaultValue: 0,
  });
  const [hasSeenAnswer, setHasSeenAnswer] = useState(false);

  const {
    data: flashcards,
    error: cardsError,
    isLoading: cardsLoading,
  } = useSWR("/api/flashcards");
  const {
    data: collections,
    error: collectionsError,
    isLoading: collectionsLoading,
  } = useSWR("/api/collections");

  const enrichedFlashcards = (flashcards ?? []).map((card) => {
    const matchingCollection = (collections ?? []).find(
      (col) => col.name === card.collection
    );
    return {
      ...card,
      color: matchingCollection ? matchingCollection.color : "#cccccc",
    };
  });

  function handleStartQuiz(selectedCards) {
    setQuizCards(selectedCards); // die gefilterten Karten vom Setup
    setCurrentCard(0);
  }

  function handlePlayAgain() {
    setCurrentCard(0); // Neustart mit gleichen Karten
  }

  function handleBackToSetup() {
    setQuizCards([]); // Karten werden gelöscht, Setup erscheint
    setCurrentCard(0);
  }

  useEffect(() => {
    setHasSeenAnswer(false);
  }, [currentCard]);

  if (cardsError || collectionsError)
    return <FeedbackMessage>Error loading</FeedbackMessage>;
  if (cardsLoading || collectionsLoading)
    return <FeedbackMessage>Loading data...</FeedbackMessage>;

  // Die Weiche der Anzeige

  // 1. Logik-Bereich der Prüfung des QuizStatus
  let quizState = "setup"; // Standardmäßig sind wir im Setup
  // Bei nicht vorhandenen Karten (Quiz zurückgesetzt) zeige Setup
  if (quizCards.length === 0) {
    quizState = "setup";
    // während des Quizes, QuizKarten sind vorhanden, Quiz aktiv
  } else if (currentCard < quizCards.length) {
    quizState = "active";
    // wenn alles andere nicht zutrifft, ist Quiz finished (gleichzusetzen mit currentCard=Gesamtlänge Quiz)
  } else {
    quizState = "finished";
  }

  return (
    <>
      <PageTitle>Quiz</PageTitle>

      {/* ZUSTAND 1: SETUP - Nur wenn keine Karten gewählt sind */}
      {quizState === "setup" && (
        <QuizSetup
          allCards={enrichedFlashcards}
          collections={collections}
          onStart={handleStartQuiz}
        />
      )}

      {/* ZUSTAND 2: ACTIVE - Während das Quiz läuft */}
      {quizState === "active" && (
        <>
          <FeedbackMessage>
            {currentCard + 1} / {quizCards.length}
          </FeedbackMessage>
          <FlashCardList
            flashcards={[quizCards[currentCard]]}
            onShowAnswer={() => setHasSeenAnswer(true)}
            showActions={false}
          />
          {hasSeenAnswer && (
            <Button onClick={() => setCurrentCard((i) => i + 1)}>
              Next Card
            </Button>
          )}
        </>
      )}

      {/* ZUSTAND 3: FINISHED - Wenn alle Karten durch sind */}
      {quizState === "finished" && (
        <>
          <FeedbackMessage>
            All {quizCards.length} cards have been viewed.
          </FeedbackMessage>

          <Button onClick={handlePlayAgain} style={{ marginBottom: "10px" }}>
            Play Again (Same Cards)
          </Button>

          <Button onClick={handleBackToSetup} $variant="secondary">
            New Quiz / Change Setup
          </Button>
        </>
      )}
    </>
  );
}

QuizPage.meta = {
  title: "Quiz",
  description: "Configure and play your quiz.",
};
