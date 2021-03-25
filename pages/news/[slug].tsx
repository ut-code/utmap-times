import { gql } from "@apollo/client";
import dayjs from "dayjs";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import RichTextRenderer from "../../components/RichTextRenderer";
import SnsShareLinks from "../../components/SnsShareLinks";
import apolloClient from "../../utils/apollo";
import {
  GetNewsArticleBySlugQuery,
  GetNewsArticleBySlugQueryVariables,
} from "../../__generated__/GetNewsArticleBySlugQuery";

export default function NewsArticlePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.newsArticle.title}>
      <Hero image="/images/utmap.png">
        <div className="container mx-auto px-8 md:px-24 py-48">
          <h1 className="text-3xl">{props.newsArticle.title}</h1>
        </div>
      </Hero>
      <Banners />
      <div className="container mx-auto px-8 md:px-24">
        <div className="pt-28 border-b-2">
          <time>{dayjs(props.newsArticle.updatedAt).format("YYYY/MM/DD")}</time>
          <h1 className="py-8 text-3xl font-bold">{props.newsArticle.title}</h1>
        </div>
        <SnsShareLinks />
        <RichTextRenderer markdown={props.newsArticle.content ?? ""} />
        <SnsShareLinks />
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
    GetNewsArticleBySlugQuery,
    GetNewsArticleBySlugQueryVariables
  >({
    query: gql`
      query GetNewsArticleBySlugQuery($slug: String!) {
        newsArticle(filter: { slug: { eq: $slug } }) {
          title
          content
          slug
          updatedAt
        }
      }
    `,
    variables: { slug },
  });

  const { newsArticle } = queryResult.data;
  if (!newsArticle) return { notFound: true } as never;
  return { props: { newsArticle }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
