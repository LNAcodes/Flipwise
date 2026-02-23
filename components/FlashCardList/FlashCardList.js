// components\FlashCardList\FlashCardList.js

import { useState } from "react";
import styled from "styled-components";
import FlashCard from "../FlashCard/FlashCard";

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin: 0 0 20px 0;
`;

export default function FlashCardList({ flashcards = [] }) {
  const [showFlipHint, setShowFlipHint] = useState(true);

  const handleFirstFlip = () => {
    setShowFlipHint(false);
  };

  return (
    <List>
      {flashcards.map((flashcard) => (
        <ListItem key={flashcard._id}>
          <FlashCard
            flashcard={flashcard}
            showFlipHint={showFlipHint}
            onFirstFlip={handleFirstFlip}
          />
        </ListItem>
      ))}
    </List>
  );
}
