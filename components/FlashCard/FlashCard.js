// components\FlashCard\FlashCard.js

import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";
import { useFlipHint } from "@/hooks/useFlipHint";
import FlashCardFooter from "@/components/FlashCard/FlashCardFooter";

/* Styling */
const CardFront = styled.article`
  border: 3px solid var(--color-primary);
  border-radius: 12px;
  overflow: hidden;
  background: #d1fcff;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const CardBack = styled.article`
  border: 3px solid var(--color-primary);
  border-radius: 12px;
  overflow: hidden;
  background: #d1ffd3;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const CardHeader = styled.div`
  background: var(--color-primary);
  padding: 5px 15px;
`;

const CollectionTitle = styled.h2`
  color: var(--text-color-light);
  font-size: 1rem;
  line-height: 1.2;
`;

const CardBody = styled.div`
  padding: 10px;
  min-height: 120px;
`;
const Question = styled.h3`
  color: #000;
  font-size: 1rem;
  line-height: 1.2;
`;
const Answer = styled.h3`
  color: var(--text-color-dark);
  font-size: 1rem;
  line-height: 1.2;
`;
const Label = styled.p`
  color: var(--text-color-dark);
  font-size: 0.7rem;
  line-height: 0;
`;

export default function FlashCard({ flashcard }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // globaler im localstorage gespeicherter state
  // showHint = boolean - bei true wird hint angezeigt sonst nichtl
  // markFirstFlip = setzt einmalig "hasFlipped" auf true (global)
  const { showHint, markFirstFlip } = useFlipHint();

  function flipCard() {
    markFirstFlip(); // funktionsaufruf -> info: es wurde geflippt
    setIsFlipped((prev) => !prev); // card flippen (prev wird umgedreht true/false)
  }

  return (
    <ReactCardFlip
      flipDirection="horizontal"
      flipSpeedBackToFront="0.4"
      flipSpeedFrontToBack="0.4"
      isFlipped={isFlipped}
    >
      {/* FRONT */}
      <CardFront onClick={flipCard}>
        <CardHeader>
          <CollectionTitle>{flashcard.collection}</CollectionTitle>
        </CardHeader>
        <CardBody>
          <Label>Question</Label>
          <Question>{flashcard.question}</Question>
        </CardBody>
        <FlashCardFooter showHint={showHint} text="Tap to show answer" />
      </CardFront>

      {/* BACK */}
      <CardBack onClick={flipCard}>
        <CardHeader>
          <CollectionTitle>{flashcard.collection}</CollectionTitle>
        </CardHeader>
        <CardBody>
          <Label>Answer</Label>
          <Answer>{flashcard.answer}</Answer>
        </CardBody>
        <FlashCardFooter showHint={showHint} text="Tap to show question" />
      </CardBack>
    </ReactCardFlip>
  );
}
