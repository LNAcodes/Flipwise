// pages\index.js

import FlashCardList from "@/components/FlashCardList/FlashCardList";
import styled from "styled-components";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Title = styled.h1`
  color: #000;
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 30px;
`;

export default function HomePage() {
  const { data, error } = useSWR("/api/flashcards", fetcher);

  if (error) return <p>Error loading flashcards.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <main>
      <Title>Homepage</Title>
      <FlashCardList flashcards={data} />
    </main>
  );
}
