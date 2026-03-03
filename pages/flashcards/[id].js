// pages\flashcards\[id].js

import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import FlashCardForm from "@/components/FlashCardForm/FlashCardForm";

const PageTitle = styled.h1`
  padding: 0;
`;
const FeedbackMessage = styled.p`
  background: rgba(0, 200, 120, 0.5);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  padding: 10px 14px;
  border-radius: 16px;
  margin: 10px 0 6px;
`;

export default function FlashCardDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // nur fetchen wenn route 'id' existiet, sonst gib 'null' weiter
  const flashcardUrl = id ? `/api/flashcards/${id}` : null;
  const { data, error, isLoading } = useSWR(flashcardUrl);

  if (error) {
    return (
      <>
        <PageTitle>Edit Card</PageTitle>
        <FeedbackMessage role="alert">Error loading flashcard.</FeedbackMessage>
      </>
    );
  }
  if (isLoading || !id) {
    return (
      <>
        <PageTitle>Edit Card</PageTitle>
        <FeedbackMessage role="status" aria-live="polite">
          Loading data... Please wait...
        </FeedbackMessage>
      </>
    );
  }
  if (!data) {
    return (
      <>
        <PageTitle>Edit Card</PageTitle>
        <FeedbackMessage role="status" aria-live="polite">
          FlashCard not found.
        </FeedbackMessage>
      </>
    );
  }

  async function handleUpdate(updatedData) {
    const result = await fetch(`/api/flashcards/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!result.ok) {
      throw new Error("Could not update flashcard.");
    }

    router.push("/flashcards");
  }

  return (
    <>
      <PageTitle>Edit Card</PageTitle>

      <FlashCardForm
        initialData={data}
        onSubmit={handleUpdate}
        submitLabel="Update Card"
        onCancel={() => router.push("/flashcards")}
      />
    </>
  );
}

FlashCardDetailPage.meta = {
  title: "Edit Card",
  description: "Edit card details.",
};
