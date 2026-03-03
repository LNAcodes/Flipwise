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

const Message = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
`;

export default function FlashCardList({ flashcards = [] }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      {flashcards.map((flashcard) => (
        <ListItem key={flashcard._id}>
          <FlashCard flashcard={flashcard} />
        </ListItem>
      ))}
    </List>
  );
}
