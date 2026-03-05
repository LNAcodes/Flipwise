// components/FlashCard/FlashCardFooter.js

import styled from "styled-components";

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 15px;
`;

const Hint = styled.p`
  color: var(--text-color-dark);
  font-size: 0.9rem;
  line-height: 0;
`;

export default function FlashCardFooter({ showHint, text }) {
  return <Footer>{showHint ? <Hint>💡 {text}</Hint> : null}</Footer>;
}
