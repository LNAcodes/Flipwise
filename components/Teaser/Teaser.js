// components/Teaser/Teaser.js

import styled from "styled-components";

const StyledTeaser = styled.article`
  width: 18rem;
  border-radius: 12px;
  overflow: hidden;
  min-width: 300px;
  max-width: 300px;
  padding: 0 10px 0 10px;
  background-color: rgb(0, 255, 255, 0.3);
  margin: 20px 0 20px 0;
`;

const TeaserBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.75rem;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

const TeaserTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-color-light);
  font-family: var(--font-family);
`;

const TeaserText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-color-light);
`;

const TeaserButton = styled.a`
  display: inline-block;
  width: fit-content;
  text-decoration: none;
  background-color: var(--color-primary);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: var(--text-color-light);
  font-size: 1rem;
  font-weight: 400;
  padding: 0.65rem 1rem;
  margin: "0";
  &:hover {
    background-color: var(--color-secondary);
  }
`;

export default function Teaser({ title, text, href, linktext }) {
  return (
    <StyledTeaser>
      <TeaserBody>
        <TeaserTitle>{title}</TeaserTitle>
        <TeaserText>{text}</TeaserText>
        <TeaserButton href={href}>{linktext}</TeaserButton>
      </TeaserBody>
    </StyledTeaser>
  );
}
