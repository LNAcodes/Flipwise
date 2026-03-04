// components\FlashCardList\FlashCardList.js

import styled from "styled-components";

import Link from "next/link";
import FlashCard from "@/components/FlashCard/FlashCard";

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin: 0 0 20px 0;
`;

export default function FlashCardList({
  flashcards = [],
  bookmarkIds = [],
  onToggleBookmark,
}) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const Message = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
  `;

  function handleDeleteResult(status) {
    if (status === "success") {
      mutate();
      setSuccessMessage("Flashcard successfully deleted.");
      setErrorMessage(null);
    } else {
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage(null);
    }
  }

  return (
    <List>
      {flashcards.map((flashCard) => {
        const isBookmarked = bookmarkIds.includes(flashCard._id);

        return (
          <ListItem key={flashCard._id}>
            <FlashCard
              flashcard={flashCard}
              isBookmarked={isBookmarked}
              onToggleBookmark={onToggleBookmark}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
