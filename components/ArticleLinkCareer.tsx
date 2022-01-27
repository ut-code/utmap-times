import Link from "next/link";
import clsx from "clsx";

export default function ArticleLinkCareer(props: {
  slug: string;
  title: string;
  imageUrl?: string;
  categoryName?: string;
  date?: string;
  tags?: { id: string; name: string }[];
  className: string;
}) {
  return (
    <Link href={`/graduates/${props.slug}`}>
      <a
        className={clsx(
          "block w-full h-full p-8 cursor-pointer",
          props.className
        )}
      >
        <div className="relative mb-8">
          <img
            src={props.imageUrl ?? "images/utmap.jpg"}
            alt={props.title ?? ""}
            className="w-full object-contain"
          />
          <div className="absolute -bottom-4 bg-secondary-main py-2 px-6 text-white">
            {props.categoryName ?? ""}
          </div>
        </div>
        {props.date && (
          <p className="pb-4 text-sm">{props.date.replace(/-/g, "/")}</p>
        )}
        <p className="pb-2 text-xl">{props.title}</p>
        <ul>
          {props.tags?.map((tag) => (
            <li
              key={tag.id}
              className="inline-block mr-2 my-2 p-1 border bg-gray-200 text-sm"
            >
              {`#${tag.name}`}
            </li>
          ))}
        </ul>
      </a>
    </Link>
  );
}
