// components/BackgroundDots/BackgroundDots.js
import styled from "styled-components";

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

const DotOne = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  left: 50%;
  top: -5%;
  background: var(--color-accent);
  border-radius: 999px;
  filter: blur(80px);
`;
const DotTwo = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  left: -40%;
  top: 30%;
  background: var(--color-accent);
  border-radius: 999px;
  filter: blur(80px);
`;
const DotThree = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  left: 70%;
  top: 70%;
  background: var(--color-accent);
  border-radius: 999px;
  filter: blur(80px);
`;

export default function BackgroundDots() {
  return (
    <Layer>
      <DotOne />
      <DotTwo />
      <DotThree />
    </Layer>
  );
}
