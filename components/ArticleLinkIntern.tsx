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
      leader
      logo {
        url
      }
    }
    images {
      url(imgixParams: { maxW: 600 })
    }
    heroImage {
      url
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
          "lg:flex-grow lg:flex m-4 cursor-pointer bg-gray-100 hover:bg-gray-200",
          props.className
        )}
      >
        <div className="relative">
          <img
            src={props.article.images[0]?.url ?? "/images/utmap.png"}
            alt={title}
            className="w-full h-full object-cover"
          />

          <img
            alt={props.article?.company?.name ?? ""}
            src={props.article?.company?.logo?.url ?? "/images/utmap.png"}
            className="absolute top-0 right-0 w-32 h-32 "
          />
          <p
            className={clsx(
              "absolute -bottom-4 py-1 px-4 text-white text-sm  lg:hidden",
              props.article?.isRecruiting ? "bg-secondary-main" : "bg-gray-500"
            )}
          >
            {props.article?.isRecruiting ? "募集中" : "募集終了"}
          </p>
        </div>
        <div className="pt-6 lg:pt-3 lg:px-10 w-full">
          <div className="py-3 border-solid border-black border-b font-bold">
            <p className="inline-block">{props.article.company?.name}</p>
            <p
              className={clsx(
                "py-1 px-4 mx-3 text-white text-sm float-right hidden lg:block",
                props.article?.isRecruiting
                  ? "bg-secondary-main"
                  : "bg-gray-500"
              )}
            >
              {props.article?.isRecruiting ? "募集中" : "募集終了"}
            </p>
          </div>

          <p className="pt-6 font-bold text-lg">{props.article.title}</p>
          <div className="my-3 w-full grid lg:grid-cols-2">
            {[
              { title: "職種", content: props.article.jobType?.name },
              { title: "給与", content: props.article.salary },
              { title: "場所", content: props.article.location },
              { title: "特徴", content: props.article.features },
              { title: "業界", content: props.article.industry?.name },
            ].map((component) => (
              <div
                key={component.title}
                className="col-span-1 grid grid-cols-4"
              >
                <div
                  className={clsx(
                    "flex mt-3 py-1 col-span-1 border-gray-500 border-b font-bold justify-center items-end",
                    component.title === "業界" &&
                      "bg-black text-white border-none"
                  )}
                >
                  {component.title}
                </div>
                <div className="mt-3 py-1 px-4 col-span-3 border-b border-gray-300">
                  {component.content !== props.article.features
                    ? component.content
                    : component.content.map((feature) => (
                        <p className="inline-block mr-2">{`#${feature.name}`}</p>
                      ))}
                </div>
              </div>
            ))}
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
        </div>
      </a>
    </Link>
  );
}
