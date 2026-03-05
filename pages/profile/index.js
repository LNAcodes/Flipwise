// pages/profile/index.js

import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const ProfileTitle = styled.h2`
  color: white;
`;

const ProfilContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  color: white;
`;

const Button = styled.button`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfilePicturePlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: white;
  margin: 0 auto;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 20px;
  height: 20px;
`;

export default function ProfilePage() {
  const [logoutMessage, setLogoutMessage] = useState(false);
  const { data: session } = useSession();

  if (session) {
    return (
      <ProfilContainer>
        <ProfileTitle>Profile</ProfileTitle>
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt="Profile picture"
            width={50}
            height={50}
          />
        ) : (
          <ProfilePicturePlaceholder />
        )}
        <Text>Welcome {session.user.name}</Text>
        <Text>
          You're logged in now. You can add and manage your own flashcards.
        </Text>
        <Button
          onClick={async () => {
            await signOut({ redirect: false });
            setLogoutMessage(true);
          }}
        >
          Logout
        </Button>
      </ProfilContainer>
    );
  }
  return (
    <ProfilContainer>
      {logoutMessage && <Text>You have been logged out successfully.</Text>}
      <ProfileTitle>Profile</ProfileTitle>
      <ProfilePicturePlaceholder />
      <Text>You're logged out</Text>
      <Text>
        Log in to FlipWise (GitHub only for now) to view your profile and create
        your own cards.
      </Text>
      <Button onClick={() => signIn()}>
        <Icon icon={faGithub} />
        Sign in with GitHub
      </Button>
    </ProfilContainer>
  );
}
