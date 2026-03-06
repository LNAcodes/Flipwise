// pages/index.js

import styled from "styled-components";
import { useSession } from "next-auth/react";

const PageTitle = styled.h1`
  padding: 0;
`;

const Username = styled.span`
  color: greenyellow;
  font-style: italic;
`;

const AppName = styled.span`
  color: greenyellow;
  font-style: italic;
`;

const Teaser = styled.article`
  width: 18rem;
  border-radius: 12px;
  overflow: hidden;
  min-width: 300px;
  max-width: 300px;
  padding: 0 10px 0 10px;
  background-color: rgb(0, 255, 242, 0.5);
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

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <>
      <PageTitle>
        {session?.user?.name ? (
          <>
            Welcome <Username>{session.user.name}</Username>
          </>
        ) : (
          <>
            Welcome to <AppName>FlipWise</AppName>
          </>
        )}
      </PageTitle>

      <Teaser>
        <TeaserBody>
          <TeaserTitle>Take a Quiz</TeaserTitle>
          <TeaserText>Take a quiz and test your knowledge.</TeaserText>
          <TeaserButton href="/quiz">Start Quiz</TeaserButton>
        </TeaserBody>
      </Teaser>
    </>
  );
}

HomePage.meta = {
  title: "Home",
  description: "Your Dashboard and overview.",
};
