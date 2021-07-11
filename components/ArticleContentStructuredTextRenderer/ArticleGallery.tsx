import { gql } from "@apollo/client";
import { ArticleContentStructuredTextArticleGalleryFragment } from "../../__generated__/ArticleContentStructuredTextArticleGalleryFragment";
import ArticleLink from "../ArticleLink";

export const articleContentStructuredTextArticleGalleryFragment = gql`
  fragment ArticleContentStructuredTextArticleGalleryFragment on ArticleGalleryRecord {
    id
    title
    articles {
      id
      title
      slug
      image {
        alt
        url
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
            imageUrl={article.image?.url ?? "/images/utmap.png"}
            title={article.title ?? ""}
            url={`/static/${article.slug}`}
          />
        ))}
      </div>
    </>
  );
}
