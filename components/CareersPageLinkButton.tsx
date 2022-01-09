import clsx from "clsx";
import Link from "next/link";

export default function CareersPageLinkButton(props: {
  linkTo: string;
  className?: string;
}) {
  return (
    <Link href={props.linkTo}>
      <a
        className={clsx(
          "block px-12 w-56 py-4 text-center text-white bg-primary-main hover:bg-primary-400",
          props.className ?? ""
        )}
      >
        もっと見る
      </a>
    </Link>
  );
}
