import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";
import Logo from "./Logo";

const menu = [
  { label: "サークル", linkTo: "/clubs" },
  { label: "就職/キャリア", linkTo: "/careers" },
  { label: "注目企業", linkTo: "/companies" },
  { label: "インターンシップ", linkTo: "/internships" },
  { label: "イベント", linkTo: "/events" },
];

const ClippableDiv = styled.div`
  clip-path: ${(props: { isClipped: boolean }) =>
    props.isClipped
      ? `inset(0 0 0 calc(var(--screen-is-not-lg) * 100%))`
      : "inset(0 0 0 0)"};
  transition: 0.1s clip-path ease-out;
`;

export default function Header() {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  return (
    <header className="sticky top-0 right-0 z-30 lg:h-16 lg:bg-white">
      <button
        type="button"
        className="absolute top-0 right-0 p-6 hover:bg-white hover:bg-opacity-20 lg:hidden"
        onClick={() => {
          setIsMobileMenuVisible(true);
        }}
      >
        <AiOutlineMenu className="text-white w-10 h-10" />
      </button>
      <div
        aria-hidden
        onMouseUp={() => {
          setIsMobileMenuVisible(false);
        }}
        className={clsx(
          "fixed top-0 left-0 w-full h-full bg-black transition-opacity",
          isMobileMenuVisible ? "opacity-40" : "opacity-0 pointer-events-none"
        )}
      />
      <ClippableDiv
        isClipped={!isMobileMenuVisible}
        className="fixed top-0 right-0 w-64 bg-white h-full shadow-lg lg:static lg:w-auto lg:shadow-none"
      >
        <button
          type="button"
          className="block ml-auto p-6 hover:bg-gray-200 lg:hidden"
          onClick={() => {
            setIsMobileMenuVisible(false);
          }}
        >
          <AiOutlineClose className="w-10 h-10" />
        </button>
        <Link href="/">
          <button
            type="button"
            className="lg:hidden block w-full px-6 py-4 text-left hover:bg-gray-200"
          >
            TOP
          </button>
        </Link>
        <ul className="lg:flex lg:justify-center lg:h-full lg:bg-white">
          {menu.map((menuItem) => (
            <li key={menuItem.label} className="h-full">
              <Link href={menuItem.linkTo}>
                <a className="block px-6 py-4 hover:bg-gray-200 lg:flex lg:h-full items-center">
                  {menuItem.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-500 lg:flex lg:absolute lg:top-0 lg:right-0 lg:border-none lg:h-full">
          <Link href="/search">
            <a className="hidden lg:flex justify-center items-center bg-blue-900 hover:bg-blue-700 text-white w-16 h-full">
              <AiOutlineSearch className="inline-block w-4 h-4" />
            </a>
          </Link>
        </div>
      </ClippableDiv>
      <div className="hidden lg:block">
        <Link href="/">
          <a rel="トップページ">
            <Logo className="absolute top-0 left-0 w-32 h-32 bg-white hover:bg-gray-200" />
          </a>
        </Link>
      </div>
    </header>
  );
}
