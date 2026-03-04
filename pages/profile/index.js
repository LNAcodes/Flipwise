// pages/profile/index.js

import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";

const ProfileTitle = styled.h2``;
const Text = styled.p``;
const Button = styled.button``;

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Text>Welcome {session.user.name}</Text>
        <Text>
          You're logged in now. You can add and manage your own flashcards.
        </Text>
        <Button onClick={() => signOut({ callbackUrl: "/profile" })}>
          Logout
        </Button>
      </>
    );
  }
  return (
    <>
      <ProfileTitle></ProfileTitle>
      <Image></Image>
      <Text>You're logged out</Text>
      <Text>
        Log in to FlipWise (GitHub only for now) to view your profile and create
        your own cards.
      </Text>
      <Button onClick={() => signIn()}>Sign in with GitHub</Button>
    </>
  );
}
