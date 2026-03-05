// components\FlashCardList\FlashCardList.js

import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import FlashCard from "@/components/FlashCard/FlashCard";
import useSWR from "swr";

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

const EmptyState = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const EmptyStateLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
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
          <EmptyState>There are no flashcards yet.</EmptyState>
          <EmptyStateLink href="/add-card">Add a new flashcard</EmptyStateLink>
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
                onDelete={onDelete}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
