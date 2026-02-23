// components/Header/Header.js

import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 16px 24px;
  background-color: var(--bg-color-light);
`;

const Logo = styled(Link)`
  background-color: var(--color-primary);
  font-size: 2rem;
  color: var(--bg-color-light);
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 5px 20px 5px 10px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Logo href="/" aria-label="Go to Homepage">
        🦉 FlipWise
      </Logo>
    </StyledHeader>
  );
}
