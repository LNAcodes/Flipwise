// components\FlashCard\FlashCard.js
import useSWR from "swr";
// components/FlashCard/FlashCard.js

import { useState } from "react";
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
  const hexString = hex.replace("#", ""); // entferne '#'

  const redHex = hexString.slice(0, 2); // extract 12----
  const greenHex = hexString.slice(2, 4); // extract --34--
  const blueHex = hexString.slice(4, 6); // extract ----56

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

  justify-content: space-between;
  padding: 5px 0 0 5px;
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

const Button = styled.button``;

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

export default function FlashCard({
  flashcard,
  onToggleBookmark,
  isBookmarked,
  id,
  onDelete,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { showHint, markFirstFlip } = useFlipHint();
  const id = flashcard._id;
  const { mutate } = useSWR("/api/flashcards");
  const [confirm, setConfirm] = useState(false);

  function flipCard() {
    if (confirm) return;
    markFirstFlip();
    setIsFlipped((prev) => !prev);
  }
  const handleDelete = async () => {
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
          <BookmarkButton
            id={flashcard._id}
            isBookmarked={isBookmarked}
            onToggleBookmark={onToggleBookmark}
          />
          <Button
            onClick={(event) => {
              event.stopPropagation();
              console.log("trash1 clicked, confirm state:", confirm);
              setConfirm(!confirm);
            }}
          >
            <Icon icon={faTrash} aria-hidden="true" />
          </Button>
          {confirm && (
            <>
              <Label>Are you sure?</Label>
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  setConfirm(false);
                  setSuccessMessage(true);
                  console.log("finally deleted");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleDelete}>Yes, delete Flashcard</Button>
            </>
          )}
          <StyledLink
            href={`/flashcards/${flashcard._id}`}
            onClick={(event) => event.stopPropagation()}
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
          <BookmarkButton
            id={flashcard._id}
            isBookmarked={isBookmarked}
            onToggleBookmark={onToggleBookmark}
          />
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
