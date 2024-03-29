import { gql } from "@apollo/client";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { Image } from "react-datocms";
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
import { placeholderResponsiveImage } from "../../utils/constant";
import { normalizeResponsiveImage } from "../../utils/datocms";
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
        <img
          className="w-24 h-24 lg:w-48 lg:h-48 mt-20 float-right object-cover"
          alt={props.company.logo?.alt ?? ""}
          src={props.company.logo?.url}
        />
        <h1 className="pl-2 pt-24 pb-16 text-2xl md:text-3xl font-bold">
          {props.company.name}
        </h1>
        <SnsShareLinks />
        <div className="mb-8">
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
                      className="my-4"
                    />
                  </li>
                )
            )}
          </ul>
        </div>
        <ul>
          {[
            { title: "会社概要", content: props.company.companyDescription },
            { title: "事業内容", content: props.company.businessDescription },
            { title: "企業理念", content: props.company.corporateIdentity },
            {
              title: "企業理念について",
              content: props.company.corporateIdentityDescription,
            },
          ].map(
            (description) =>
              description.content && (
                <li key={description.title} className="pb-8">
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
        aspectRatio={9 / 16}
        cards={props.company.images.map((image) => ({
          key: image.id,
          content: (
            <Image
              lazyLoad={false}
              className="w-full h-full"
              data={
                image.responsiveImage
                  ? normalizeResponsiveImage(image.responsiveImage)
                  : placeholderResponsiveImage
              }
            />
          ),
        }))}
      />

      <ArticleContentContainer>
        <ul className="pt-8">
          {[
            {
              title: "学生へのメッセージ",
              content: props.company.toStudentsMessage,
            },
            {
              title: "貴社に就職することで開けるキャリア展望",
              content: props.company.careerVision,
            },
          ].map(
            (description) =>
              description.content && (
                <li key={description.title} className="pb-8">
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
        <div className="w-full mt-4 pt-8 border-t-8 border-gray-100">
          <div className="mx-auto max-w-2xl pb-2 mb-4 text-center text-xl text-primary-main border-b-2 border-primary-main">
            募集中イベント
          </div>
          <ul className="mb-4 md:grid md:grid-cols-2 xl:grid-cols-3">
            {props.company.events.map((event) => (
              <li key={event.id}>
                <AritcleLinkCompanyEvent
                  title={event.title ?? ""}
                  url={`events/${event.slug}`}
                  imageUrl={event.thumbnailImage?.url ?? "/images/utmap.png"}
                />
              </li>
            ))}
            {props.company.internships.map((internship) => (
              <li key={internship.id}>
                <AritcleLinkCompanyEvent
                  title={internship.title ?? ""}
                  url={`internships/${internship.slug}`}
                  imageUrl={
                    internship.thumbnailImage?.url ?? "/images/utmap.png"
                  }
                />
              </li>
            ))}
          </ul>
        </div>
        <SnsShareLinks />
      </ArticleContentContainer>
    </Layout>
  );
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params?.slug;
  if (!slug) return { notFound: true } as never;

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
          industry {
            id
            name
          }
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
        }
      }
    `,
    variables: { slug },
  });

  const { company } = queryResult.data;
  if (!company) return { notFound: true } as never;
  return { props: { company }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
