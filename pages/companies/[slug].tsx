import { gql } from "@apollo/client";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import ArticleContentContainer from "../../components/ArticleContentContainer";
import ArticleContentStructuredTextRenderer from "../../components/ArticleContentStructuredTextRenderer";
import { articleContentStructuredTextArticleGalleryFragment } from "../../components/ArticleContentStructuredTextRenderer/ArticleGallery";
import { articleContentStructuredTextArticleLinkFragment } from "../../components/ArticleContentStructuredTextRenderer/ArticleLink";
import { articleContentStructuredTextCallToActionButtonFragment } from "../../components/ArticleContentStructuredTextRenderer/CallToActionButton";
import { articleContentStructuredTextEmbeddedImageFragment } from "../../components/ArticleContentStructuredTextRenderer/EmbeddedImage";
import { articleContentStructuredTextEmbeddedVideoFragment } from "../../components/ArticleContentStructuredTextRenderer/EmbeddedVideo";
import { articleStructuredTextContentPersonAndStatementFragment } from "../../components/ArticleContentStructuredTextRenderer/PersonAndStatement";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import Layout, { layoutSeoFragment } from "../../components/Layout";
import RichTextRenderer from "../../components/RichTextRenderer";
import SnsShareLinks from "../../components/SnsShareLinks";
import Carousel from "../../components/Carousel";
import AritcleLinkCompanyEvent from "../../components/ArticleLinkCompanyEvent";
import apolloClient from "../../utils/apollo";
import SnsShareRoundLinks from "../../components/SnsShareRoundLinks";
import ResponsiveImageWithFallback from "../../components/ResponsiveImageWithFallback";
import {
  GetCompanyBySlugQuery,
  GetCompanyBySlugQueryVariables,
} from "../../__generated__/GetCompanyBySlugQuery";

