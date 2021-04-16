import clsx from "clsx";
import styled from "styled-components";

type PlayerContainerProps = { aspectRatio?: number };

const PlayerContainer = styled.div`
  &::before {
    display: block;
    content: "";
    padding-top: ${(props: PlayerContainerProps) =>
      (props.aspectRatio ? 1 / props.aspectRatio : 9 / 16) * 100}%;
  }
`;

export default function EmbeddedVideoPlayer(props: {
  title: string;
  src: string;
  aspectRatio?: number;
  className?: string;
}) {
  return (
    <PlayerContainer
      className={clsx(
        "relative max-w-screen-sm lg:max-w-screen-md mx-auto",
        props.className
      )}
      aspectRatio={props.aspectRatio}
    >
      <iframe
        title={props.title}
        src={props.src}
        className="absolute top-0 left-0 w-full h-full border-none"
        allow="fullscreen"
        allowFullScreen
      />
    </PlayerContainer>
  );
}
