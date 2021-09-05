import clsx from "clsx";
import { PropsWithChildren } from "react";

export function SearchGrid(props: PropsWithChildren<{ className?: string }>) {
  return (
    <ul
      className={clsx("md:grid md:grid-cols-2 xl:grid-cols-3", props.className)}
    >
      {props.children}
    </ul>
  );
}

export const SearchGridItem = "li";
