import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import GradientImageOverlay from "./GradientImageOverlay";

const RootAnchor = styled.a`
  &:hover img {
    transform: scale(1.1);
  }
`;

export default function HomePageFeatureLink(props: {
  imageUrl: string;
  title: string;
  linkTo: string;
  className?: string;
}) {
  return (
    <Link href={props.linkTo} passHref>
      <RootAnchor
        className={clsx(
          "block relative h-80 overflow-hidden cursor-pointer text-white",
          props.className
        )}
      >
        <Image
          alt={props.title}
          className="absolute top-0 left-0 w-full h-full transition-transform"
          layout="fill"
          objectFit="cover"
          src={props.imageUrl}
        />
        <GradientImageOverlay />
        <div className="absolute bottom-12 left-0 w-full">
          <p className="my-4 text-center text-2xl">{props.title}</p>
          <p className="mx-auto w-max border-b-2 border-white text-sm">
            もっと見る
          </p>
        </div>
      </RootAnchor>
    </Link>
  );
}
