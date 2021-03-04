import clsx from "clsx";
import Logo from "./Logo";

export default function ImageOrLogo(props: {
  alt: string;
  src?: string;
  className?: string;
}) {
  return (
    <div className={clsx("relative", props.className)}>
      <div
        role="none"
        className="flex justify-center items-center w-full h-full bg-yellow-50"
      >
        <Logo className="w-32 opacity-50" />
      </div>
      {props.src && (
        <img
          alt={props.alt}
          src={props.src}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
}
