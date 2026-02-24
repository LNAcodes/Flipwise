// components\FlashCardList\FlashCardList.js

import styled from "styled-components";
import FlashCard from "@/components/FlashCard/FlashCard";
import { useFlipHint } from "@/hooks/useFlipHint";

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin: 0 0 20px 0;
`;

export default function FlashCardList({ flashcards = [] }) {
  const { showHint, markFirstFlip } = useFlipHint();

  return (
    <List>
      {flashcards.map((flashcard) => (
        <ListItem key={flashcard._id}>
          <FlashCard
            flashcard={flashcard}
            showFlipHint={showHint}
            onFirstFlip={markFirstFlip}
          />
        </ListItem>
      ))}
    </List>
  );
}
