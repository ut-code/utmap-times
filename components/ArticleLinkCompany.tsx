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
            {props.industry && (
              <div className="absolute left-0 bottom-0 inline-block py-2 px-6 bg-secondary-main text-white">
                {props.industry}
              </div>
            )}
          </div>
          <div className="flex pt-4 items-center">
            <img
              src={props.LogoUrl}
              alt="会社ロゴ"
              className="w-1/6 h-1/6 left-0 bottom-0 rounded-full object-fill"
            />
            <p className="py-4 pl-4 text-lg">{props.name}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
