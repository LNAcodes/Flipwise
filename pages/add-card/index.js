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
    </>
  );
}

AddCardPage.meta = {
  title: "Add Card",
  description: "Add new card.",
};
