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
              className="w-full object-contain"
            />
            {props.industry && (
              <div className="absolute left-0 bottom-0 inline-block py-2 px-6 bg-secondary-main text-white">
                {props.industry}
              </div>
            )}
          </div>
          <div className="flex pt-4 items-center">
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-white rounded-full">
              <img
                src={props.LogoUrl}
                alt="会社ロゴ"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <p className="py-4 pl-4 text-lg">{props.name}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
