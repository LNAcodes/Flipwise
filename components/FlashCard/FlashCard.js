// components\FlashCard\FlashCard.js

import styled from "styled-components";

/* Styling */
const Card = styled.article`
  border: 3px solid #287895;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  margin-top: 10px;
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;
const CardHeader = styled.div`
  background: #287895;
  padding: 5px 15px;
`;
const CardFront = styled.div`
  padding: 10px;
`;
const CardBack = styled.div`
  display: none;
  padding: 10px;
`;
const CollectionTitle = styled.h2`
  color: #ffffff;
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
  color: #000;
  font-size: 1rem;
  line-height: 1.2;
`;
const Label = styled.p`
  color: #000;
  font-size: 0.7rem;
  line-height: 0;
`;

export default function FlashCard() {
  const flashCard = {
    _id: {
      $oid: "682206a36367c154943a90ae",
    },
    collection: "Biology",
    question: "What is the process by which plants make their food?",
    answer: "Photosynthesis",
  };
  console.log(flashCard);

  return (
    <Card>
      <CardHeader>
        <CollectionTitle>{flashCard.collection}</CollectionTitle>
      </CardHeader>
      <CardFront>
        <Label>Question</Label>
        <Question>{flashCard.question}</Question>
        <Label>Answer</Label>
        <Answer>{flashCard.answer}</Answer>
      </CardFront>
      <CardBack>
        <CollectionTitle>{flashCard.collection}</CollectionTitle>
        <Label>Answer</Label>
        <Answer>{flashCard.answer}</Answer>
      </CardBack>
    </Card>
  );
}
