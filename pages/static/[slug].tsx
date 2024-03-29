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
import apolloClient from "../../utils/apollo";
import {
  GetStaticPageBySlugQuery,
  GetStaticPageBySlugQueryVariables,
} from "../../__generated__/GetStaticPageBySlugQuery";

export default function StaticPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.staticPage.title} seo={props.staticPage.seo}>
      <Hero
        image={
          props.staticPage.heroImage?.url ??
          props.staticPage.image?.url ??
          "/images/utmap.png"
        }
      >
        <h1 className="container mx-auto px-8 md:px-24 py-40 text-3xl">
          {props.staticPage.title}
        </h1>
      </Hero>
      <Banners />
      <ArticleContentContainer>
        <div className="md:px-8 lg:px-28 xl:px-36">
          <h2 className="pt-24 pb-16 text-3xl font-bold border-b-2">
            {props.staticPage.title}
          </h2>
          <SnsShareLinks />
          {props.staticPage.content && (
            <RichTextRenderer
              markdown={props.staticPage.content}
              className="pt-8 pb-20 border-b-2"
            />
          )}
          {props.staticPage.structuredContent && (
            <ArticleContentStructuredTextRenderer
              structuredText={props.staticPage.structuredContent}
            />
          )}
          <SnsShareLinks />
        </div>
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
    GetStaticPageBySlugQuery,
    GetStaticPageBySlugQueryVariables
  >({
    query: gql`
      ${layoutSeoFragment}
      ${articleContentStructuredTextArticleGalleryFragment}
      ${articleContentStructuredTextArticleLinkFragment}
      ${articleContentStructuredTextCallToActionButtonFragment}
      ${articleContentStructuredTextEmbeddedVideoFragment}
      ${articleContentStructuredTextEmbeddedImageFragment}
      ${articleStructuredTextContentPersonAndStatementFragment}
      query GetStaticPageBySlugQuery($slug: String!) {
        staticPage(filter: { slug: { eq: $slug } }) {
          title
          date
          slug
          image {
            url
          }
          heroImage {
            url
          }
          content
          structuredContent {
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
          seo {
            ...LayoutSeoFragment
          }
        }
      }
    `,
    variables: { slug },
  });

  const { staticPage } = queryResult.data;
  if (!staticPage) return { notFound: true, revalidate: 60 } as never;
  return { props: { staticPage }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
