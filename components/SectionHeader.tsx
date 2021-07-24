import clsx from "clsx";

export default function SectionHeader(props: {
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <header className={clsx("text-center", props.className)}>
      <h2 className="text-4xl font-bold">{props.title}</h2>
      <p className="text-secondary-main">{props.subtitle}</p>
    </header>
  );
}
