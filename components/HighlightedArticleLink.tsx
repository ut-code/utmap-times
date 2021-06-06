import clsx from "clsx";
import Link from "next/link";
import { UrlObject } from "url";
import { Image, ResponsiveImageType } from "react-datocms";

export default function HighlightedArticleLink(props: {
  title: string;
  url: string | UrlObject;
  responsiveImage: ResponsiveImageType;
  category?: string;
  tags?: { id: string; name: string }[];
  className?: string;
}) {
  return (
    <Link href={props.url}>
      <a
        className={clsx(
          "block relative max-w-4xl mx-auto hover:bg-gray-100 p-8",
          props.className
        )}
      >
        <Image data={props.responsiveImage} />
        <div className="block relative z-10 -mt-6 lg:-mt-12 lg:p-10 lg:mr-32 lg:bg-white">
          {props.category && (
            <div className="inline-block mb-6 py-2 px-6 bg-secondary-main text-white">
              {props.category}
            </div>
          )}
          <p className="text-2xl lg:text-3xl">{props.title}</p>
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
          <div
            aria-hidden
            className="hidden absolute bottom-0 left-0 w-1/2 border-b-2 border-primary-main lg:block"
          />
        </div>
      </a>
    </Link>
  );
}
