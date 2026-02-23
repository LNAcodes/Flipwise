// components\FlashCard\FlashCard.js

import styled from "styled-components";

/* Styling */
const Card = styled.article`
  border: 3px solid var(--color-primary);
  border-radius: 12px;
  overflow: hidden;
  background: white;
  margin-top: 10px;
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;
const CardHeader = styled.div`
  background: var(--color-primary);
  padding: 5px 15px;
`;
const CardBody = styled.div`
  padding: 10px;
`;
const CollectionTitle = styled.h2`
  color: var(--text-color-light);
  font-size: 1rem;
  line-height: 1.2;
`;
const Question = styled.h3`
  color: #000;
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 30px;
`;
const Answer = styled.h3`
  color: var(--text-color-dark);
  font-size: 1rem;
  line-height: 1.2;
`;
const Label = styled.p`
  color: var(--text-color-dark);
  font-size: 0.7rem;
  line-height: 0;
`;

export default function FlashCard({ flashcard }) {
  return (
    <>
      <Card className="card">
        <CardHeader>
          <CollectionTitle>{flashcard.collection}</CollectionTitle>
        </CardHeader>
        <CardBody>
          <Label>Question</Label>
          <Question>{flashcard.question}</Question>
        </CardBody>
      </Card>
      <Card className="card card--back">
        <CardHeader>
          <CollectionTitle>{flashcard.collection}</CollectionTitle>
        </CardHeader>
        <CardBody>
          <CollectionTitle>{flashcard.collection}</CollectionTitle>
          <Label>Answer</Label>
          <Answer>{flashcard.answer}</Answer>
        </CardBody>
      </Card>
    </>
  );
}
