// components\FlashCardList\FlashCardList.js

import styled from "styled-components";
import { useState } from "react";
import FlashCard from "@/components/FlashCard/FlashCard";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin: 0 0 20px 0;
`;

const Message = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background: ${(props) => (props.$type === "success" ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.$type === "success" ? "#155724" : "#721c24")};
`;

const StyledLink = styled(Link)`
  background-color: var(--color-primary);
  border: none;
  border-radius: 30px;
  display: block;
  cursor: pointer;
  color: var(--text-color-light);
  font-size: 1.2rem;
  height: 60px;
  padding: 15px 60px;
  margin: 20px 0 20px 0;
  text-decoration: none;
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
  margin: 20px 0 20px 0;
  min-width: 300px;
`;

export default function FlashCardList({
  flashcards = [],
  bookmarkIds = [],
  onToggleBookmark,
  onShowAnswer,
  showActions = true,
  onDelete,
}) {
  const { mutate } = useSWR("/api/flashcards");
  const [message, setMessage] = useState(null);
  const router = useRouter();

  function handleDeleteResult(status) {
    if (status === "success") {
      mutate();
      setMessage({ text: "Flashcard successfully deleted.", type: "success" });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({
        text: "Something went wrong. Please try again.",
        type: "error",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  }

  return (
    <>
      {message && <Message $type={message.type}>{message.text}</Message>}
      {flashcards.length === 0 && (
        <>
          <FeedbackMessage role="status">
            No flashcards yet... start to add one.
          </FeedbackMessage>
          <StyledLink href="/add-card">Add a new flashcard</StyledLink>
        </>
      )}
      <List>
        {flashcards.map((flashCard) => {
          const isBookmarked = bookmarkIds.includes(flashCard._id);
          return (
            <ListItem key={flashCard._id}>
              <FlashCard
                flashcard={flashCard}
                isBookmarked={isBookmarked}
                onToggleBookmark={onToggleBookmark}
                onShowAnswer={onShowAnswer}
                showActions={showActions}
                onDelete={onDelete ?? handleDeleteResult}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
