import clsx from "clsx";
import Link from "next/link";
import { UrlObject } from "url";

export default function AritcleLinkCompany(props: {
  name: string;
  url: string | UrlObject;
  imageUrl: string;
  LogoUrl: string;
  industry: string;
  className?: string;
}) {
  return (
    <Link href={props.url}>
      <a
        className={clsx(
          "block p-8 cursor-pointer hover:bg-gray-100",
          props.className
        )}
      >
        <div className="mb-4">
          <div className="relative">
            <img
              src={props.imageUrl}
              alt={props.name}
              className="w-full h-64 object-cover"
            />
            <img
              src={props.LogoUrl}
              alt="会社ロゴ"
              className="absolute w-1/4 right-0 bottom-0"
            />
            {props.industry && (
              <div className="inline-block mb-6 py-2 px-6 bg-secondary-main text-white">
                {props.industry}
              </div>
            )}
          </div>
          <p className="my-4 pl-2 text-lg border-l-4 border-secondary-main">
            {props.name}
          </p>
        </div>
      </a>
    </Link>
  );
}
