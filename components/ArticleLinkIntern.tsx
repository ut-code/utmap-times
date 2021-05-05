import { gql } from "@apollo/client";
import clsx from "clsx";
import Link from "next/link";
import { title } from "process";
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
}) {
  return (
    <Link href={`/internships/${props.article.slug}`}>
      <a
        className={clsx(
          "flex p-8 cursor-pointer hover:bg-gray-100",
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
        <span className="my-3 w-full">
          <div className="border-solid border-black border-b-2">
            <span>{props.article.company?.name}</span>
            <span
              className={clsx(
                "py-1 px-4 text-white text-sm object-right",
                props.article?.isRecruiting
                  ? "bg-secondary-main"
                  : "bg-gray-500"
              )}
            >
              {props.article?.isRecruiting ? "募集中" : "募集終了"}
            </span>
          </div>

          <p className="font-bold text-center text-lg pt-6">
            {props.article.title}
          </p>
          <div className="my-3 w-full grid grid-cols-8 text-center">
            <div className="font-bold col-span-1 border-b-2">職種</div>
            <div className="col-span-3 border-b-2">
              {props.article.jobType?.name}
            </div>
            <div className="font-bold col-span-1 border-b-2">給与</div>
            <div className="col-span-3 border-b-2">{props.article.salary}</div>

            <div className="font-bold col-span-1 border-b-2">場所</div>
            <div className="col-span-3 border-b-2">
              {props.article.location}
            </div>
            <div className="font-bold col-span-1 border-b-2">特徴</div>
            <div className="col-span-3 border-b-2">
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
            <div className="font-bold text-white bg-black col-span-1 border-b-2">
              業界
            </div>
            <div className="col-span-3 border-b-2">
              {props.article.industry?.name}
            </div>
          </div>
        </span>
      </a>
    </Link>
  );
}
