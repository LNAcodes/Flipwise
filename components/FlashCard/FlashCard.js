// components/FlashCard/FlashCard.js

import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";
import { useFlipHint } from "@/hooks/useFlipHint";
import FlashCardFooter from "@/components/FlashCard/FlashCardFooter";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

/* hexcolor in rgb color umwandeln */
const hexToRgba = (hex, alpha = 0.7) => {
  const rgb = hex.replace("#", "");
  const red = parseInt(rgb.slice(0, 2), 16);
  const green = parseInt(rgb.slice(2, 4), 16);
  const blue = parseInt(rgb.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const CardFront = styled.article`
  background: ${(props) =>
    hexToRgba(props.$color, 0.5) || "var(--color-primary)"};
  /* border: 3px solid ${(props) => props.$color || "var(--color-primary)"}; */
  border-radius: 12px;
  overflow: hidden;
  margin-top: 10px;
  padding: 0 10px 0 10px;

  &:hover {
    cursor: pointer;
  }
`;

const CardBack = styled.article`
  background: ${(props) =>
    hexToRgba(props.$color, 0.5) || "var(--color-primary)"};
  border-radius: 12px;
  overflow: hidden;
  margin-top: 10px;
  padding: 0 10px 0 10px;

  &:hover {
    cursor: pointer;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0 0 5px;
`;

const CollectionTitle = styled.h2`
  color: var(--text-color-light);
  font-size: 1rem;
  line-height: 1.2;
`;

const CardBody = styled.div`
  padding: 5px 12px 12px 12px;
  min-height: 150px;
  background: rgb(255, 255, 255, 0.7);
  border-radius: 12px;
  text-align: left;
`;

const Question = styled.h3`
  display: inline;
  font-size: 1.3rem;
  line-height: 1.2;
`;

const Answer = styled.h3`
  font-size: 1rem;
  line-height: 1.2;
`;

const Label = styled.p`
  color: var(--text-color-dark);
  font-size: 1rem;
  line-height: 1;
`;

const StyledLink = styled(Link)`
  gap: 6px;
  padding: 10px 5px 10px 10px;
  text-align: center;
  color: #fff;
  text-decoration: none;
  min-height: 44px;

  &:hover {
    color: var(--color-accent);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  width: 15px;
  height: 15px;
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
      <CardFront $color={flashcard.color} onClick={flipCard}>
        <CardHeader $color={flashcard.color}>
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
      <CardBack $color={flashcard.color} onClick={flipCard}>
        <CardHeader $color={flashcard.color}>
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
