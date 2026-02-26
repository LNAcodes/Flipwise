import Link from "next/link";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  gap: 16px;
`;

const Item = styled.li``;

export default function Navbar() {
  return (
    <NavBar aria-label="Primary">
      <List>
        <Item>
          <Link href="/">Home</Link>
        </Item>
        <Item>
          <Link href="/flashcards">Card List</Link>
        </Item>
        <Item>
          <Link href="/add-card/">Add Card</Link>
        </Item>
        <Item>
          <Link href="/quiz/">Quiz</Link>
        </Item>
      </List>
    </NavBar>
  );
}
