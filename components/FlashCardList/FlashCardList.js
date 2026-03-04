// components\FlashCardList\FlashCardList.js

import styled from "styled-components";
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
  onShowAnswer,
}) {
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
              onShowAnswer={onShowAnswer}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
