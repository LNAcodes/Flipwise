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
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;
const CardHeader = styled.div`
  background: var(--color-primary);
  padding: 5px 15px;
`;
const CardBody = styled.div`
  padding: 10px;
`;
const CollectionTitle = styled.h2`
  color: var(--text-color-light);
  font-size: 1rem;
  line-height: 1.2;
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

  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  return (
    <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
      <Card onClick={flipCard}>
        <CardHeader>
          <CollectionTitle>{flashcard.collection}</CollectionTitle>
        </CardHeader>
        <CardBody>
          <Label>Question</Label>
          <Question>{flashcard.question}</Question>
        </CardBody>
      </Card>
      <Card onClick={flipCard}>
        <CardHeader>
          <CollectionTitle>{flashcard.collection}</CollectionTitle>
        </CardHeader>
        <CardBody>
          <Label>Answer</Label>
          <Answer>{flashcard.answer}</Answer>
        </CardBody>
      </Card>
    </ReactCardFlip>
  );
}
