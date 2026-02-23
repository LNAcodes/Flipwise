// pages\index.js

import FlashCard from "@/components/FlashCard/FlashCard";
import styled from "styled-components";

const Title = styled.h1`
  color: #000;
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 30px;
`;

export default function HomePage() {
  return (
    <main>
      <Title>Homepage</Title>
      <FlashCard />
    </main>
  );
}
