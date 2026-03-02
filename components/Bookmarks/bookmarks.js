//components/Bookmarks/bookmarks.js
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  width: 20px;
  height: 20px;
  font-size: 24px;
  &:hover {
    transform: scale(1.3);
  }
`;

export default function BookmarkButton({ onToggleBookmark, isBookmarked, id }) {
  return (
    <Button type="button" onClick={() => onToggleBookmark(id)}>
      {isFavorite ? "👁️‍🗨️" : "🗨️"}
    </Button>
  );
}
