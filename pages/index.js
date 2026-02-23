// pages\index.js

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
  const { data, error, isLoading } = useSWR("/api/flashcards");
  if (error) return <p>Error loading</p>;
  if (isLoading) return <p>Loading data... Please wait...</p>;

  return (
    <main>
      <Title>Homepage</Title>
      <FlashCardList flashcards={data} />
    </main>
  );
}
