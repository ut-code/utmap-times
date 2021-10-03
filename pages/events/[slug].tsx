import { gql } from "@apollo/client";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { Image } from "react-datocms";
import ArticleContentContainer from "../../components/ArticleContentContainer";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import Layout, { layoutSeoFragment } from "../../components/Layout";
import RichTextRenderer from "../../components/RichTextRenderer";
import SnsShareLinks from "../../components/SnsShareLinks";
import apolloClient from "../../utils/apollo";
import {
  GetEventBySlugQuery,
  GetEventBySlugQueryVariables,
} from "../../__generated__/GetEventBySlugQuery";
import { articleContentStructuredTextArticleGalleryFragment } from "../../components/ArticleContentStructuredTextRenderer/ArticleGallery";
import { articleContentStructuredTextArticleLinkFragment } from "../../components/ArticleContentStructuredTextRenderer/ArticleLink";
import { articleContentStructuredTextCallToActionButtonFragment } from "../../components/ArticleContentStructuredTextRenderer/CallToActionButton";
import { articleContentStructuredTextEmbeddedVideoFragment } from "../../components/ArticleContentStructuredTextRenderer/EmbeddedVideo";
import { articleContentStructuredTextEmbeddedImageFragment } from "../../components/ArticleContentStructuredTextRenderer/EmbeddedImage";
import { articleStructuredTextContentPersonAndStatementFragment } from "../../components/ArticleContentStructuredTextRenderer/PersonAndStatement";
import ArticleContentStructuredTextRenderer from "../../components/ArticleContentStructuredTextRenderer";
import Carousel from "../../components/Carousel";
import { normalizeResponsiveImage } from "../../utils/datocms";
import { placeholderResponsiveImage } from "../../utils/constant";

