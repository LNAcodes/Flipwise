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

export default function HomePage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <PageTitle>
        {session ? (
          <>
            Welcome <Username>{session.user.name}</Username>
          </>
        ) : (
          <>
            Welcome to <AppName>FlipWise</AppName>
          </>
        )}
      </PageTitle>
    );
  }
}

HomePage.meta = {
  title: "Home",
  description: "Your Dashboard and overview.",
};
