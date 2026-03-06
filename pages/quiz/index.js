//pages/quiz/index.js
import useSWR from "swr";
import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import QuizSetup from "@/components/QuizSetup";
import FlashCardList from "@/components/FlashCardList/FlashCardList";

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
  font-weight: 300;
  text-align: left;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(0, 255, 94, 0.8);
  padding: 10px 10px 10px 20px;
  border-radius: 15px;
  margin: 20px 0 20px 0;
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

  // session states
  const defaultSession = { status: "idle", startedAt: null, finishedAt: null };
  const [session, setSession] = useLocalStorageState("quizSession", {
    defaultValue: defaultSession,
    defaultServerValue: defaultSession,
  });

  // verstrichene Zeit in Millisekunden
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalRef = useRef(null);

  // Zeitformat
  const formatSeconds = (ms) =>
    new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(ms / 1000);

  // cards über API laden (SWR > cached die daten)
  const {
    data: flashcards,
    error: cardsError,
    isLoading: cardsLoading,
  } = useSWR("/api/flashcards");

  // collections über API laden (SWR > cached die daten)
  const {
    data: collections,
    error: collectionsError,
    isLoading: collectionsLoading,
  } = useSWR("/api/collections");

  // cards mit collection-color anreichern
  const enrichedFlashcards = (flashcards ?? []).map((card) => {
    const matchingCollection = (collections ?? []).find(
      (col) => col.name === card.collection
    );
    return {
      ...card,
      color: matchingCollection ? matchingCollection.color : "#cccccc",
    };
  });

  // Quiz starten
  const startQuiz = useCallback(() => {
    setSession((session) => {
      // wenn gestartet und nicht fertig -> status auf 'running' setzen
      if (session?.startedAt && !session.finishedAt) {
        return { ...session, status: "running" };
      }
      // sonst neu starten
      return {
        status: "running",
        startedAt: new Date().toISOString(),
        finishedAt: null,
      };
    });
  }, [setSession]);

  // Quiz beenden
  const finishQuiz = useCallback(() => {
    setSession((session) => {
      // wenn noch nicht gestartet oder schon beendet → nichts ändern
      if (!session?.startedAt || session.finishedAt) return session;
      return {
        ...session,
        status: "finished",
        finishedAt: new Date().toISOString(),
      };
    });
  }, [setSession]);

  function handleStartQuiz(selectedCards) {
    setQuizCards(selectedCards); // die gefilterten Karten vom Setup
    setCurrentCard(0);
    setCountCorrect(0);
    setCountWrong(0);
    setElapsedTime(0);
    startQuiz();
  }

  // richtige/falsche Antworten zählen und nächste Card laden
  function onHandleAnswer(isCorrect) {
    if (isCorrect) {
      setCountCorrect((i) => i + 1);
    } else {
      setCountWrong((i) => i + 1);
    }
    setCurrentCard((i) => i + 1);
  }

  function handlePlayAgain() {
    setCurrentCard(0); // Neustart mit gleichen Karten
    setCountCorrect(0);
    setCountWrong(0);
    setElapsedTime(0);
    startQuiz();
  }

  function handleBackToSetup() {
    setQuizCards([]); // Karten werden gelöscht, Setup erscheint
    setCurrentCard(0);
    setSession(defaultSession);
  }

  // Quiz beenden, außer wenn ...
  useEffect(() => {
    if (session.status !== "running") return; // ... quiz nicht mehr läuft
    if (quizCards.length === 0) return; // ... es keine cards gibt
    if (currentCard < quizCards.length) return; // ... noch Karten übrig sind

    finishQuiz();
  }, [currentCard, quizCards.length, session.status, finishQuiz]);

  // Timer starten, vergangene Zeit berechnenen und als state speichern
  useEffect(() => {
    if (!session?.startedAt) return;

    // wenn finishedAt gesetzt: finalen Wert berechnen (einmal)
    if (session.finishedAt) {
      setElapsedTime(
        Date.parse(session.finishedAt) - Date.parse(session.startedAt)
      );
      return;
    }

    // läuft (auch nach Navigation zurück, weil startedAt persisted ist)
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Timer starten und alle 100 ms die Callback-Funktion ausführen
    intervalRef.current = setInterval(() => {
      const startMs = Date.parse(session.startedAt); // gespeicherten Startzeitpunkt Zahl umwandeln (ISO to Ms)
      setElapsedTime(Date.now() - startMs); // berechne verstrichene Zeit seit startedAt in Ms und als state speichern
    }, 100);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [session?.startedAt, session?.finishedAt]);

  // beim card-wechsel: antwort-status zurücksetzen (buttons erst nach ‘show answer’ einblenden)
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
          <HeadUpDisplay>
            Correct: {countCorrect} | Wrong: {countWrong} | Card:{" "}
            {currentCard + 1}/{quizCards.length} | Time:{" "}
            {formatSeconds(elapsedTime)}s
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
      )}

      {/* ZUSTAND 3: FINISHED - Wenn alle Karten durch sind */}
      {quizState === "finished" && (
        <>
          <FeedbackMessage>Quiz finished.</FeedbackMessage>
          <List>
            <ListItem>Answered cards: {quizCards.length}</ListItem>
            <ListItem>Correct: {countCorrect}</ListItem>
            <ListItem>Wrong: {countWrong} </ListItem>
            <ListItem>
              Accuracy: {Math.round((countCorrect / quizCards.length) * 100)}%
            </ListItem>
            <ListItem>Total time: {formatSeconds(elapsedTime)} sec</ListItem>
            <ListItem>
              Ø Avg time/card: {formatSeconds(elapsedTime / quizCards.length)}{" "}
              sec
            </ListItem>
          </List>

          <Button onClick={handlePlayAgain} style={{ marginBottom: "10px" }}>
            Play Again
          </Button>

          <Button onClick={handleBackToSetup} $variant="secondary">
            New Quiz
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
