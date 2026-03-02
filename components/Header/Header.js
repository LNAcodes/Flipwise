// components/Header/Header.js

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

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
  display: inline-flex;
  align-items: center;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Logo href="/" aria-label="Go to Homepage">
        <Image
          src="/assets/images/logo-flipwise.png"
          width={155}
          height={77}
          alt="Logo FlipWise"
          priority
        />
      </Logo>
    </StyledHeader>
  );
}
