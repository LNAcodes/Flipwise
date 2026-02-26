// pages\index.js

import FlashCardForm from "@/components/FlashCardForm/FlashCardForm";
import FlashCardList from "@/components/FlashCardList/FlashCardList";
import styled from "styled-components";
import useSWR from "swr";

const Title = styled.h1`
  color: #000;
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 30px;
`;

export default function HomePage() {
  const {
    data: flashcards,
    error: errorCards,
    isLoading: loadingCards,
  } = useSWR("/api/flashcards");
  const {
    data: collections,
    error: erroColls,
    isLoading: loadingColls,
  } = useSWR("/api/collections");

  if (errorCards || erroColls) return <p>Error loading</p>;
  if (loadingCards || loadingColls)
    return <p>Loading data... Please wait...</p>;
  const enrichedFlashcards = flashcards.map((card) => {
    const matchingCollection = collections.find(
      (col) => col.name === card.collection
    );
    return {
      ...card,
      color: matchingCollection ? matchingCollection.color : "#defaultColor#",
    };
  });

  return (
    <main>
      <Title>Homepage</Title>
      <FlashCardForm />
      <FlashCardList flashcards={enrichedFlashcards} />
    </main>
  );
}
