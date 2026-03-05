//components/QuizSetup/index.js
import { getRandomQuizCards } from "@/utils/quizHelpers";

const Message = styled.h2`
  color: #f10707;
  font-size: 20px;
`;

export default function QuizSetup({ allCards }) {
  const quizCards = getRandomQuizCards(allCards);

  return (
    <>
      {!quizCards ? (
        <Message>
          Not enough cards available. Please add more to create a quiz with at
          least 10 cards.
        </Message>
      ) : (
        <button onClick={handleStart}>Start 10-Card-Quiz</button>
      )}
    </>
  );
}
