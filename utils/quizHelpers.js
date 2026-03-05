//utils/quizHelpers.js
export function getRandomQuizCards(allCards, amountOfCards) {
  if (!allCards || allCards.length < amountOfCards) {
    return null;
  }
  const shuffled = [...allCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, amountOfCards);
}

export function getCollectionQuizCards(allCards, collectionName) {
  if (!allCards || !collectionName) return null;
  const filtered = allCards.filter(
    (card) => card.collection === collectionName
  );
  return [...filtered].sort(() => 0.5 - Math.random());
}
