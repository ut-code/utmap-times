import clsx from "clsx";
import { PropsWithChildren } from "react";
import styled from "styled-components";

const HeroContainer = styled.div<{ image: string }>`
  background-image: url(${({ image }) => image});
`;

export default function Hero(
  props: PropsWithChildren<{ image: string; className?: string }>
) {
  return (
    <HeroContainer
      image={props.image}
      className={clsx("relative bg-cover text-white", props.className)}
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
      />
      <div className="relative z-10 w-full">{props.children}</div>
    </HeroContainer>
  );
}
