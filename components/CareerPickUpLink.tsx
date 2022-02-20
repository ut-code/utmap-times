import Link from "next/link";
// eslint-disable-next-line camelcase
import { CareerIndexQuery_allCareerPickUpArticles_article } from "../__generated__/CareerIndexQuery";
import CategoryChip from "./CategoryChip";
import CategoryChipShort from "./CategoryChipShort";
import ResponsiveImageWithFallback from "./ResponsiveImageWithFallback";

export default function CareerPickUpLink(props: {
  // eslint-disable-next-line camelcase
  article: CareerIndexQuery_allCareerPickUpArticles_article;
}) {
  switch (props.article.__typename) {
    case "CompanyRecord":
      return (
        <Link href={`/companies/${props.article.slug}`}>
          <a className="block h-full p-4 md:p-8 hover:bg-gray-200">
            <div className="relative h-full">
              <ResponsiveImageWithFallback
                aspectRatio={16 / 9}
                data={props.article.thumbnailImage?.responsiveImage}
              />
              <div className="absolute -bottom-0 left-0 w-full text-white">
                <CategoryChipShort type="secondary">
                  {props.article.industry?.name}
                </CategoryChipShort>
              </div>
            </div>
            <p className="pt-8 text-lg whitespace-normal">
              {props.article.name}
            </p>
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
            <div className="absolute bottom-0 left-0 w-full text-white">
              <CategoryChipShort type="secondary" className="mb-4 md:mb-6">
                {props.article.category?.name}
              </CategoryChipShort>
            </div>
            <p className="text-xl md:text-2xl">{props.article.title}</p>
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
            <div className="absolute bottom-0 left-0 w-full text-white">
              <CategoryChip type="secondary" className="mb-4 md:mb-6">
                業界
              </CategoryChip>
            </div>
            <p className="text-xl md:text-2xl">{props.article.name}</p>
          </a>
        </Link>
      );
    default:
      return <div />;
  }
}
