// components/Footer/Footer.js
import Navbar from "@/components/Navbar/Navbar";
import styled from "styled-components";

const StyledFooter = styled.footer`
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  background-color: var(--bg-color-light);
  padding: 16px 24px;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Navbar />
    </StyledFooter>
  );
}
