import { gql } from "@apollo/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import {
  GetGraduateArticleBySlugQuery,
  GetGraduateArticleBySlugQueryVariables,
} from "../../__generated__/GetGraduateArticleBySlugQuery";
import { GetGraduateArticlePathsQuery } from "../../__generated__/GetGraduateArticlePathsQuery";

export default function GraduateArticlePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.graduateArticle.title}>
      <Hero image="https://picsum.photos/800/600" className="p-40">
        <h1 className="text-3xl">{props.graduateArticle.title}</h1>
      </Hero>
    </Layout>
  );
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params?.slug;
  if (!slug) return { notFound: true } as never;

  const queryResult = await apolloClient.query<
    GetGraduateArticleBySlugQuery,
    GetGraduateArticleBySlugQueryVariables
  >({
    query: gql`
      query GetGraduateArticleBySlugQuery($slug: String!) {
        graduateArticle(filter: { slug: { eq: $slug } }) {
          title
          category {
            id
            name
            slug
          }
          tags {
            id
            name
            slug
          }
          image {
            url
          }
        }
      }
    `,
    variables: { slug },
  });

  const { graduateArticle } = queryResult.data;
  if (!graduateArticle) return { notFound: true } as never;
  return { props: { graduateArticle } };
}

export async function getStaticPaths() {
  const queryResult = await apolloClient.query<GetGraduateArticlePathsQuery>({
    query: gql`
      query GetGraduateArticlePathsQuery {
        allGraduateArticles {
          slug
        }
      }
    `,
  });
  return {
    paths: queryResult.data.allGraduateArticles.map((graduateArticle) => ({
      params: { slug: graduateArticle.slug },
    })),
    fallback: false,
  };
}
