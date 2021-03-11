import React from "react";
import { FaTwitter, FaLine } from "react-icons/fa";
import Link from "next/link";
import clsx from "clsx";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="py-12 h-400 bg-black text-white">
      <Logo white className="w-40 h-40 mx-auto" />
      <div className="grid grid-cols-2 gap-2 w-60 mx-auto my-12">
        {[
          { title: "What is UTmap", linkTo: "/", wider: true },
          { title: "Join us", linkTo: "https://lin.ee/AjkMbhF" },
          {
            title: "Contact",
            linkTo:
              "https://docs.google.com/forms/d/e/1FAIpQLSdiDVUEmiianCvGGx0dlQ279YkZwb8GSl9cJclAr_6_Pab7GA/viewform?usp=sf_link",
          },
        ].map((buttonInfo) => (
          <Link key={buttonInfo.title} href={buttonInfo.linkTo}>
            <a
              className={clsx(
                "block py-4 text-center bg-gray-800 hover:bg-gray-600",
                { "col-span-2": buttonInfo.wider }
              )}
            >
              {buttonInfo.title}
            </a>
          </Link>
        ))}
      </div>
      <div className="flex justify-center space-x-2 my-12">
        {[
          { Component: FaTwitter, linkTo: "https://twitter.com/UTmap_todai" },
          { Component: FaLine, linkTo: "https://lin.ee/oYnl12K" },
        ].map((snsInfo) => (
          <a
            key={snsInfo.linkTo}
            className="block w-9 h-full hover:bg-blue-700 text-white"
            href={snsInfo.linkTo}
          >
            <snsInfo.Component className="inline-block w-8 h-8" />
          </a>
        ))}
      </div>
      <div className="my-12 text-center">
        <p>Coded by ut.code();</p>
        <p>Copyright &copy; UTmap. All rights reserved.</p>
      </div>
    </footer>
  );
}
