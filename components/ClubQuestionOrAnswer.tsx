import clsx from "clsx";
import { PropsWithChildren } from "react";
import { IoMdPerson, IoMdPeople } from "react-icons/io";
import styled from "styled-components";

type Type = "question" | "answer";
type Props = PropsWithChildren<{
  type: Type;
  className?: string;
  isOnGrayBackground?: boolean;
}>;
type BalloonProps = { type: Type };

const Balloon = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 1rem;
    left: ${(props: BalloonProps) =>
      props.type === "question" ? 0 : undefined};
    right: ${(props: BalloonProps) =>
      props.type === "answer" ? 0 : undefined};
    transform-origin: ${(props: BalloonProps) =>
      props.type === "question" ? "top left" : "top right"};
    width: 1rem;
    height: 1rem;
    transform: ${(props: BalloonProps) =>
      props.type === "question" ? "rotate(45deg)" : "rotate(-45deg)"};
    background-color: inherit;
  }
`;

export default function ClubQuestionOrAnswer(props: Props) {
  return (
    <div
      className={clsx(
        "max-w-screen-lg flex items-start",
        { "flex-row-reverse ml-auto": props.type === "answer" },
        props.className
      )}
    >
      {props.type === "question" ? (
        <IoMdPerson className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 mr-6" />
      ) : (
        <IoMdPeople className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 ml-6" />
      )}
      <Balloon
        type={props.type}
        className={clsx("p-4 rounded-lg", {
          "bg-gray-100": props.type === "question" && !props.isOnGrayBackground,
          "bg-white": props.type === "question" && props.isOnGrayBackground,
          "bg-secondary-main text-white": props.type === "answer",
        })}
      >
        {props.children}
      </Balloon>
    </div>
  );
}
