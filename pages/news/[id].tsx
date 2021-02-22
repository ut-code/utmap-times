import { gql } from "@apollo/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import {
  GetNewsArticleByIdQuery,
  GetNewsArticleByIdQueryVariables,
} from "../../__generated__/GetNewsArticleByIdQuery";
import { GetNewsArticlePathsQuery } from "../../__generated__/GetNewsArticlePathsQuery";

export default function NewsArticlePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.newsArticle.title}>
      <Hero image="https://picsum.photos/800/600" className="p-40">
        <h1 className="text-3xl">{props.newsArticle.title}</h1>
      </Hero>
    </Layout>
  );
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string }>) {
  const id = params?.id;
  if (!id) return { notFound: true } as never;

  const queryResult = await apolloClient.query<
    GetNewsArticleByIdQuery,
    GetNewsArticleByIdQueryVariables
  >({
    query: gql`
      query GetNewsArticleByIdQuery($id: ItemId!) {
        newsArticle(filter: { id: { eq: $id } }) {
          title
          content
          slug
        }
      }
    `,
    variables: { id },
  });

  const { newsArticle } = queryResult.data;
  if (!newsArticle) return { notFound: true } as never;
  return { props: { newsArticle } };
}

export async function getStaticPaths() {
  const queryResult = await apolloClient.query<GetNewsArticlePathsQuery>({
    query: gql`
      query GetNewsArticlePathsQuery {
        allNewsArticles {
          id
        }
      }
    `,
  });
  return {
    paths: queryResult.data.allNewsArticles.map((news) => ({
      params: { id: news.id },
    })),
    fallback: false,
  };
}
