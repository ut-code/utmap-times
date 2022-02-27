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

export default function CareersPageFeatureLink(props: {
  imageUrl: string;
  title: string;
  subTitle: string;
  linkTo: string;
  className?: string;
}) {
  return (
    <Link href={props.linkTo} passHref>
      <RootAnchor
        className={clsx(
          "block relative overflow-hidden cursor-pointer text-white",
          props.className
        )}
      >
        <Image
          alt={props.title}
          className="transition-transform"
          height={520}
          width={400}
          src={props.imageUrl}
        />
        <GradientImageOverlay />
        <div className="absolute top-1/2 left-0 w-full -mt-10 text-center">
          <p className="mb-4 text-4xl">{props.title}</p>
          <p className="mx-auto w-max text-base">{props.subTitle}</p>
        </div>
      </RootAnchor>
    </Link>
  );
}
