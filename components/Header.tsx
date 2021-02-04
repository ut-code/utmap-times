import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import Logo from "./Logo";

const menu = [
  { label: "サークル", linkTo: "/clubs" },
  { label: "学部", linkTo: "/" },
  { label: "就職/キャリア", linkTo: "/" },
  { label: "インターンシップ", linkTo: "/" },
  { label: "イベント", linkTo: "/" },
];

export default function Header() {
  return (
    <header className="relative bg-white h-16">
      <Logo className="absolute top-0 left-0 w-32 h-32 bg-gray-200 z-30" />
      <ul className="flex justify-center h-full bg-white">
        {menu.map((menuItem) => (
          <li key={menuItem.label} className="h-full">
            <Link href={menuItem.linkTo}>
              <a className="flex h-full items-center px-4 hover:bg-gray-200">
                {menuItem.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex absolute top-0 right-0 h-full">
        <button
          type="button"
          className="h-full px-4 bg-gray-200 hover:bg-gray-100"
        >
          マイページ
        </button>
        <button
          type="button"
          className="w-16 h-full bg-blue-900 hover:bg-blue-700 text-white"
        >
          <AiOutlineSearch className="inline-block w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
