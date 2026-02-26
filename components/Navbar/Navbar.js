import Link from "next/link";
import styled from "styled-components";
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
  return (
    <NavBar aria-label="Primary">
      <List>
        <Item>
          <StyledLink href="/" aria-label="Go to starpage">
            <Icon icon={faHome} aria-hidden="true" />
            <LinkText>Home</LinkText>
          </StyledLink>
        </Item>
        <Item>
          <StyledLink href="/flashcards/" aria-label="Go to card list page">
            <Icon icon={faListUl} aria-hidden="true" />
            <LinkText>Card List</LinkText>
          </StyledLink>
        </Item>
        <Item>
          <StyledLink href="/add-card/" aria-label="Go to add card page">
            <Icon icon={faPlusCircle} aria-hidden="true" />
            <LinkText>Add Card</LinkText>
          </StyledLink>
        </Item>
        <Item>
          <StyledLink href="/quiz/" aria-label="Go to add card page">
            <Icon icon={faPlay} aria-hidden="true" />
            <LinkText>Quiz</LinkText>
          </StyledLink>
        </Item>
      </List>
    </NavBar>
  );
}
