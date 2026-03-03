// pages\flashcards\[id].js

import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import FlashCardForm from "@/components/FlashCardForm/FlashCardForm";

const PageTitle = styled.h1`
  padding: 0;
`;

export default function FlashCardDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // nur fetchen wenn route 'id' existiet, sonst gib 'null' weiter
  const flashcardUrl = id ? `/api/flashcards/${id}` : null;
  const { data, error, isLoading } = useSWR(flashcardUrl);

  if (error) return <p>Error loading</p>;
  if (isLoading || !id) return <p>Loading data... Please wait...</p>;
  if (!data) return <h1>FlashCard not found</h1>;

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
