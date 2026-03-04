// pages/profile/index.js

import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";

const ProfileTitle = styled.h2``;
const Text = styled.p`
  color: white;
`;
const Button = styled.button`
  margin: 10px 0;
`;

const ProfilePicturePlaceholder = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  margin: 0 auto;
`;
export default function ProfilePage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <ProfileTitle>Profile</ProfileTitle>
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="Profile picture"
            width={50}
            height={50}
          />
        )}
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
      <ProfilePicturePlaceholder />
      <Text>You're logged out</Text>
      <Text>
        Log in to FlipWise (GitHub only for now) to view your profile and create
        your own cards.
      </Text>
      <Button onClick={() => signIn()}>Sign in with GitHub</Button>
    </>
  );
}
