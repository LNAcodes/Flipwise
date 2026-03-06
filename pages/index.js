// pages/index.js

import styled from "styled-components";
import Teaser from "@/components/Teaser/Teaser";
import { useSession } from "next-auth/react";

const PageTitle = styled.h1`
  padding: 0;
`;

const Username = styled.span`
  color: var(--color-accent);
  font-style: italic;
`;

const AppName = styled.span`
  color: var(--color-accent);
  font-style: italic;
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

      <Teaser
        title="Ready for a Quiz?"
        text="Put your knowledge to the test and see how much you already know."
        href="/quiz"
        linktext="Start the Quiz"
      />

      {session && (
        <Teaser
          title="Create New Flashcards"
          text="Add fresh cards, grow your collection, and build your learning step by step."
          href="/add-cards"
          linktext="Add Flashcards"
        />
      )}

      <Teaser
        title="Your Bookmarks"
        text="Keep track of the topics that matter most and come back to them anytime."
        href="/bookmarks"
        linktext="Open Bookmarks"
      />
    </>
  );
}

HomePage.meta = {
  title: "Home",
  description: "Your Dashboard and overview.",
};
