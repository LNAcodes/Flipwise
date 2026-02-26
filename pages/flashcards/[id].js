// pages\flashcards\[id].js

import useSWR from "swr";
import { useRouter } from "next/router";
import FlashCardForm from "@/components/FlashCardForm/FlashCardForm";

export default function FlashCardDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // nur fetchen wenn route 'id' existiet, sonst gib 'null' weiter
  const flashcardUrl = id ? `/api/flashcards/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR(flashcardUrl);

  if (error) return <p>Error loading</p>;
  if (isLoading || !id) return <p>Loading data... Please wait...</p>;
  if (!data) return <h1>FlashCard not found</h1>;

  async function handleUpdate(updatedData) {
    const result = await fetch(`/api/flashcards/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!result.ok) return;

    const updated = await result.json();
    mutate(updated, false);

    router.push("/flashcards");
  }

  return (
    <main>
      <h1>Edit FlashCard</h1>
      <FlashCardForm
        initialData={data}
        onSubmit={handleUpdate}
        submitLabel="Update card"
        onCancel={() => router.push("/flashcards")}
      />
    </main>
  );
}
