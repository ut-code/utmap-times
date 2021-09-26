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
import SnsShareLinks from "../../components/SnsShareLinks";
import apolloClient from "../../utils/apollo";
import {
  GetCareerStrategyArticleBySlugQuery,
  GetCareerStrategyArticleBySlugQueryVariables,
} from "../../__generated__/GetCareerStrategyArticleBySlugQuery";

export default function CareerStrategyPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout
      title={props.careerStrategyArticle.title}
      seo={props.careerStrategyArticle.seo}
    >
      <Hero
        image={
          props.careerStrategyArticle.heroImage?.url ?? `/images/utmap.png`
        }
      >
        <div className="container mx-auto px-8 md:px-24 py-48">
          <h1 className="text-3xl">{props.careerStrategyArticle.title}</h1>
        </div>
      </Hero>
      <Banners />
      <ArticleContentContainer>
        <h1 className="mt-24 mb-8 text-3xl font-bold">
          {props.careerStrategyArticle.title}
        </h1>
        <SnsShareLinks />
        <ArticleContentStructuredTextRenderer
          structuredText={props.careerStrategyArticle.content}
        />
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
    GetCareerStrategyArticleBySlugQuery,
    GetCareerStrategyArticleBySlugQueryVariables
  >({
    query: gql`
      ${layoutSeoFragment}
      ${articleContentStructuredTextArticleGalleryFragment}
      ${articleContentStructuredTextArticleLinkFragment}
      ${articleContentStructuredTextCallToActionButtonFragment}
      ${articleContentStructuredTextEmbeddedVideoFragment}
      ${articleContentStructuredTextEmbeddedImageFragment}
      ${articleStructuredTextContentPersonAndStatementFragment}
      query GetCareerStrategyArticleBySlugQuery($slug: String!) {
        careerStrategyArticle(filter: { slug: { eq: $slug } }) {
          id
          title
          heroImage {
            url
          }
          seo {
            ...LayoutSeoFragment
          }
          content {
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

  const { careerStrategyArticle } = queryResult.data;
  if (!careerStrategyArticle) return { notFound: true } as never;
  return { props: { careerStrategyArticle }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
