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
  const { mutate } = useSWR("/api/flashcards");
  const {
    data: flashcards,
    error: cardsError,
    isLoading: cardsLoading,
  } = useSWR("/api/flashcards");
  const {
    data: collections,
    error: collectionsError,
    isLoading: collectionsLoading,
  } = useSWR("/api/collections");

  if (cardsError || collectionsError) return <p>Error loading</p>;
  if (cardsLoading || collectionsLoading)
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

  async function handleAddCard(flashcards) {
    const newFlashcard = { ...flashcards, _id: crypto.randomUUID() };
    mutate((prev) => [newFlashcard, ...prev], false);

    const result = await fetch("/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flashcards),
    });

    if (!result.ok) {
      throw new Error("Could not create flashcard.");
    }
    // lade die liste neu
    await mutate();
  }

  return (
    <main>
      <Title>Homepage</Title>

      <FlashCardForm
        title="Add a new Card"
        submitLabel="Add Card"
        onSubmit={handleAddCard}
        cancelLabel="Cancel"
        resetOnSuccess
      />
      <FlashCardList flashcards={enrichedFlashcards} />
    </main>
  );
}
