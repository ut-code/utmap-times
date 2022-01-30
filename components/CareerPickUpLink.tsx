import Link from "next/link";
// eslint-disable-next-line camelcase
import { CareerIndexQuery_allCareerPickUpArticles_article } from "../__generated__/CareerIndexQuery";
import CategoryChip from "./CategoryChip";
import GradientImageOverlay from "./GradientImageOverlay";
import ResponsiveImageWithFallback from "./ResponsiveImageWithFallback";

export default function CareerPickUpLink(props: {
  // eslint-disable-next-line camelcase
  article: CareerIndexQuery_allCareerPickUpArticles_article;
}) {
  switch (props.article.__typename) {
    case "CompanyRecord":
      return (
        <Link href={`/companies/${props.article.slug}`}>
          <a className="block relative w-full h-full">
            <ResponsiveImageWithFallback
              aspectRatio={16 / 9}
              data={props.article.thumbnailImage?.responsiveImage}
            />
            <GradientImageOverlay />
            <div className="absolute bottom-0 left-0 w-full px-20 py-6 md:py-12 md:px-12 text-white">
              <CategoryChip type="secondary" className="mb-4 md:mb-6">
                {props.article.industry?.name}
              </CategoryChip>
              <p className="text-xl md:text-2xl">{props.article.name}</p>
            </div>
          </a>
        </Link>
      );
    case "GraduateArticleRecord":
      return (
        <Link href={`/companies/${props.article.slug}`}>
          <a className="block relative w-full h-full">
            <ResponsiveImageWithFallback
              aspectRatio={16 / 9}
              data={props.article.image?.responsiveImage}
            />
            <GradientImageOverlay />
            <div className="absolute bottom-0 left-0 w-full px-20 py-6 md:py-12 md:px-12 text-white">
              <CategoryChip type="secondary" className="mb-4 md:mb-6">
                {props.article.category?.name}
              </CategoryChip>
              <p className="text-xl md:text-2xl">{props.article.title}</p>
            </div>
          </a>
        </Link>
      );
    case "IndustryRecord":
      return (
        <Link href={`/companies/${props.article.slug}`}>
          <a className="block relative w-full h-full">
            <ResponsiveImageWithFallback
              aspectRatio={16 / 9}
              data={props.article.image?.responsiveImage}
            />
            <GradientImageOverlay />
            <div className="absolute bottom-0 left-0 w-full px-20 py-6 md:py-12 md:px-12 text-white">
              <CategoryChip type="secondary" className="mb-4 md:mb-6">
                業界
              </CategoryChip>
              <p className="text-xl md:text-2xl">{props.article.name}</p>
            </div>
          </a>
        </Link>
      );
    default:
      return <div />;
  }
}
