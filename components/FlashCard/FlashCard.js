// components/FlashCard/FlashCard.js

import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";
import { useFlipHint } from "@/hooks/useFlipHint";
import FlashCardFooter from "@/components/FlashCard/FlashCardFooter";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "../Bookmarks/bookmarks";

/* hexcolor in rgb color umwandeln */
const hexToRgba = (hex, alpha = 0.7) => {
  const redHex = hex.slice(1, 3); // extract 12----
  const greenHex = hex.slice(3, 5); // extract --34--
  const blueHex = hex.slice(5, 7); // extract ----56

  // Hexadezimal (String) in Binärzahl (number) umwandeln
  const red = parseInt(redHex, 16);
  const green = parseInt(greenHex, 16);
  const blue = parseInt(blueHex, 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const CardFront = styled.article`
  background: ${(props) =>
    hexToRgba(props.$color, 0.5) || "var(--color-primary)"};
  border-radius: 12px;
  overflow: hidden;
  margin-top: 10px;
  padding: 0 10px 0 10px;
  min-width: 300px;

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
  min-width: 300px;

  &:hover {
    cursor: pointer;
  }
`;

const CollectionTitle = styled.h2`
  color: var(--text-color-light);
  font-family: var(--font-family);
  font-size: 1rem;
  line-height: 1.2;
`;

const CardBody = styled.div`
  padding: 5px 12px 12px 12px;
  min-height: 200px;
  background: rgb(255, 255, 255, 0.7);
  border-radius: 12px;
  text-align: left;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

const Question = styled.h3`
  display: inline;
  font-size: 1.2rem;
  line-height: 1.2;
`;

const Answer = styled.h3`
  display: inline;
  font-size: 1.2rem;
  line-height: 1.2;
`;

const Label = styled.p`
  color: var(--text-color-dark);
  font-size: 1rem;
  line-height: 1;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0 0 5px;
`;
const HeaderStyling = styled.div`
  display: flex;
  gap: 6px;
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

const EditIcon = styled(FontAwesomeIcon)`
  width: 30px;
  height: 30px;
  max-width: none;
  flex: 0 0 auto;
`;
const TrashIcon = styled(FontAwesomeIcon)`
  width: 25px;
  height: 25px;
  color: red;
  max-width: none;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
`;
const ReallyText = styled.p`
  background-color: transparent;
  border: none;
  color: var(--color-accent);
`;
const CancelButton = styled.button`
  margin: 10px 0;
  background-color: transparent;
  padding: 0;
  font-size: 20px;
`;
const ConfirmButton = styled.button`
  margin: 10px 0;
  background-color: transparent;
  font-size: 20px;
  padding: 0;
`;

export default function FlashCard({
  flashcard,
  onToggleBookmark,
  isBookmarked,
  onShowAnswer,
  showActions = true,
  onDelete,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const id = flashcard._id;
  const { showHint, markFirstFlip } = useFlipHint();

  function flipCard() {
    markFirstFlip();
    setIsFlipped((prev) => !prev);
  }

  useEffect(() => {
    if (isFlipped) {
      onShowAnswer?.();
    }
  }, [isFlipped, onShowAnswer]);

  const handleDelete = async (event) => {
    event.stopPropagation();
    const response = await fetch(`/api/flashcards/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      onDelete("success");
    } else {
      onDelete("error");
    }
  };
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
          {showActions && (
            <HeaderStyling>
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  setConfirm(!confirm);
                }}
              >
                <TrashIcon icon={faTrash} aria-hidden="true" />
              </Button>
              {confirm && (
                <>
                  <ReallyText arila-label="Really?">Really?</ReallyText>
                  <CancelButton
                    onClick={(event) => {
                      event.stopPropagation();
                      setConfirm(false);
                    }}
                    arial-label="Cancel"
                  >
                    ❌
                  </CancelButton>
                  <ConfirmButton onClick={handleDelete}>✅</ConfirmButton>
                </>
              )}

              <StyledLink
                href={`/flashcards/${flashcard._id}`}
                onClick={(e) => e.stopPropagation()}
                aria-label="Edit flashcard"
              >
                <EditIcon icon={faEdit} aria-hidden="true" />
              </StyledLink>
              <BookmarkButton
                id={flashcard._id}
                isBookmarked={isBookmarked}
                onToggleBookmark={onToggleBookmark}
                aria-label="Bookmark Button"
              />
            </HeaderStyling>
          )}
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
          {showActions && (
            <BookmarkButton
              id={flashcard._id}
              isBookmarked={isBookmarked}
              onToggleBookmark={onToggleBookmark}
            />
          )}
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
