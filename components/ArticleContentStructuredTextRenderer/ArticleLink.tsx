import { gql } from "@apollo/client";
import { Image } from "react-datocms";
import Link from "next/link";
import {
  normalizeResponsiveImage,
  responsiveImageFragment,
} from "../../utils/datocms";
import { ArticleContentStructuredTextArticleLinkFragment } from "../../__generated__/ArticleContentStructuredTextArticleLinkFragment";
import { placeholderResponsiveImage } from "../../utils/constant";

export const articleContentStructuredTextArticleLinkFragment = gql`
  ${responsiveImageFragment}
  fragment ArticleContentStructuredTextArticleLinkResponsiveImageFragment on FileField {
    id
    responsiveImage(imgixParams: { w: 400, h: 300 }) {
      ...ResponsiveImageFragment
    }
  }
  fragment ArticleContentStructuredTextArticleLinkFragment on ArticleLinkRecord {
    id
    article {
      ... on ClubRecord {
        id
        name
        images {
          ...ArticleContentStructuredTextArticleLinkResponsiveImageFragment
        }
      }
      ... on GraduateArticleRecord {
        id
        slug
        title
        image {
          ...ArticleContentStructuredTextArticleLinkResponsiveImageFragment
        }
      }
      ... on StaticPageRecord {
        id
        slug
        title
        image {
          ...ArticleContentStructuredTextArticleLinkResponsiveImageFragment
        }
      }
      ... on InternshipRecord {
        id
        slug
        title
        thumbnailImage {
          ...ArticleContentStructuredTextArticleLinkResponsiveImageFragment
        }
      }
      ... on EventRecord {
        id
        slug
        title
        thumbnailImage {
          ...ArticleContentStructuredTextArticleLinkResponsiveImageFragment
        }
      }
      ... on CompanyRecord {
        id
        slug
        name
        thumbnailImage {
          ...ArticleContentStructuredTextArticleLinkResponsiveImageFragment
        }
      }
    }
  }
`;

function normalizeArticleLink(
  // eslint-disable-next-line camelcase
  articleLink: ArticleContentStructuredTextArticleLinkFragment
) {
  const { article } = articleLink;
  if (!article) return null;

  switch (article.__typename) {
    case "ClubRecord":
      return {
        title: article.name,
        imageField: article.images[0],
        link: `/clubs/${article.id}`,
      };
    case "GraduateArticleRecord":
      return {
        title: article.title,
        imageField: article.image,
        link: `/graduates/${article.slug}`,
      };
    case "StaticPageRecord":
      return {
        title: article.title,
        imageField: article.image,
        link: `/static/${article.slug}`,
      };
    case "InternshipRecord":
      return {
        title: article.title,
        imageField: article.thumbnailImage,
        link: `/internships/${article.slug}`,
      };
    case "EventRecord":
      return {
        title: article.title,
        imageField: article.thumbnailImage,
        link: `/events/${article.slug}`,
      };
    case "CompanyRecord":
      return {
        title: article.name,
        imageField: article.thumbnailImage,
        link: `/companies/${article.slug}`,
      };
    default:
      // 実行されない
      return article;
  }
}

export default function ArticleContentStructuredTextArticleLink({
  fragment,
}: {
  fragment: ArticleContentStructuredTextArticleLinkFragment;
}) {
  const normalized = normalizeArticleLink(fragment);

  return (
    <Link href={normalized?.link ?? ""}>
      <a className="block lg:flex lg:items-center max-w-screen-md mx-auto p-6 lg:p-0 hover:bg-gray-100">
        <div className="flex-shrink-0 w-72 mx-auto mb-6 lg:m-0 lg:mr-4 border-8 border-secondary-main">
          <Image
            data={
              normalized?.imageField?.responsiveImage
                ? normalizeResponsiveImage(
                    normalized.imageField.responsiveImage
                  )
                : placeholderResponsiveImage
            }
          />
        </div>
        <div className="lg:p-6 text-lg lg:text-xl">{normalized?.title}</div>
      </a>
    </Link>
  );
}
