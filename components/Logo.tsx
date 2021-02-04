import clsx from "clsx";

export default function Logo(props: { className?: string }) {
  return (
    <div
      className={clsx(
        "w-10 h-10 flex justify-center items-center",
        props.className
      )}
    >
      ロゴ
    </div>
  );
}
