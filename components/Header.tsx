import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Logo from "./Logo";

const menu = [
  { label: "サークル", linkTo: "/clubs" },
  // { label: "学部", linkTo: "/" },
  { label: "就職/キャリア", linkTo: "/graduates" },
  { label: "インターンシップ", linkTo: "/internships" },
  // { label: "イベント", linkTo: "/" },
];

export default function Header() {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  return (
    <header className="sticky top-0 right-0 z-30 lg:h-16 lg:bg-white">
      <div className="hidden lg:block">
        <Link href="/">
          <a rel="トップページ">
            <Logo className="absolute top-0 left-0 w-32 h-32 bg-white hover:bg-gray-200" />
          </a>
        </Link>
      </div>
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
        className={clsx(
          "fixed top-0 left-0 w-full h-full hidden bg-black bg-opacity-40",
          { "md:block": isMobileMenuVisible }
        )}
      />
      <div
        className={clsx(
          "fixed top-0 right-0 w-64 bg-white h-full lg:static lg:w-auto",
          { hidden: !isMobileMenuVisible },
          "lg:block"
        )}
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
          <button
            type="button"
            className="block w-full px-6 py-4 text-left lg:h-full lg:w-auto lg:py-0 lg:px-4 lg:bg-gray-200 lg:hover:bg-gray-100"
          >
            マイページ
          </button>
          <button
            type="button"
            className="hidden lg:block bg-blue-900 hover:bg-blue-700 text-white w-16 h-full"
          >
            <AiOutlineSearch className="inline-block w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
