import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const OneSideMarginContainer = styled.div`
  width: calc(50% + var(--screen-lg) / 2);
  max-width: 100%;
`;

export default function HomePageSectionHeader(props: {
  title: string;
  subtitle: string;
  linkTo: string;
  image: string;
  description: JSX.Element;
}) {
  return (
    <div className="my-24">
      <OneSideMarginContainer className="relative h-64 md:h-96">
        <Image src={props.image} layout="fill" objectFit="cover" />
      </OneSideMarginContainer>
      <OneSideMarginContainer className="relative ml-auto -mt-10">
        <div className="ml-8 bg-gray-50">
          <div className="flex flex-col items-start max-w-screen-lg p-10 lg:flex-row lg:p-16">
            <div className="contents lg:block lg:w-1/3 lg:flex-none">
              <header className="mb-6">
                <h3 className="text-3xl font-bold md:text-4xl">
                  {props.title}
                </h3>
                <p className="text-secondary-main">{props.subtitle}</p>
              </header>
              <Link href={props.linkTo}>
                <a className="order-last inline-block mt-6 px-16 py-3 bg-primary-main text-white hover:bg-primary-400">
                  もっと見る
                </a>
              </Link>
            </div>
            <div className="leading-relaxed">{props.description}</div>
          </div>
        </div>
      </OneSideMarginContainer>
    </div>
  );
}