export default function EventPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  dayjs.locale(ja);
  const applicationDeadlineString = dayjs(
    props.event.applicationDeadline
  ).format("YYYY/MM/DD(dd) HH:mm");
  return (
    <Layout title={props.event.title} seo={props.event.seo}>
      <Hero image={props.event.heroImage?.url ?? "../../images/article.jpg"}>
        <div className="container mx-auto px-8 md:px-24 py-40">
          <h1 className="text-3xl">{props.event.title}</h1>
        </div>
      </Hero>
      <Banners />
      <ArticleContentContainer>
        <div className="mt-24 relative">
          <img
            src={props.event.company?.logo?.url}
            alt="会社ロゴ"
            className="absolute w-20 md:w-28 right-0 top-0"
          />
          <div className="flex">
            {props.event.isRecruiting ? (
              <p className="bg-secondary-main py-1 px-6 text-white">募集中</p>
            ) : (
              <p className="bg-secondary-main py-1 px-6 text-white">募集締切</p>
            )}
            <p className="px-5 py-1">
              {props.event.updatedAt.substr(0, 10).replace(/-/g, "/")}
            </p>
          </div>
        </div>
        <h3 className="pt-8 text-xl font-bold">{props.event.company?.name}</h3>
        <h2 className="py-8 text-3xl font-bold">{props.event.title}</h2>
        <div className="pb-10 border-b-2">
          {props.event.targets.map((target) => (
            <p
              key={target.id}
              className="px-4 py-1 mr-2 mb-2 bg-gray-200 inline-block"
            >
              # {target.name}
            </p>
          ))}
          {props.event.features.map((feature) => (
            <p
              key={feature.id}
              className="px-4 py-1 mr-2 mb-2 bg-gray-200 inline-block"
            >
              # {feature.name}
            </p>
          ))}
        </div>
        <SnsShareLinks />
        {props.event.topImage && (
          <img
            src={props.event.topImage.url}
            alt="イベント画像"
            className="w-full max-w-3xl mx-auto mb-12"
          />
        )}
        <div className="p-4 bg-gray-100 text-xl font-bold">イベント内容</div>
        {props.event.description && (
          <RichTextRenderer
            markdown={props.event.description ?? ""}
            className="pt-4 pb-10"
          />
        )}
        {props.event.structuredDescription && (
          <ArticleContentStructuredTextRenderer
            structuredText={props.event.structuredDescription}
          />
        )}
        <div className="p-4 bg-gray-100 text-xl font-bold">会社概要</div>
        <div className="pt-4 pb-10">
          {props.event.company?.companyDescription && (
            <ArticleContentStructuredTextRenderer
              structuredText={props.event.company.companyDescription}
            />
          )}
        </div>
      </ArticleContentContainer>

      <Carousel
        aspectRatio={9 / 16}
        cards={props.event.images.map((image) => ({
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

      <ArticleContentContainer className="pt-10 pb-16">
        <div className="p-4 bg-gray-100 text-xl font-bold">企業情報</div>
        <ul className="pb-10">
          {[
            { title: "社名", content: props.event.company?.name },
            { title: "業界", content: props.event.company?.industry?.name },
            { title: "所在地", content: props.event.company?.location },
            { title: "URL", content: props.event.company?.companyHpUrl },
          ].map(
            (information) =>
              information.content && (
                <li key={information.title} className="flex border-b">
                  <div className="w-48 p-4 font-bold">{information.title}</div>
                  <div className="flex-1 p-4">{information.content}</div>
                </li>
              )
          )}
        </ul>
        <div className="p-2 mb-4 border-b-2 border-secondary-main text-2xl font-bold">
          開催要項
        </div>
        <ul className="pb-10">
          {[
            {
              title: "日時",
              content: <p className="p-4">{props.event.schedule}</p>,
            },
            ...(props.event.timeSchedule
              ? [
                  {
                    title: "タイムスケジュール",
                    content: props.event.timeSchedule && (
                      <RichTextRenderer
                        className="px-4"
                        markdown={props.event.timeSchedule}
                      />
                    ),
                  },
                ]
              : []),
            {
              title: "場所",
              content: <p className="p-4">{props.event.location}</p>,
            },
            {
              title: "申し込み締切",
              content: <p className="p-4">{applicationDeadlineString}</p>,
            },
          ].map((information) => (
            <li key={information.title} className="flex border-b">
              <div className="w-48 p-4 font-bold">{information.title}</div>
              <div className="flex-1">{information.content}</div>
            </li>
          ))}
        </ul>
        <div className="p-2 mb-4 border-b-2 border-secondary-main text-2xl font-bold">
          参加要項
        </div>
        <ul className="pb-10">
          {[
            { title: "募集対象", list: props.event.targets },
            { title: "定員", content: props.event.capacity },
            { title: "参加費", content: props.event.participationFee },
            { title: "持ち物", content: props.event.thingsToBring },
          ].map((information) => (
            <li key={information.title} className="relative p-4 border-b">
              <p className="inline-block font-bold">{information.title}</p>
              {information.title === "募集対象" ? (
                <div className="absolute left-44 inline-block">
                  {information.list?.map((target, index) =>
                    index === 0 ? (
                      <p key={target.name} className="inline-block">
                        {target.name}
                      </p>
                    ) : (
                      <p key={target.name} className="inline-block">
                        、{target.name}
                      </p>
                    )
                  )}
                </div>
              ) : (
                <p className="absolute left-44 inline-block">
                  {information.content}
                </p>
              )}
            </li>
          ))}
        </ul>
        <div className="p-2 border-b-2 border-secondary-main text-2xl font-bold">
          備考
        </div>
        <RichTextRenderer
          markdown={props.event.remarks ?? ""}
          className="p-4"
        />
      </ArticleContentContainer>
      <div className="bg-primary-main">
        <div className="container mx-auto py-16 text-center">
          <p className="pb-8 bg-primary-main text-2xl text-white">
            このイベントに応募する
          </p>
          <Link href={props.event.applicationLink ?? ""}>
            <a className="inline-block px-12 py-3 text-sm font-bold bg-white text-primary-main">
              応募する
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params?.slug;
  if (!slug) return { notFound: true } as never;

  const queryResult = await apolloClient.query<
    GetEventBySlugQuery,
    GetEventBySlugQueryVariables
  >({
    query: gql`
      ${layoutSeoFragment}
      ${articleContentStructuredTextArticleGalleryFragment}
      ${articleContentStructuredTextArticleLinkFragment}
      ${articleContentStructuredTextCallToActionButtonFragment}
      ${articleContentStructuredTextEmbeddedVideoFragment}
      ${articleContentStructuredTextEmbeddedImageFragment}
      ${articleStructuredTextContentPersonAndStatementFragment}
      query GetEventBySlugQuery($slug: String!) {
        event(filter: { slug: { eq: $slug } }) {
          title
          seo {
            ...LayoutSeoFragment
          }
          heroImage {
            url
          }
          topImage {
            url
          }
          images {
            url
            id
            responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
              ...ResponsiveImageFragment
            }
          }
          updatedAt
          company {
            name
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
            industry {
              name
              slug
            }
            location
            companyHpUrl
            logo {
              url
            }
          }
          category {
            name
          }
          isRecruiting
          targets {
            id
            name
          }
          features {
            id
            name
          }
          structuredDescription {
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
          description
          schedule
          startsAt
          timeSchedule
          location
          applicationDeadline
          participationFee
          capacity
          thingsToBring
          remarks
          applicationLink
        }
      }
    `,
    variables: { slug },
  });

  const { event } = queryResult.data;
  if (!event) return { notFound: true } as never;
  return { props: { event }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
