import clsx from "clsx";
import Link from "next/link";
import { UrlObject } from "url";

export default function Paginator(props: {
  className?: string;
  currentPage: number;
  pageCount: number;
  getLink(page: number): string | UrlObject;
}) {
  return (
    <div
      className={clsx("flex gap-2 justify-center", props.className, {
        hidden: props.pageCount <= 1,
      })}
    >
      {Array.from({ length: props.pageCount }, (_, i) => i).map((page) => {
        return (
          <Link key={page} href={props.getLink(page)}>
            <a
              className={clsx(
                "flex w-12 h-12 justify-center items-center",
                page === props.currentPage
                  ? "bg-primary-main text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-primary-main"
              )}
            >
              {page + 1}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
