//components/QuizSetup/index.js
import {
  getRandomQuizCards,
  getCollectionQuizCards,
} from "@/utils/quizHelpers";
import styled from "styled-components";
import { useState } from "react";

const Message = styled.h2`
  color: #f10707;
  font-size: 20px;
  font-weight: bold;
`;
const L2 = styled.h2`
  color: #ccc;
  font-size: 32px;
  font-weight: bold;
  margin-top: 0;
`;
const SetupContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #ccc;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export default function QuizSetup({ allCards, collections, onStart }) {
  const [quizMode, setQuizMode] = useState("random");
  const [selectCollection, setSelectCollection] = useState("");
  const amountOfCards = 10;

  const hasEnoughCards = allCards?.length >= amountOfCards;

  function handleStart() {
    let cardsToPlay =
      quizMode === "random"
        ? getRandomQuizCards(allCards, amountOfCards)
        : getCollectionQuizCards(allCards, selectCollection);

    if (quizMode === "random") {
      cardsToPlay = getRandomQuizCards(allCards, amountOfCards);
    } else {
      cardsToPlay = getCollectionQuizCards(allCards, selectCollection);
    }
    //Sicherheitscheck, falls Karten/collections während des Quizes gelöscht werden(aktuell mgl.)
    if (cardsToPlay.length === 0) {
      alert("This Collection is empty! Please Choose another one.");
      return; // Abbruch, bevor onStart aufgerufen wird.
    }
    onStart(cardsToPlay);
  }
  return (
    <SetupContainer>
      <L2>Quiz Settings</L2>
      {/*Random Button*/}
      <label>
        <input
          type="radio"
          name="quizMode"
          value="random"
          checked={quizMode === "random"}
          onChange={() => setQuizMode("random")}
        />
        Random {amountOfCards} Cards
      </label>
      {/*Collection Button */}
      <label>
        <input
          type="radio"
          name="quizMode"
          value="collection"
          checked={quizMode === "collection"}
          onChange={() => setQuizMode("collection")}
        />
        By Collection
      </label>
      {quizMode === "collection" && (
        <select
          value={selectCollection}
          onChange={(event) => setSelectCollection(event.target.value)}
        >
          <option value=""> -- Choose a collection --</option>
          {collections?.map((col) => (
            <option key={col._id} value={col.name}>
              {col.name}
            </option>
          ))}
        </select>
      )}
      {/* Validierung & Startbutton */}
      {!hasEnoughCards && quizMode === "random" ? (
        <Message>
          Not enough cards! You need at least {amountOfCards} cards for a random
          quiz.
        </Message>
      ) : (
        <button
          onClick={handleStart}
          disabled={quizMode === "collection" && !selectCollection}
        >
          Start Quiz
        </button>
      )}
    </SetupContainer>
  );
}
