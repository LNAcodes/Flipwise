//utils/quizHelpers.js
export function getRandomQuizCards(allCards, amountOfCards) {
  if (!allCards || allCards.length < amountOfCards) {
    throw new Error(
      `Invalid Quiz Setup: Expected at least ${amountOfCards} cards, but got ${allCards?.length || 0}.`
    );
  }
  const shuffled = [...allCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, amountOfCards);
}

export function getCollectionQuizCards(allCards, collectionName) {
  if (!allCards || !collectionName) {
    throw new Error(`getCollectionQuizCards: Missing data or collectionname!`);
  }
  const filtered = allCards.filter(
    (card) => card.collection === collectionName
  );
  return [...filtered].sort(() => 0.5 - Math.random());
}
