import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function SearchResultContainer(
  props: PropsWithChildren<{ className?: string }>
) {
  return (
    <div className={clsx("container mx-auto", props.className)}>
      {props.children}
    </div>
  );
}
