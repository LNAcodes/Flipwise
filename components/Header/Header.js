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
  background: #ffffff;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  color: #287895;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Logo href="/" aria-label="Go to Spotlight page">
        Flipwise
      </Logo>
    </StyledHeader>
  );
}
