import styled from "styled-components";
import FlashCard from "../FlashCard/FlashCard";

const ListItem = styled.li`
  margin: 0;
`;

export default function FlashCardList({ flashcards }) {
  return (
    <List>
      {flashcards.map((flashcard) => (
        <ListItem key={flashcard._id}>
          <FlashCard flashcard={flashcard} />
        </ListItem>
      ))}
    </List>
  );
}
