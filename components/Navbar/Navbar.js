import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faListUl,
  faPlusCircle,
  faPlay,
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
  gap: 30px;
`;

const Item = styled.li`
  padding: 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 10px;
  text-align: center;
  color: var(--color-primary);
  text-decoration: none;
  min-height: 44px;

  &:hover {
    color: #313131;
  }
  &[aria-current="page"] {
    color: #1bb210;
  }
`;
const Icon = styled(FontAwesomeIcon)`
  width: 30px;
  height: 30px;
  max-width: none;
  flex: 0 0 auto;
`;

const LinkText = styled.span`
  font-size: 12px;
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
        <Item>
          <StyledLink
            href="/"
            aria-label="Go to startpage"
            aria-current={isActive("/") ? "page" : undefined}
          >
            <Icon icon={faHome} aria-hidden="true" />
            <LinkText>Home</LinkText>
          </StyledLink>
        </Item>

        <Item>
          <StyledLink
            href="/flashcards"
            aria-label="Go to card list page"
            aria-current={isActive("/flashcards") ? "page" : undefined}
          >
            <Icon icon={faListUl} aria-hidden="true" />
            <LinkText>Card List</LinkText>
          </StyledLink>
        </Item>

        <Item>
          <StyledLink
            href="/add-card"
            aria-label="Go to add card page"
            aria-current={isActive("/add-card") ? "page" : undefined}
          >
            <Icon icon={faPlusCircle} aria-hidden="true" />
            <LinkText>Add Card</LinkText>
          </StyledLink>
        </Item>

        <Item>
          <StyledLink
            href="/quiz"
            aria-label="Go to quiz page"
            aria-current={isActive("/quiz") ? "page" : undefined}
          >
            <Icon icon={faPlay} aria-hidden="true" />
            <LinkText>Quiz</LinkText>
          </StyledLink>
        </Item>
      </List>
    </NavBar>
  );
}
