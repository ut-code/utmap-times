import clsx from "clsx";
import { PropsWithChildren } from "react";

const typeColorMap = {
  primary: "bg-primary-main",
  secondary: "bg-secondary-main",
  disabled: "bg-gray-500",
};

export default function CategoryChipShort(
  props: PropsWithChildren<{
    type: "primary" | "secondary" | "disabled";
    className?: string;
  }>
) {
  return (
    <div
      className={clsx(
        typeColorMap[props.type],
        "w-max py-1 px-6 text-white",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
