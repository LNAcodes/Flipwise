//components/Bookmarks/bookmarks.js

import { faEye as faEyeSolid } from "@fortawesome/free-solid-svg-icons";
import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  width: 30px;

  font-size: 30px;
  //Test here: marked = black, unmarked = white
  color: ${({ $isBookmarked }) =>
    $isBookmarked ? "var(--color-accent)" : "#fff"};

  &:hover {
    transform: scale(1.2);
  }
`;

export default function BookmarkButton({ onToggleBookmark, isBookmarked, id }) {
  return (
    <Button
      type="button"
      $isBookmarked={isBookmarked}
      onClick={(event) => {
        event.stopPropagation();
        onToggleBookmark(id);
      }}
      aria-label={isBookmarked ? "Remove Bookmark" : " Add Bookmark"}
    >
      <Icon
        icon={isBookmarked ? faEyeSolid : faEyeRegular}
        aria-hidden="true"
      />
    </Button>
  );
}
