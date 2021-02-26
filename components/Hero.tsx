import clsx from "clsx";
import { PropsWithChildren } from "react";
import Image from "next/image";

export default function Hero(
  props: PropsWithChildren<{
    image: string;
    useNextImageOptimization?: boolean;
    className?: string;
  }>
) {
  return (
    <div className={clsx("relative bg-cover text-white", props.className)}>
      {props.useNextImageOptimization ? (
        <Image
          className="absolute top-0 left-0 w-full h-full"
          layout="fill"
          objectFit="cover"
          src={props.image}
        />
      ) : (
        <img
          alt="hero"
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={props.image}
        />
      )}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
      />
      <div className="relative z-10 w-full">{props.children}</div>
    </div>
  );
}
