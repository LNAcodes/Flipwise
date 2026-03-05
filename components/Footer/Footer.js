// components/Footer/Footer.js
import Navbar from "@/components/Navbar/Navbar";
import styled from "styled-components";

const StyledFooter = styled.footer`
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 0 24px;
  background: var(--background-dark);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 50, 0.3) 0%,
    rgba(0, 0, 50, 1) 100%
  );
  backdrop-filter: blur(5px);
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Navbar />
    </StyledFooter>
  );
}
