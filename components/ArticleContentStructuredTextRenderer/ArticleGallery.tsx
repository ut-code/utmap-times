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
      ... on StaticPageRecord {
        id
        title
        slug
        image {
          responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
            ...ResponsiveImageFragment
          }
        }
      }
      ... on EventRecord {
        id
        title
        slug
        thumbnailImage {
          responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
            ...ResponsiveImageFragment
          }
        }
      }
      ... on InternshipRecord {
        id
        title
        slug
        thumbnailImage {
          responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
            ...ResponsiveImageFragment
          }
        }
      }
      ... on GraduateArticleRecord {
        id
        title
        slug
        image {
          responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
            ...ResponsiveImageFragment
          }
        }
      }
      ... on CompanyRecord {
        id
        name
        slug
        thumbnailImage {
          responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
            ...ResponsiveImageFragment
          }
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
        {fragment.articles.map((article) => {
          const url = (() => {
            switch (article.__typename) {
              case "EventRecord":
                return `/events/${article.slug}`;
              case "GraduateArticleRecord":
                return `/graduates/${article.slug}`;
              case "InternshipRecord":
                return `/internships/${article.slug}`;
              case "StaticPageRecord":
                return `/static/${article.slug}`;
              case "CompanyRecord":
                return `/companies/${article.slug}`;
              default:
                // @ts-expect-error __typename is never
                throw new Error(`Invalid type: ${article.__typename}`);
            }
          })();
          return (
            <ArticleLink
              key={article.id}
              media={
                <ResponsiveImageWithFallback
                  aspectRatio={16 / 9}
                  data={
                    ("image" in article
                      ? article.image
                      : article.thumbnailImage
                    )?.responsiveImage
                  }
                />
              }
              title={("title" in article ? article.title : article.name) ?? ""}
              url={url}
            />
          );
        })}
      </div>
    </>
  );
}
