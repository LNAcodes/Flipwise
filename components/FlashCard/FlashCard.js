// components\FlashCard\FlashCard.js

import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";

/* Styling */
const Card = styled.article`
  border: 3px solid var(--color-primary);
  border-radius: 12px;
  overflow: hidden;
  background: white;
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

const CardFooter = styled.div`
  display: flex;
  justify-content: center;
  background: var(--color-primary);
  padding: 5px 15px;
`;
const Hint = styled.p`
  color: var(--text-color-light);
  font-size: 0.9rem;
  line-height: 0;
`;

export default function FlashCard({ flashcard, showFlipHint, onFirstFlip }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function flipCard() {
    if (showFlipHint) onFirstFlip?.();
    setIsFlipped((prev) => !prev);
  }

  return (
    <ReactCardFlip
      flipDirection="horizontal"
      flipSpeedBackToFront="0.4"
      flipSpeedFrontToBack="0.4"
      isFlipped={isFlipped}
    >
      <Card onClick={flipCard}>
        <CardHeader>
          <CollectionTitle>{flashcard.collection}</CollectionTitle>
        </CardHeader>
        <CardBody>
          <Label>Question</Label>
          <Question>{flashcard.question}</Question>
        </CardBody>
        <CardFooter>
          {showFlipHint && <Hint> 💡 Tap to show answer</Hint>}
        </CardFooter>
      </Card>
      <Card onClick={flipCard}>
        <CardHeader>
          <CollectionTitle>{flashcard.collection}</CollectionTitle>
        </CardHeader>
        <CardBody>
          <Label>Answer</Label>
          <Answer>{flashcard.answer}</Answer>
        </CardBody>
        <CardFooter>
          {showFlipHint && <Hint>💡 Tap to show question</Hint>}
        </CardFooter>
      </Card>
    </ReactCardFlip>
  );
}
