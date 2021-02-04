import React from "react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative h-400 bg-black">
      <Logo className="relative top-0 left-0 w-32 h-32 bg-gray-200 z-30 mx-auto" />
      <div className="p-14 pt-36 text-center">
        <button
          type="button"
          className="h-full px-4 bg-gray-200 hover:bg-gray-100"
        >
          What is UTmap
        </button>
      </div>
      <div className="pt-36 text-center">
        <button
          type="button"
          className="h-full px-4 bg-gray-200 hover:bg-gray-100"
        >
          Join us
        </button>
        <button
          type="button"
          className="h-full px-4 bg-gray-200 hover:bg-gray-100"
        >
          Contact
        </button>
      </div>
      <div className="p-14 pt-36 text-white text-center">
        <p>Coded by ut.code();</p>
        <p>Copyright © UTmap. All rights reserved.</p>
      </div>
    </footer>
  );
}