export default function CompanyPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.company.name} seo={props.company.seo}>
      <Hero image={props.company.heroImage?.url ?? "/images/utmap.png"}>
        <div className="container mx-auto px-8 md:px-24 py-48">
          <h1 className="text-3xl">{props.company.name}</h1>
        </div>
      </Hero>
      <Banners />
      <ArticleContentContainer>
        <div className="pt-24 pb-12">
          <img
            className="w-24 lg:w-48 ml-2 float-right object-contain"
            alt={props.company.logo?.alt ?? ""}
            src={props.company.logo?.url}
          />
          <h1 className="pl-2 text-2xl md:text-3xl font-bold">
            {props.company.name}
          </h1>
        </div>
        <SnsShareLinks />
        {props.company.topImage ? (
          <div className="mb-20">
            <img
              src={props.company.topImage.url}
              alt="イベント画像"
              className="w-full max-w-2xl mx-auto mt-8"
            />
          </div>
        ) : (
          <div className="mb-20" />
        )}
        <div className="mb-24">
          <div className="p-4 bg-gray-100 text-xl font-bold">基礎情報</div>
          <ul>
            {[
              {
                title: "ホームページのリンク",
                content: props.company.companyHpUrl,
              },
              { title: "設立日（年月）", content: props.company.establishedAt },
              { title: "本社住所", content: props.company.location },
              { title: "従業員数", content: props.company.employeesNumber },
              { title: "海外事業所", content: props.company.foreignLocation },
              {
                title: "採用ページのリンク",
                content: props.company.recruitHpUrl,
              },
            ].map(
              (information) =>
                information.content && (
                  <li
                    key={information.title}
                    className="flex px-4 border-b items-center"
                  >
                    <p className="w-44 lg:w-64 flex-none font-bold">
                      {information.title}
                    </p>
                    <RichTextRenderer
                      markdown={information.content}
                      className="my-6"
                    />
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="container mx-auto text-center">
          {props.company.entryUrl && (
            <a
              target="_blank"
              rel="noreferrer"
              className="inline-block px-12 py-3 mb-16 text-sm font-bold bg-primary-main text-white"
              href={props.company.entryUrl ?? ""}
            >
              エントリーはこちら
            </a>
          )}
        </div>
        <ul>
          {[
            {
              title: "会社概要",
              content: props.company.companyDescription,
              hasContent: props.company.hasCompanyDescription,
            },
            {
              title: "事業内容",
              content: props.company.businessDescription,
              hasContent: props.company.hasBusinessDescription,
            },
            {
              title: "企業理念",
              content: props.company.corporateIdentity,
              hasContent: props.company.hasCorporateIdentity,
            },
            {
              title: "企業理念について",
              content: props.company.corporateIdentityDescription,
              hasContent: props.company.hasCareerVision,
            },
          ].map(
            (description) =>
              description.content &&
              description.hasContent && (
                <li key={description.title} className="mb-24">
                  <div className="p-4 bg-gray-100 text-xl font-bold">
                    {description.title}
                  </div>
                  <div className="px-2">
                    <ArticleContentStructuredTextRenderer
                      structuredText={description.content}
                    />
                  </div>
                </li>
              )
          )}
        </ul>
      </ArticleContentContainer>

      <Carousel
        aspectRatio={16 / 9}
        cards={props.company.images.map((image) => ({
          key: image.id,
          content: (
            <ResponsiveImageWithFallback
              aspectRatio={16 / 9}
              lazyLoad={false}
              data={image.responsiveImage}
            />
          ),
        }))}
      />

      <ArticleContentContainer>
        <ul className="mt-24 mb-24 space-y-24">
          {[
            {
              title: "学生へのメッセージ",
              content: props.company.toStudentsMessage,
              hasContent: props.company.hasToStudentsMessage,
            },
            {
              title: "開けるキャリア展望",
              content: props.company.careerVision,
              hasContent: props.company.hasCareerVision,
            },
            {
              title: "福利厚生",
              content: props.company.welfare,
              hasContent: props.company.hasWelfare,
            },
            {
              title: "その他",
              content: props.company.others,
              hasContent: props.company.hasOthers,
            },
          ].map(
            (description) =>
              description.content &&
              description.hasContent && (
                <li key={description.title}>
                  <div className="p-4 bg-gray-100 text-xl font-bold">
                    {description.title}
                  </div>
                  <div className="px-2">
                    <ArticleContentStructuredTextRenderer
                      structuredText={description.content}
                    />
                  </div>
                </li>
              )
          )}
        </ul>
        {!props.company.twitter &&
        !props.company.instagram &&
        !props.company.facebook ? (
          <div />
        ) : (
          <div className="mb-20">
            <div className="p-4 bg-gray-100 text-xl font-bold">SNS</div>
            <SnsShareRoundLinks
              twitterUrl={props.company.twitter ?? ""}
              instagramUrl={props.company.instagram ?? ""}
              facebookUrl={props.company.facebook ?? ""}
              className="pt-6"
            />
          </div>
        )}
        {props.company.events.length === 0 &&
        props.company.internships.length === 0 ? (
          <div />
        ) : (
          <div className="w-full mb-16 pt-8 border-t-8 border-gray-100">
            <div className="mx-auto max-w-2xl pb-2 mb-4 text-center text-xl text-primary-main border-b-2 border-primary-main">
              募集中イベント
            </div>
            <ul className="mb-4 md:grid md:grid-cols-2 xl:grid-cols-3">
              {props.company.events.map((event) => (
                <li key={event.id}>
                  <AritcleLinkCompanyEvent
                    title={event.title ?? ""}
                    url={`/events/${event.slug}`}
                    imageUrl={event.thumbnailImage?.url ?? "/images/utmap.png"}
                  />
                </li>
              ))}
              {props.company.internships.map((internship) => (
                <li key={internship.id}>
                  <AritcleLinkCompanyEvent
                    title={internship.title ?? ""}
                    url={`/internships/${internship.slug}`}
                    imageUrl={
                      internship.thumbnailImage?.url ?? "/images/utmap.png"
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        {!(props.company.relatedArticles.length === 0) && (
          <div className="w-full mb-16 pt-8 border-t-8 border-gray-100">
            <div className="mx-auto max-w-2xl pb-2 mb-4 text-center text-xl text-primary-main border-b-2 border-primary-main">
              関連記事
            </div>
            <ul className="mb-4 md:grid md:grid-cols-2 xl:grid-cols-3">
              {props.company.relatedArticles.map((article) => (
                <li key={article.id}>
                  <AritcleLinkCompanyEvent
                    title={article.title ?? ""}
                    url={`/graduates/${article.slug}`}
                    imageUrl={article.image?.url ?? "/images/utmap.png"}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <SnsShareLinks />
      </ArticleContentContainer>
    </Layout>
  );
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params?.slug;
  if (!slug) return { notFound: true, revalidate: 60 } as never;

  const queryResult = await apolloClient.query<
    GetCompanyBySlugQuery,
    GetCompanyBySlugQueryVariables
  >({
    query: gql`
      ${layoutSeoFragment}
      ${articleContentStructuredTextArticleGalleryFragment}
      ${articleContentStructuredTextArticleLinkFragment}
      ${articleContentStructuredTextCallToActionButtonFragment}
      ${articleContentStructuredTextEmbeddedVideoFragment}
      ${articleContentStructuredTextEmbeddedImageFragment}
      ${articleStructuredTextContentPersonAndStatementFragment}
      query GetCompanyBySlugQuery($slug: String!) {
        company(filter: { isDisplayed: { eq: true }, slug: { eq: $slug } }) {
          id
          name
          seo {
            ...LayoutSeoFragment
          }
          heroImage {
            url
          }
          topImage {
            url(imgixParams: { maxW: 600 })
          }
          images {
            url
            id
            responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
              ...ResponsiveImageFragment
            }
          }
          logo {
            id
            alt
            url(imgixParams: { maxW: 400 })
          }
          companyHpUrl
          recruitHpUrl
          establishedAt
          location
          foreignLocation
          employeesNumber
          leader
          entryUrl
          twitter
          instagram
          facebook
          industry {
            id
            name
          }
          hasCompanyDescription
          companyDescription {
            blocks {
              ... on ArticleGalleryRecord {
                ...ArticleContentStructuredTextArticleGalleryFragment
              }
              ... on ArticleLinkRecord {
                ...ArticleContentStructuredTextArticleLinkFragment
              }
              ... on CallToActionButtonRecord {
                ...ArticleContentStructuredTextCallToActionButtonFragment
              }
              ... on EmbeddedVideoRecord {
                ...ArticleContentStructuredTextEmbeddedVideoFragment
              }
              ... on EmbeddedImageRecord {
                ...ArticleContentStructuredTextEmbeddedImageFragment
              }
              ... on PersonAndStatementRecord {
                ...ArticleContentStructuredTextPersonAndStatementFragment
              }
            }
            value
          }
          hasBusinessDescription
          businessDescription {
            blocks {
              ... on ArticleGalleryRecord {
                ...ArticleContentStructuredTextArticleGalleryFragment
              }
              ... on ArticleLinkRecord {
                ...ArticleContentStructuredTextArticleLinkFragment
              }
              ... on CallToActionButtonRecord {
                ...ArticleContentStructuredTextCallToActionButtonFragment
              }
              ... on EmbeddedVideoRecord {
                ...ArticleContentStructuredTextEmbeddedVideoFragment
              }
              ... on EmbeddedImageRecord {
                ...ArticleContentStructuredTextEmbeddedImageFragment
              }
              ... on PersonAndStatementRecord {
                ...ArticleContentStructuredTextPersonAndStatementFragment
              }
            }
            value
          }
          hasCorporateIdentity
          corporateIdentity {
            blocks {
              ... on ArticleGalleryRecord {
                ...ArticleContentStructuredTextArticleGalleryFragment
              }
              ... on ArticleLinkRecord {
                ...ArticleContentStructuredTextArticleLinkFragment
              }
              ... on CallToActionButtonRecord {
                ...ArticleContentStructuredTextCallToActionButtonFragment
              }
              ... on EmbeddedVideoRecord {
                ...ArticleContentStructuredTextEmbeddedVideoFragment
              }
              ... on EmbeddedImageRecord {
                ...ArticleContentStructuredTextEmbeddedImageFragment
              }
              ... on PersonAndStatementRecord {
                ...ArticleContentStructuredTextPersonAndStatementFragment
              }
            }
            value
          }
          hasCorporateIdentityDescription
          corporateIdentityDescription {
            blocks {
              ... on ArticleGalleryRecord {
                ...ArticleContentStructuredTextArticleGalleryFragment
              }
              ... on ArticleLinkRecord {
                ...ArticleContentStructuredTextArticleLinkFragment
              }
              ... on CallToActionButtonRecord {
                ...ArticleContentStructuredTextCallToActionButtonFragment
              }
              ... on EmbeddedVideoRecord {
                ...ArticleContentStructuredTextEmbeddedVideoFragment
              }
              ... on EmbeddedImageRecord {
                ...ArticleContentStructuredTextEmbeddedImageFragment
              }
              ... on PersonAndStatementRecord {
                ...ArticleContentStructuredTextPersonAndStatementFragment
              }
            }
            value
          }
          hasToStudentsMessage
          toStudentsMessage {
            blocks {
              ... on ArticleGalleryRecord {
                ...ArticleContentStructuredTextArticleGalleryFragment
              }
              ... on ArticleLinkRecord {
                ...ArticleContentStructuredTextArticleLinkFragment
              }
              ... on CallToActionButtonRecord {
                ...ArticleContentStructuredTextCallToActionButtonFragment
              }
              ... on EmbeddedVideoRecord {
                ...ArticleContentStructuredTextEmbeddedVideoFragment
              }
              ... on EmbeddedImageRecord {
                ...ArticleContentStructuredTextEmbeddedImageFragment
              }
              ... on PersonAndStatementRecord {
                ...ArticleContentStructuredTextPersonAndStatementFragment
              }
            }
            value
          }
          hasCareerVision
          careerVision {
            blocks {
              ... on ArticleGalleryRecord {
                ...ArticleContentStructuredTextArticleGalleryFragment
              }
              ... on ArticleLinkRecord {
                ...ArticleContentStructuredTextArticleLinkFragment
              }
              ... on CallToActionButtonRecord {
                ...ArticleContentStructuredTextCallToActionButtonFragment
              }
              ... on EmbeddedVideoRecord {
                ...ArticleContentStructuredTextEmbeddedVideoFragment
              }
              ... on EmbeddedImageRecord {
                ...ArticleContentStructuredTextEmbeddedImageFragment
              }
              ... on PersonAndStatementRecord {
                ...ArticleContentStructuredTextPersonAndStatementFragment
              }
            }
            value
          }
          hasWelfare
          welfare {
            blocks {
              ... on ArticleGalleryRecord {
                ...ArticleContentStructuredTextArticleGalleryFragment
              }
              ... on ArticleLinkRecord {
                ...ArticleContentStructuredTextArticleLinkFragment
              }
              ... on CallToActionButtonRecord {
                ...ArticleContentStructuredTextCallToActionButtonFragment
              }
              ... on EmbeddedVideoRecord {
                ...ArticleContentStructuredTextEmbeddedVideoFragment
              }
              ... on EmbeddedImageRecord {
                ...ArticleContentStructuredTextEmbeddedImageFragment
              }
              ... on PersonAndStatementRecord {
                ...ArticleContentStructuredTextPersonAndStatementFragment
              }
            }
            value
          }
          hasOthers
          others {
            blocks {
              ... on ArticleGalleryRecord {
                ...ArticleContentStructuredTextArticleGalleryFragment
              }
              ... on ArticleLinkRecord {
                ...ArticleContentStructuredTextArticleLinkFragment
              }
              ... on CallToActionButtonRecord {
                ...ArticleContentStructuredTextCallToActionButtonFragment
              }
              ... on EmbeddedVideoRecord {
                ...ArticleContentStructuredTextEmbeddedVideoFragment
              }
              ... on EmbeddedImageRecord {
                ...ArticleContentStructuredTextEmbeddedImageFragment
              }
              ... on PersonAndStatementRecord {
                ...ArticleContentStructuredTextPersonAndStatementFragment
              }
            }
            value
          }
          events {
            id
            slug
            thumbnailImage {
              id
              url
              responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
                ...ResponsiveImageFragment
              }
            }
            title
          }
          internships {
            id
            slug
            thumbnailImage {
              id
              url
              responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
                ...ResponsiveImageFragment
              }
            }
            title
          }
          relatedArticles {
            id
            slug
            title
            image {
              id
              url
              responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
                ...ResponsiveImageFragment
              }
            }
          }
        }
      }
    `,
    variables: { slug },
  });

  const { company } = queryResult.data;
  if (!company) return { notFound: true, revalidate: 60 } as never;
  return { props: { company }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
