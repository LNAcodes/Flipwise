//utils/bookmarkHelpers.js
const STORAGE_KEY = "flipwise:bookmarks";

// load Ids
export function loadBookmarks() {
  const storedIds = localStorage.getItem(STORAGE_KEY);
  return storedIds ? JSON.parse(storedIds) : [];
}

// save complete List
export function saveBookmarkIds(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

// remove or delete
export function toggleBookmark(id) {
  const currentIds = loadBookmarks();

  if (currentIds.includes(id)) {
    const newIds = currentIds.filter((bookmarkId) => bookmarkId !== id);
    saveBookmarkIds(newIds);
    return newIds;
  } else {
    const newIds = [...currentIds, id];
    saveBookmarkIds(newIds);
    return newIds;
  }
}
