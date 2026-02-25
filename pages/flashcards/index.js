// pages/flashcards/index.js

import useSWR from "swr";
import FlashCardList from "@/components/FlashCardList/FlashCardList";

export default function FlashcardsPage() {
  const { data, error, isLoading } = useSWR("/api/flashcards");

  if (error) return <p>Error loading</p>;
  if (isLoading) return <p>Loading data... Please wait...</p>;

  return (
    <main>
      <h1>FlashCard List</h1>
      <FlashCardList flashcards={data} />
    </main>
  );
}
