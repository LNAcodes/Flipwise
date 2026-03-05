//utils/quizHelpers.js
export function getRandomQuizCards(allCards) {
  if (!allCards || allCards.length < 10) {
    return null;
  }
  const shuffled = [...allCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
}

export function getCollectionQuizCards(allCards, collectionName) {
  if (!allCards || collectionName) return null;
  const filtered = allCards.filter(
    (card) => card.collection === collectionName
  );
  return [...filtered].sort(() => 0.5 - Math.random());
}
