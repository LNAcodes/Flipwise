//components/Bookmarks/bookmarks.js
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  width: 30px;
  height: 30px;
  font-size: 30px;

  &:hover {
    transform: scale(1.2);
  }
`;

export default function BookmarkButton({ onToggleBookmark, isBookmarked, id }) {
  return (
    <Button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onToggleBookmark(id);
      }}
    >
      {isBookmarked ? "👁️‍🗨️" : "🗨️"}
    </Button>
  );
}
