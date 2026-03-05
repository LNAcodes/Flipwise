//components/QuizSetup/index.js
import {
  getRandomQuizCards,
  getCollectionQuizCards,
} from "@/utils/quizHelpers";

/* const Message = styled.h2`
  color: #f10707;
  font-size: 20px;
`; */
console.log("Dateitest: QUizSetup wurde geladen!");

export default function QuizSetup({ allCards }) {
  console.log("Alle Karten:", allCards);
  console.log("Zufall 10:", getRandomQuizCards(allCards));
  console.log("Collection 'React':", getCollectionQuizCards(allCards, "React"));

  return <div>Setup View (Coming Soon)</div>;
  /* const quizCards = getRandomQuizCards(allCards);

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
  ); */
}
