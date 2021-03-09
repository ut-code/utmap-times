import { AiOutlineFacebook } from "react-icons/ai";
import { FaLink, FaTwitter } from "react-icons/fa";
import dynamic from "next/dynamic";

function SnsShareLinks() {
  const fullPath = window.location.href;
  const twitterParams = new URLSearchParams({ url: fullPath });
  const facebookParams = new URLSearchParams({ u: fullPath });

  return (
    <div className="flex pt-8 pb-12">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?${twitterParams.toString()}`}
        className="py-1 w-40 mr-2 bg-blue-400 hover:bg-blue-900 text-white text-center"
      >
        <FaTwitter className="inline-block" />
        <p className="inline-block pl-1">ツイート</p>
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/sharer/sharer.php?${facebookParams.toString()}`}
        className="py-1 w-40 mr-2 bg-blue-600 hover:bg-blue-900 text-white text-center"
      >
        <AiOutlineFacebook className="inline-block" />
        <p className="inline-block pl-1">シェア</p>
      </a>
      <a
        href={fullPath}
        onClick={(e) => {
          navigator.clipboard.writeText(fullPath);
          e.preventDefault();
        }}
        className="py-1 w-40 mr-2 bg-blue-800 hover:bg-blue-900 text-white text-center"
      >
        <FaLink className="inline-block" />
        <p className="inline-block pl-1">
          リンク<span className="hidden sm:inline">をコピー</span>
        </p>
      </a>
    </div>
  );
}

export default dynamic(() => Promise.resolve(SnsShareLinks), {
  ssr: false,
});
