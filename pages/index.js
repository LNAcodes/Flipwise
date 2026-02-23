import styled from "styled-components";
import FlashCard from "../components/FlashCard";

const flashcards = [
  {
    id: 1,
    question: "What is the powerhouse of the cell?",
    answer: "The mitochondrion.",
  },
  {
    id: 2,
    question: "What is the capital of France?",
    answer: "Paris.",
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    answer: "4.",
  },
];

const PageWrapper = styled.main`
  padding: 24px;
`;

const Title = styled.h1`
  font-family: system-ui, sans-serif;
  margin-bottom: 24px;
`;

const CardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default function HomePage() {
  return (
    <PageWrapper>
      <Title>Flipwise</Title>
      <CardList>
        {flashcards.map(({ id, question, answer }) => (
          <li key={id}>
            <FlashCard question={question} answer={answer} />
          </li>
        ))}
      </CardList>
    </PageWrapper>
  );
}
