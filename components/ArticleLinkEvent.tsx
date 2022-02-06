import clsx from "clsx";
import Link from "next/link";
import { UrlObject } from "url";

export default function AritcleLinkEvent(props: {
  title: string;
  url: string | UrlObject;
  imageUrl: string;
  companyLogoUrl: string;
  schedule: string;
  location: string;
  companyName?: string;
  industryName?: string;
  targets?: { id: string; name: string }[];
  features?: { id: string; name: string }[];
  isRecruiting: boolean;
  className?: string;
}) {
  return (
    <Link href={props.url}>
      <a
        className={clsx(
          "block p-8 cursor-pointer hover:bg-gray-100 h-full",
          props.className
        )}
      >
        <div className="mb-4">
          <div className="relative">
            <img
              src={props.imageUrl}
              alt={props.title}
              className="w-full h-64 object-cover"
            />
            <img
              src={props.companyLogoUrl}
              alt="会社ロゴ"
              className="absolute w-1/4 right-0 bottom-0"
            />
            {props.isRecruiting ? (
              <p className="absolute top-0 left-0 p-2 bg-secondary-main text-white">
                募集中
              </p>
            ) : (
              <p className="absolute top-0 left-0 p-2 bg-gray-500 text-white">
                募集終了
              </p>
            )}
          </div>
          <p className="my-4 pl-2 text-lg border-l-4 border-secondary-main">
            {props.title}
          </p>
          <p className="text-sm">{props.schedule}</p>
          <p className="text-sm">{`開催場所：${props.location}`}</p>
          {props.companyName && props.industryName && (
            <p className="py-2">{`${props.companyName} / ${props.industryName}`}</p>
          )}
          <ul>
            {props.targets?.map((target) => (
              <li
                key={target.id}
                className="inline-block mr-2 my-2 p-1 border bg-gray-200"
              >
                {`#${target.name}`}
              </li>
            ))}
            {props.features?.map((feature) => (
              <li
                key={feature.id}
                className="inline-block mr-2 my-2 p-1 border bg-gray-200"
              >
                {`#${feature.name}`}
              </li>
            ))}
          </ul>
        </div>
      </a>
    </Link>
  );
}
