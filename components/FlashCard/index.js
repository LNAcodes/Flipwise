import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";

const CardWrapper = styled.div`
  cursor: pointer;
  width: 320px;
`;

const CardFace = styled.div`
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  user-select: none;
`;

const FrontFace = styled(CardFace)`
  background-color: #80c9a4;
`;

const BackFace = styled(CardFace)`
  background-color: #4caf50;
`;

const Label = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
`;

const Content = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  min-height: 100px;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const FlipHint = styled.span`
  text-align: center;
  font-size: 0.85rem;
  color: #fff;
`;

export default function FlashCard({ question, answer }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function toggleFlip() {
    setIsFlipped((prev) => !prev);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFlip();
    }
  }

  return (
    <CardWrapper
      onClick={toggleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={isFlipped ? "Flip flashcard to show question" : "Flip flashcard to show answer"}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <FrontFace>
          <Label>Question</Label>
          <Content>{question}</Content>
          <FlipHint>Flip to show answer ↩</FlipHint>
        </FrontFace>
        <BackFace>
          <Label>Answer</Label>
          <Content>{answer}</Content>
          <FlipHint>Flip to show question ↩</FlipHint>
        </BackFace>
      </ReactCardFlip>
    </CardWrapper>
  );
}
