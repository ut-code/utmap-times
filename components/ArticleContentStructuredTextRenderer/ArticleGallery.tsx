import { gql } from "@apollo/client";
import { responsiveImageFragment } from "../../utils/datocms";
import { ArticleContentStructuredTextArticleGalleryFragment } from "../../__generated__/ArticleContentStructuredTextArticleGalleryFragment";
import ArticleLink from "../ArticleLink";
import ResponsiveImageWithFallback from "../ResponsiveImageWithFallback";

export const articleContentStructuredTextArticleGalleryFragment = gql`
  ${responsiveImageFragment}
  fragment ArticleContentStructuredTextArticleGalleryFragment on ArticleGalleryRecord {
    id
    title
    articles {
      id
      title
      slug
      image {
        responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
          ...ResponsiveImageFragment
        }
      }
    }
  }
`;

export default function ArticleContentStructuredTextArticleGallery({
  fragment,
}: {
  fragment: ArticleContentStructuredTextArticleGalleryFragment;
}) {
  return (
    <>
      <p className="max-w-lg mx-auto mb-4 py-2 border-b-2 border-primary-main text-center text-xl text-primary-main">
        {fragment.title}
      </p>
      <div className="md:grid md:grid-cols-2 xl:grid-cols-3">
        {fragment.articles.map((article) => (
          <ArticleLink
            key={article.id}
            media={
              <ResponsiveImageWithFallback
                aspectRatio={16 / 9}
                data={article.image?.responsiveImage}
              />
            }
            title={article.title ?? ""}
            url={`/static/${article.slug}`}
          />
        ))}
      </div>
    </>
  );
}
