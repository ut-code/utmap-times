import React from "react";
import { FaTwitter, FaLine } from "react-icons/fa";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative h-400 bg-black">
      <Logo className="relative top-3 left-0 w-32 h-32 bg-gray-200 z-30 mx-auto" />
      <div className="pt-7 text-center">
        <button
          type="button"
          className="px-12 py-3 h-full text-white bg-gray-500 hover:bg-gray-300"
        >
          What is UTmap
        </button>
      </div>
      <div className="pt-5 text-center">
        <button
          type="button"
          className="h-full px-8 py-3 text-white bg-gray-500 hover:bg-gray-300"
        >
          Join us
        </button>
        <button
          type="button"
          className="h-full px-5 py-3 text-white bg-gray-500 hover:bg-gray-300"
        >
          Contact
        </button>
      </div>
      <div className="pt-22 text-center">
        <button
          type="button"
          className="w-9 h-full hover:bg-blue-700 text-white"
        >
          <FaTwitter className="inline-block w-4 h-4" />
        </button>
        <button
          type="button"
          className="w-9 h-full hover:bg-blue-700 text-white"
        >
          <AiOutlineFacebook className="inline-block w-4 h-4" />
        </button>
        <button
          type="button"
          className="w-9 h-full hover:bg-blue-700 text-white"
        >
          <AiOutlineInstagram className="inline-block w-4 h-4" />
        </button>
        <button
          type="button"
          className="w-9 h-full hover:bg-blue-700 text-white"
        >
          <FaLine className="inline-block w-4 h-4" />
        </button>
      </div>
      <div className="p-14 pt-18 text-white text-center">
        <p>Coded by ut.code();</p>
        <p>Copyright © UTmap. All rights reserved.</p>
      </div>
    </footer>
  );
}
