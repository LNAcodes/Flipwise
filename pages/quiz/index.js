// pages/quiz/index.js

import styled from "styled-components";

const PageTitle = styled.h1`
  padding: 0;
`;

export default function QuizPage() {
  return (
    <>
      <PageTitle>Quiz</PageTitle>
    </>
  );
}

QuizPage.meta = {
  title: "Quiz",
  description: "Start quiz and learn cards.",
};
