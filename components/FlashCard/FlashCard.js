// components/FlashCard/FlashCard.js

import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";
import { useFlipHint } from "@/hooks/useFlipHint";
import FlashCardFooter from "@/components/FlashCard/FlashCardFooter";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-primary);
  padding: 5px 0 5px 10px;
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

const StyledLink = styled(Link)`
  gap: 6px;
  padding: 10px;
  text-align: center;
  color: #fff;
  text-decoration: none;
  min-height: 44px;

  &:hover {
    color: var(--color-accent);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  width: 20px;
  height: 20px;
  max-width: none;
  flex: 0 0 auto;
`;

export default function FlashCard({ flashcard }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { showHint, markFirstFlip } = useFlipHint();

  function flipCard() {
    markFirstFlip();
    setIsFlipped((prev) => !prev);
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

          <StyledLink
            href={`/flashcards/${flashcard._id}`}
            onClick={(e) => e.stopPropagation()}
            aria-label="Edit flashcard"
          >
            <Icon icon={faEdit} aria-hidden="true" />
          </StyledLink>
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

          {/* optional: Edit auch auf der Rückseite */}
          <StyledLink
            href={`/flashcards/${flashcard._id}`}
            onClick={(e) => e.stopPropagation()}
            aria-label="Edit flashcard"
          >
            <Icon icon={faEdit} aria-hidden="true" />
          </StyledLink>
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
