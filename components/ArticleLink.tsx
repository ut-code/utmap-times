import clsx from "clsx";
import Link from "next/link";
import { title } from "process";
import { UrlObject } from "url";

export default function ArticleLink(props: {
  title: string;
  url: string | UrlObject;
  imageUrl: string;
  category?: string;
  tags?: { id: string; name: string }[];
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
        <div className="relative mb-8">
          <img
            src={props.imageUrl}
            alt={title}
            className="w-full h-64 object-cover"
          />
          {props.category && (
            <div className="absolute -bottom-4 bg-yellow-700 py-2 px-6 text-white">
              {props.category}
            </div>
          )}
        </div>
        <p className="text-2xl">{props.title}</p>
        {props.tags && (
          <ul>
            {props.tags.map((tag) => (
              <li
                key={tag.id}
                className="inline-block mr-2 my-2 p-1 border bg-gray-200 text-sm"
              >
                {`#${tag.name}`}
              </li>
            ))}
          </ul>
        )}
      </a>
    </Link>
  );
}
