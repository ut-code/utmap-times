import clsx from "clsx";
import Link from "next/link";
import { title } from "process";
import { UrlObject } from "url";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function ArticleLink(props: {
  title: string;
  url: string | UrlObject;
  imageUrl: string;
  category?: string;
  tags?: { id: string; name: string }[];
  className?: string;
  isBookmarked?: boolean;
  onBookmarkToggled?(): void;
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
          <div className="relative border-secondary-main border-solid border-8">
            <img
              src={props.imageUrl}
              alt={title}
              className="w-full h-64 object-cover"
            />
            {typeof props.isBookmarked === "boolean" && (
              <button
                type="button"
                className="absolute top-0 right-0 p-4 bg-white hover:bg-gray-200"
                onClick={(e) => {
                  props.onBookmarkToggled?.();
                  e.preventDefault();
                }}
              >
                {props.isBookmarked ? (
                  <FaStar className="w-6 h-6 text-secondary-main" />
                ) : (
                  <FaRegStar className="w-6 h-6 text-secondary-main" />
                )}
              </button>
            )}
          </div>
          {props.category && (
            <div className="absolute -bottom-4 bg-secondary-main py-2 px-6 text-white">
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
