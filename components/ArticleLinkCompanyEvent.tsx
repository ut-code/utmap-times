import clsx from "clsx";
import Link from "next/link";
import { title } from "process";
import { UrlObject } from "url";
import { FaStar, FaRegStar } from "react-icons/fa";
import styled from "styled-components";

const ImageContainer = styled.div`
  padding-top: 75%;
`;

export default function ArticleLink(props: {
  title: string;
  url: string | UrlObject;
  imageUrl: string;
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
            <ImageContainer className="relative">
              <img
                src={props.imageUrl}
                alt={title}
                className="absolute top-0 left-0s w-full h-full object-cover"
              />
            </ImageContainer>
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
        </div>
        <p className="text-xl">{props.title}</p>
      </a>
    </Link>
  );
}
