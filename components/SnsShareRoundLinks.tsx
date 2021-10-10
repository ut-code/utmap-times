import clsx from "clsx";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { FaLink, FaTwitter } from "react-icons/fa";

export default function SnsShareRoundLinks(props: {
  twitterUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  lineUrl?: string;
  className?: string;
}) {
  return (
    <div className={clsx("pt-8 text-center", props.className)}>
      {props.twitterUrl && (
        <a
          href={props.twitterUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block p-4 mx-4 md:mx-8 bg-blue-400 hover:bg-blue-600 rounded-full"
        >
          <FaTwitter className="w-6 h-6 md:w-14 md:h-14 inline-block text-white" />
        </a>
      )}
      {props.instagramUrl && (
        <a
          href={props.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block p-3 mx-4 md:mx-8 bg-pink-500 hover:bg-pink-600 rounded-full"
        >
          <AiOutlineInstagram className="w-8 h-8 md:w-16 md:h-16 inline-block text-white" />
        </a>
      )}
      {props.facebookUrl && (
        <a
          href={props.facebookUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block p-3 mx-4 md:mx-8 bg-blue-500 hover:bg-blue-700 rounded-full"
        >
          <AiOutlineFacebook className="w-8 h-8 md:w-16 md:h-16 inline-block text-white" />
        </a>
      )}
      {props.lineUrl && (
        <a
          href={props.lineUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block p-3 mx-4 md:mx-8 bg-blue-500 hover:bg-blue-700 rounded-full"
        >
          <FaLink className="w-8 h-8 md:w-16 md:h-16 inline-block text-white" />
        </a>
      )}
    </div>
  );
}
