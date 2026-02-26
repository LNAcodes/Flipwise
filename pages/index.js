// pages\index.js

import FlashCardForm from "@/components/FlashCardForm/FlashCardForm";
import FlashCardList from "@/components/FlashCardList/FlashCardList";
import styled from "styled-components";
import useSWR from "swr";
import { useSWRConfig } from "swr";

const Title = styled.h1`
  color: #000;
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 30px;
`;

export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/flashcards");
  const { mutate } = useSWRConfig();

  if (error) return <p>Error loading</p>;
  if (isLoading) return <p>Loading data... Please wait...</p>;

  async function handleAddCard(data) {
    const result = await fetch("/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!result.ok) {
      throw new Error("Could not create flashcard.");
    }
    // lade die liste neu
    await mutate("/api/flashcards");
  }

  return (
    <main>
      <Title>Homepage</Title>
      <FlashCardForm
        title="Add a new flashcard"
        submitLabel="Add flashcard"
        onSubmit={handleAddCard}
        cancelLabel="Cancel"
        resetOnSuccess
      />
      <FlashCardList flashcards={data} />
    </main>
  );
}
