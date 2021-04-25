import { gql } from "@apollo/client";
import clsx from "clsx";
import Link from "next/link";
import { title } from "process";
import { ArticleLinkInternFragment } from "../__generated__/ArticleLinkInternFragment";

export const articleLinkInternFragment = gql`
  fragment ArticleLinkInternFragment on InternshipRecord {
    id
    title
    images {
      url(imgixParams: { maxW: 600 })
    }
    jobType {
      name
      slug
    }
    salary
    location
    industry {
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
          "block p-8 cursor-pointer hover:bg-gray-100",
          props.className
        )}
      >
        <div className="relative mb-8">
          <img
            src={props.article.images[0]?.url ?? "/images/utmap.png"}
            alt={title}
            className="w-full h-64 object-cover border-secondary-main border-solid border-8"
          />
        </div>
        <p className="text-2xl">{props.article.title}</p>
        <p className="text-2xl">{props.article.jobType?.name}</p>
        <p className="text-2xl">{props.article.salary}</p>
        <p className="text-2xl">{props.article.location}</p>
        <p className="text-2xl">{props.article.industry?.name}</p>
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
      </a>
    </Link>
  );
}
