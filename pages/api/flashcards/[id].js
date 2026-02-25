import useSWR from "swr";
import { useRouter } from "next/router";
import FlashCardForm from "@/components/FlashCardForm/FlashCardForm";
import { useSWRConfig } from "swr";

export default function FlashCardDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR(
    id ? `/api/flashcards/${id}` : null
  );

  if (error) return <p>Error loading</p>;
  if (isLoading || !id) return <p>Loading data... Please wait...</p>;
  if (!data) return <h1>FlashCard not found</h1>;

  async function handleUpdate(updatedData) {
    const res = await fetch(`/api/flashcards/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) return;

    const updated = await res.json();
    mutate(`/api/flashcards/${id}`, updated, false);
    mutate("/api/flashcards");

    router.push("/flashcards");
  }

  return (
    <main>
      <h1>Edit FlashCard</h1>
      <FlashCardForm
        initialData={data}
        onSubmit={handleUpdate}
        submitLabel="Update card"
      />
    </main>
  );
}
