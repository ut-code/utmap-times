import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import { GraduateArticleIndexQuery } from "../../__generated__/GraduateArticleIndexQuery";

export default function GraduateArticleIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title="OBOG詳細記事">
      <Hero image="https://picsum.photos/800/600">
        <h1 className="text-4xl p-32">{props.allGraduateArticles[0].title}</h1>
      </Hero>
      <div className="p-32">{props.allGraduateArticles[0].content}</div>
      <Link href={`/graduates/${props.allGraduateArticles[0].slug}`}>
        <div>詳細ページへの移動</div>
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  const queryResult = await apolloClient.query<GraduateArticleIndexQuery>({
    query: gql`
      query GraduateArticleIndexQuery {
        allGraduateArticles {
          id
          title
          slug
          image {
            id
          }
          content
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
        }
      }
    `,
  });
  return {
    props: queryResult.data,
  };
}
