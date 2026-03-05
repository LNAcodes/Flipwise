// components\FlashCardList\FlashCardList.js

import styled from "styled-components";
import { useState } from "react";
import FlashCard from "@/components/FlashCard/FlashCard";
import useSWR from "swr";
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

const Button = styled.button`
  background-color: var(--color-primary);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  color: var(--text-color-light);
  font-size: 1.2rem;
  height: 60px;
  padding: 5px 60px;
  margin: 20px;
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
  margin: 10px 0 6px;
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
            No flashcards yet... add one to start the quiz.
          </FeedbackMessage>
          <Button type="button" onClick={() => router.push("/add-card")}>
            Add a new flashcard
          </Button>
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
