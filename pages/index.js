// pages\index.js

import FlashCard from "@/components/FlashCard/FlashCard";
import styled from "styled-components";
import useSWR from "swr";

const Title = styled.h1`
  color: #000;
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 30px;
`;

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/flashcards", fetcher);
  if (error) return <p>Fehler beim Laden</p>;
  if (isLoading) return <p>Lade Daten...Bitte warten...</p>;

  return (
    <main>
      <Title>Homepage</Title>
      <FlashCard />
    </main>
  );
}
