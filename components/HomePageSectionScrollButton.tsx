import { AiOutlineDown } from "react-icons/ai";

export default function HomePageSectionScrollButton(props: {
  title: string;
  subtitle: string;
  linkTo: string;
}) {
  return (
    <a
      href={props.linkTo}
      className="block relative w-full p-6 border border-primary-main bg-gray-50 text-center text-primary-main"
    >
      <p className="text-2xl font-bold">
        <span role="none" className="text-secondary-main">
          {props.title.slice(0, 1)}
        </span>
        {props.title.slice(1)}
      </p>
      <p>{props.subtitle}</p>
      <AiOutlineDown className="absolute top-1/2 right-6 w-4 h-4 -mt-2" />
    </a>
  );
}
