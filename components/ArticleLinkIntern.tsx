import { gql } from "@apollo/client";
import clsx from "clsx";
import Link from "next/link";
import { title } from "process";
import { FaStar, FaRegStar } from "react-icons/fa";
import { ArticleLinkInternFragment } from "../__generated__/ArticleLinkInternFragment";

export const articleLinkInternFragment = gql`
  fragment ArticleLinkInternFragment on InternshipRecord {
    id
    title
    company {
      name
    }
    images {
      url(imgixParams: { maxW: 600 })
    }
    jobType {
      id
      name
      slug
    }
    isRecruiting
    isLongTermInternship
    salary
    location
    industry {
      id
      name
      slug
    }
    features {
      id
      slug
      name
    }
    slug
  }
`;

export default function ArticleLinkIntern(props: {
  article: ArticleLinkInternFragment;
  className?: string;
  isBookmarked?: boolean;
  onBookmarkToggled?(): void;
}) {
  return (
    <Link href={`/internships/${props.article.slug}`}>
      <a
        className={clsx(
          "flex m-4 p-8 cursor-pointer bg-gray-100 hover:bg-gray-200",
          props.className
        )}
      >
        <span className="relative mb-8">
          <img
            src={props.article.images[0]?.url ?? "/images/utmap.png"}
            alt={title}
            className="relative lg:w-max mx-auto pt-14 px-6 -top-14"
          />
        </span>
        <span className="py-3 w-full">
          <div className="py-3 border-solid border-black border-b">
            <span>{props.article.company?.name}</span>
            <span
              className={clsx(
                "py-1 px-4 mx-3 text-white text-sm float-right",
                props.article?.isRecruiting
                  ? "bg-secondary-main"
                  : "bg-gray-500"
              )}
            >
              {props.article?.isRecruiting ? "募集中" : "募集終了"}
            </span>
          </div>

          <p className="pt-6 font-bold text-center text-lg">
            {props.article.title}
          </p>
          <div className="my-3 w-full grid grid-cols-8 text-center">
            <div className="mt-3 font-bold col-span-1 border-black border-b">
              職種
            </div>
            <div className="mt-3 col-span-3 border-b border-gray-300">
              {props.article.jobType?.name}
            </div>
            <div className="mt-3 font-bold col-span-1 border-black border-b">
              給与
            </div>
            <div className="mt-3 col-span-3 border-b border-gray-300">
              {props.article.salary}
            </div>

            <div className="mt-3 font-bold col-span-1 border-black border-b">
              場所
            </div>
            <div className="mt-3 col-span-3 border-b border-gray-300">
              {props.article.location}
            </div>
            <div className="mt-3 font-bold col-span-1 border-black border-b">
              特徴
            </div>
            <div className="col-span-3 border-b border-gray-300">
              {props.article.features && (
                <ul>
                  {props.article.features.map((feature) => (
                    <li
                      key={feature.id}
                      className="inline-block mr-2 my-2 p-1 border bg-gray-200 text-sm"
                    >
                      {`#${feature.name}`}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="my-3 font-bold text-white bg-black col-span-1">
              業界
            </div>
            <div className="my-3 col-span-3">
              {props.article.industry?.name}
            </div>
          </div>
          {typeof props.isBookmarked === "boolean" && (
            <button
              type="button"
              className="absolute z-20 bottom-0 right-0 p-4 bg-white hover:bg-gray-200"
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
        </span>
      </a>
    </Link>
  );
}
