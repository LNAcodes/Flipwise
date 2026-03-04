// pages/flashcards/index.js

import useSWR from "swr";
import FlashCardList from "@/components/FlashCardList/FlashCardList";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { loadBookmarks, toggleBookmark } from "@/utils/bookmarkHelpers";
const PageTitle = styled.h1`
  padding: 0;
`;
const Message = styled.h2`
  color: #f10707;
  font-size: 20px;
`;
export default function FlashcardsPage() {
  const {
    data: flashcards,
    error: cardsError,
    isLoading: cardsLoading,
  } = useSWR("/api/flashcards");
  const {
    data: collections,
    error: collectionsError,
    isLoading: colectionsLoading,
  } = useSWR("/api/collections");

  const [bookmarkIds, setBookmarkIds] = useState([]);
  useEffect(() => {
    const initialBookmarks = loadBookmarks();
    setBookmarkIds(initialBookmarks);
  }, []);
  function handleToggleBookmark(id) {
    const updateBookmarks = toggleBookmark(id);
    setBookmarkIds(updateBookmarks);
  }
  if (cardsError || collectionsError) return <p>Error loading</p>;
  if (cardsLoading || colectionsLoading)
    return <p>Loading data... Please wait...</p>;
  const enrichedFlashcards = flashcards.map((card) => {
    const matchingCollection = collections.find(
      (col) => col.name === card.collection
    );

    return {
      ...card,
      color: matchingCollection ? matchingCollection.color : "#defaultColor#",
    };
  });
  const bookmarkedCards = enrichedFlashcards.filter((card) =>
    bookmarkIds.includes(card._id)
  );

  return (
    <>
      <PageTitle>Bookmark List</PageTitle>
      {bookmarkedCards.length === 0 && (
        <Message aria-live="polite">There are no Bookmarks yet!</Message>
      )}
      <FlashCardList
        flashcards={bookmarkedCards}
        bookmarkIds={bookmarkIds}
        onToggleBookmark={handleToggleBookmark}
      />
    </>
  );
}

FlashcardsPage.meta = {
  title: "Bookmark List",
  description: "A list of all my bookmarked cards.",
};
