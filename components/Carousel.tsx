import clsx from "clsx";
import { ComponentType, useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";

const CenterCardFrame = styled.div`
  ::before {
    display: block;
    padding-top: ${(props: { aspectRatio: number }) =>
      props.aspectRatio * 100}%;
    content: "";
  }
`;

type CardProps = {
  gap: string;
  cardOffset: number;
  isEdge: boolean;
};
const Card = styled.li`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(
    calc(
      (100% + ${(props: CardProps) => props.gap}) *
        (${(props: CardProps) => props.cardOffset})
    )
  );
  opacity: ${(props: CardProps) => (props.isEdge ? 0 : 1)};
  transition: transform 0.5s ease, opacity 0.5s ease;
`;

function ArrowButton({
  edge,
  Icon,
  onClick,
}: {
  edge: "left" | "right";
  Icon: ComponentType<{ className: string }>;
  onClick(): void;
}) {
  return (
    <button
      type="button"
      className={clsx(
        "absolute top-1/2 flex justify-center items-center",
        "w-12 h-12 md:w-20 md:h-20 -my-6 md:-my-10 bg-primary-main rounded-full",
        edge === "left" ? "left-4 lg:-left-10" : "right-4 lg:-right-10"
      )}
      onClick={onClick}
    >
      <Icon className="text-2xl text-white" />
    </button>
  );
}
export type CarouselProps = {
  aspectRatio?: number;
  interval?: number;
  minimumVisibleCardCount?: number;
  gap?: string;
  cardMaxWidthClassName?: string;
  disableArrowButton?: boolean;
  disableIndicator?: boolean;
  disableBrightnessControl?: boolean;
  cards: { key: string; content: JSX.Element }[];
};

export default function Carousel(props: CarouselProps) {
  const {
    interval = 5000,
    aspectRatio = 9 / 16,
    gap = "1rem",
    minimumVisibleCardCount = 5,
    cardMaxWidthClassName = "max-w-screen-lg",
    disableArrowButton = false,
    disableIndicator = false,
    disableBrightnessControl = false,
    cards,
  } = props;

  const [centerPosition, setCenterPosition] = useState(0);
  const centerCardIndex =
    ((centerPosition % cards.length) + cards.length) % cards.length;
  const halfMinimumVisibleCardCount =
    Math.floor(minimumVisibleCardCount / 2) + 1;
  const positions = Array.from(
    { length: halfMinimumVisibleCardCount * 2 + 1 },
    (_, i) => centerPosition - halfMinimumVisibleCardCount + i
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCenterPosition(centerPosition + 1);
    }, interval);
    return () => {
      clearInterval(timerId);
    };
  }, [interval, centerPosition]);

  if (cards.length === 0) return null;

  return (
    <div className="flex justify-center overflow-hidden">
      <CenterCardFrame
        aspectRatio={aspectRatio}
        className={clsx("relative w-full", cardMaxWidthClassName)}
      >
        <ul>
          {positions.map((position, i) => {
            const item =
              cards[((position % cards.length) + cards.length) % cards.length];
            return (
              <Card
                className={clsx(!disableBrightnessControl && "bg-black")}
                cardOffset={i - halfMinimumVisibleCardCount}
                isEdge={i === 0 || i === positions.length - 1}
                gap={gap}
                key={`${item.key},${position}`}
              >
                <div
                  className={clsx(
                    "w-full h-full transition-opacity duration-500",
                    disableBrightnessControl || position === centerPosition
                      ? "opacity-100"
                      : "lg:opacity-40"
                  )}
                >
                  {item.content}
                </div>
              </Card>
            );
          })}
        </ul>
        {cards.length > 1 && (
          <>
            {!disableArrowButton && (
              <>
                <ArrowButton
                  onClick={() => setCenterPosition((previous) => previous - 1)}
                  edge="left"
                  Icon={AiOutlineLeft}
                />
                <ArrowButton
                  onClick={() => setCenterPosition((previous) => previous + 1)}
                  edge="right"
                  Icon={AiOutlineRight}
                />
              </>
            )}
            {!disableIndicator && (
              <div className="absolute bottom-0 right-0 flex p-2 md:p-4 gap-1">
                {cards.map((card, i) => (
                  <button
                    key={card.key}
                    onClick={() => setCenterPosition(i)}
                    aria-label={`カード ${i}`}
                    type="button"
                    className={clsx(
                      "w-3 h-3 border-2 border-primary-main rounded-full transition-colors",
                      i === centerCardIndex ? "bg-primary-main" : "bg-white"
                    )}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </CenterCardFrame>
    </div>
  );
}
