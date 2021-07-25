import Hero from "./Hero";

export default function IndexHeroContent(props: {
  imageUrl: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Hero image={props.imageUrl ?? ""}>
      <div className="pt-40 pb-24 px-10 md:px-32 lg:px-44 md:pt-56 md:pb-32">
        <h1 className="text-6xl">{props.title ?? ""}</h1>
        <h2>{props.subtitle ?? ""}</h2>
      </div>
    </Hero>
  );
}
