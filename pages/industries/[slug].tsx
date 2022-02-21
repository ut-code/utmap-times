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
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import AritcleLinkCompanyEvent from "../../components/ArticleLinkCompanyEvent";
import {
  GetIndustryBySlugQuery,
  GetIndustryBySlugQueryVariables,
} from "../../__generated__/GetIndustryBySlugQuery";

export default function IndustryPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.industry.name}>
      <Hero image={props.industry.image?.url ?? "/images/utmap.png"}>
        <div className="container mx-auto px-8 md:px-24 py-48">
          <h1 className="text-3xl">{props.industry.name}</h1>
        </div>
      </Hero>
      <Banners />
      <ArticleContentContainer>
        <div className="pt-24 pb-12">
          <h1 className="pl-2 text-2xl md:text-3xl font-bold">
            {props.industry.name}
          </h1>
        </div>
        {props.industry.image ? (
          <div className="mb-20">
            <img
              src={props.industry.image.url}
              alt="業界画像"
              className="w-full max-w-2xl mx-auto mt-8"
            />
          </div>
        ) : (
          <div className="mb-20" />
        )}
        <ul>
          {[
            {
              title: "業界概要",
              content: props.industry.description,
            },
          ].map(
            (description) =>
              description.content && (
                <li key={description.title} className="mb-24">
                  <div className="px-2">
                    <ArticleContentStructuredTextRenderer
                      structuredText={description.content}
                    />
                  </div>
                </li>
              )
          )}
        </ul>
        {!(props.industry.relatedCompanies.length === 0) && (
          <div className="w-full mb-16 pt-8 border-t-8 border-gray-100">
            <div className="mx-auto max-w-2xl pb-2 mb-4 text-center text-xl text-primary-main border-b-2 border-primary-main">
              関連企業
            </div>
            <ul className="mb-4 md:grid md:grid-cols-2 xl:grid-cols-3">
              {props.industry.relatedCompanies.map((article) => (
                <li key={article.id}>
                  <AritcleLinkCompanyEvent
                    title={article.name ?? ""}
                    url={`/graduates/${article.slug}`}
                    imageUrl={
                      article.thumbnailImage?.url ?? "/images/utmap.png"
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
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
    GetIndustryBySlugQuery,
    GetIndustryBySlugQueryVariables
  >({
    query: gql`
      ${articleContentStructuredTextArticleGalleryFragment}
      ${articleContentStructuredTextArticleLinkFragment}
      ${articleContentStructuredTextCallToActionButtonFragment}
      ${articleContentStructuredTextEmbeddedVideoFragment}
      ${articleContentStructuredTextEmbeddedImageFragment}
      ${articleStructuredTextContentPersonAndStatementFragment}
      query GetIndustryBySlugQuery($slug: String) {
        industry(filter: { slug: { eq: $slug } }) {
          id
          slug
          name
          image {
            url
            id
            responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
              ...ResponsiveImageFragment
            }
          }
          description {
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
          relatedCompanies {
            id
            slug
            name
            thumbnailImage {
              id
              url
            }
          }
        }
      }
    `,
    variables: { slug },
  });

  const { industry } = queryResult.data;
  if (!industry) return { notFound: true } as never;
  return { props: { industry }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
