import { gql } from "@apollo/client";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { articleContentStructuredTextArticleGalleryFragment } from "../../components/ArticleContentStructuredTextRenderer/ArticleGallery";
import { articleContentStructuredTextArticleLinkFragment } from "../../components/ArticleContentStructuredTextRenderer/ArticleLink";
import { articleContentStructuredTextCallToActionButtonFragment } from "../../components/ArticleContentStructuredTextRenderer/CallToActionButton";
import { articleContentStructuredTextEmbeddedImageFragment } from "../../components/ArticleContentStructuredTextRenderer/EmbeddedImage";
import { articleContentStructuredTextEmbeddedVideoFragment } from "../../components/ArticleContentStructuredTextRenderer/EmbeddedVideo";
import { articleStructuredTextContentPersonAndStatementFragment } from "../../components/ArticleContentStructuredTextRenderer/PersonAndStatement";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import Banners from "../../components/Banners";
import SnsShareLinks from "../../components/SnsShareLinks";
import apolloClient from "../../utils/apollo";
import {
  GetIndustryBySlugQuery,
  GetIndustryBySlugQueryVariables,
} from "../../__generated__/GetIndustryBySlugQuery";
import ArticleContentContainer from "../../components/ArticleContentContainer";
import ArticleContentStructuredTextRenderer from "../../components/ArticleContentStructuredTextRenderer";

export default function IndustryPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.industry.name}>
      <Hero image={props.industry.image?.url ?? "../../images/article.jpg"}>
        <div className="container mx-auto px-8 md:px-24 py-40">
          <h1 className="text-3xl">{props.industry.name}</h1>
        </div>
      </Hero>
      <Banners />
      <ArticleContentContainer>
        <div className="border-b-2 border-gray-300">
          <h2 className="pt-12 text-3xl font-bold">{props.industry.name}</h2>
          <SnsShareLinks />
        </div>
        <div className="pt-4 pb-10">
          {props.industry.description && (
            <ArticleContentStructuredTextRenderer
              structuredText={props.industry.description}
            />
          )}
        </div>
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
      query GetIndustryBySlugQuery($slug: String!) {
        industry(filter: { slug: { eq: $slug } }) {
          name
          image {
            url
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
