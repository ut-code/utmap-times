import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function ArticleContentContainer(
  props: PropsWithChildren<{ className?: string }>
) {
  return (
    <div
      className={clsx(
        "container mx-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-36",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
