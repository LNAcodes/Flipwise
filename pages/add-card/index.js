// pages/add-card/index.js

import FlashCardForm from "@/components/FlashCardForm/FlashCardForm";
import FlashCardList from "@/components/FlashCardList/FlashCardList";
import styled from "styled-components";
import useSWR from "swr";

const PageTitle = styled.h1`
  padding: 0;
`;

export default function AddCardPage() {
  const { mutate } = useSWR("/api/flashcards");
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
    <>
      <PageTitle>Add Card</PageTitle>
      <FlashCardForm
        title="Add a new Card"
        submitLabel="Add Card"
        onSubmit={handleAddCard}
        cancelLabel="Cancel"
        resetOnSuccess
      />
      <FlashCardList flashcards={enrichedFlashcards} />
    </>
  );
}

AddCardPage.meta = {
  title: "Add Card",
  description: "Add new card.",
};
