// components\Navbar\Navbar.js

import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faListUl,
  faPlusCircle,
  faPlay,
  faBookmark,
  faUser,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  height: 50px;
`;

const Item = styled.li`
  padding: 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: 100%;
  padding: 0;
  text-align: center;
  color: var(--nav-inactive);
  text-decoration: none;
  min-height: 40px;

  &:hover {
    color: var(--nav-active);
  }
  &[aria-current="page"] {
    color: var(--nav-active);
  }
`;
const Icon = styled(FontAwesomeIcon)`
  width: 20px;
  height: 20px;
  max-width: none;
  flex: 0 0 auto;
`;

const LinkText = styled.span`
  font-size: 11px;
`;

export default function Navbar() {
  const router = useRouter();

  const path = router.asPath;

  const isActive = (href) => {
    if (href === "/") return path === "/";
    if (href === "/flashcards") return path.startsWith("/flashcards");
    return path === href;
  };

  return (
    <NavBar aria-label="Primary">
      <List>
        {/* <Item>
          <StyledLink
            href="/"
            aria-label="Go to startpage"
            aria-current={isActive("/") ? "page" : undefined}
          >
            <Icon icon={faHome} aria-hidden="true" />
            <LinkText>Home</LinkText>
          </StyledLink>
        </Item> */}

        <Item>
          <StyledLink
            href="/flashcards"
            aria-label="Go to card list page"
            aria-current={isActive("/flashcards") ? "page" : undefined}
          >
            <Icon icon={faListUl} aria-hidden="true" />
            <LinkText>Cards</LinkText>
          </StyledLink>
        </Item>

        <Item>
          <StyledLink
            href="/add-card"
            aria-label="Go to add card page"
            aria-current={isActive("/add-card") ? "page" : undefined}
          >
            <Icon icon={faPlusCircle} aria-hidden="true" />
            <LinkText>Add</LinkText>
          </StyledLink>
        </Item>

        <Item>
          <StyledLink
            href="/bookmarks"
            aria-label="Go to add card page"
            aria-current={isActive("/bookmarks") ? "page" : undefined}
          >
            <Icon icon={faEye} aria-hidden="true" />
            <LinkText>Bookmarks</LinkText>
          </StyledLink>
        </Item>

        {/* <Item>
          <StyledLink
            href="/quiz"
            aria-label="Go to quiz page"
            aria-current={isActive("/quiz") ? "page" : undefined}
          >
            <Icon icon={faPlay} aria-hidden="true" />
            <LinkText>Quiz</LinkText>
          </StyledLink>
        </Item> */}

        {/* <Item>
          <StyledLink
            href="/quiz"
            aria-label="Go to quiz page"
            aria-current={isActive("/quiz") ? "page" : undefined}
          >
            <Icon icon={faUser} aria-hidden="true" />
            <LinkText>Profile</LinkText>
          </StyledLink>
        </Item> */}
      </List>
    </NavBar>
  );
}
