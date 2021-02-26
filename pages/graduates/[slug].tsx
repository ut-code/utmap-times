import { gql } from "@apollo/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
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
      <Hero image="https://picsum.photos/800/600">
        <div className="container mx-auto px-8 md:px-24 py-48">
          <p className="inline-block bg-yellow-700 py-1 px-6 mb-6 text-white">
            {props.graduateArticle.category?.name}
          </p>
          <h1 className="text-3xl">{props.graduateArticle.title}</h1>
        </div>
      </Hero>
      <div className="container mx-auto px-8 md:px-24">
        <div className="pt-24 flex">
          <p className="bg-yellow-700 py-1 px-6 text-white">
            {props.graduateArticle.category?.name}
          </p>
          <p className="px-5 py-2">{props.graduateArticle.date}</p>
        </div>
        <h2 className="py-8 text-3xl font-bold">
          {props.graduateArticle.title}
        </h2>
        <div className="pb-10 flex border-b-2">
          <p className="px-4 py-1 bg-gray-200">
            # {props.graduateArticle.tags[0].name}
          </p>
        </div>
        <div className="pt-8 pb-12 flex">
          <button
            type="button"
            className="py-1 w-40 mr-2 bg-blue-400 hover:bg-blue-900"
          >
            <FaTwitter className="inline-block text-white" />
            <p className="inline-block pl-1 text-white">ツイート</p>
          </button>
          <button
            type="button"
            className="py-1 w-40 mr-2 bg-blue-600 hover:bg-blue-900"
          >
            <FaFacebookF className="inline-block text-white" />
            <p className="inline-block pl-1 text-white">シェア</p>
          </button>
          <button
            type="button"
            className="py-1 w-40 bg-blue-800 hover:bg-blue-900"
          >
            <p className="inline-block pl-1 text-white">リンクをコピー</p>
          </button>
        </div>
        <img src={props.graduateArticle.image[0].url} alt="画像" />
        <p className="pt-8 pb-20 border-b-2">{props.graduateArticle.content}</p>
        <div className="pt-8 pb-32 flex">
          <button
            type="button"
            className="py-1 w-40 mr-2 bg-blue-400 hover:bg-blue-900"
          >
            <FaTwitter className="inline-block text-white" />
            <p className="inline-block pl-1 text-white">ツイート</p>
          </button>
          <button
            type="button"
            className="py-1 w-40 mr-2 bg-blue-600 hover:bg-blue-900"
          >
            <FaFacebookF className="inline-block text-white" />
            <p className="inline-block pl-1 text-white">シェア</p>
          </button>
          <button
            type="button"
            className="py-1 w-40 bg-blue-800 hover:bg-blue-900"
          >
            <p className="inline-block pl-1 text-white">リンクをコピー</p>
          </button>
        </div>
      </div>
      <div className="text-center h-96 py-12 bg-gray-100">
        <p className="text-4xl font-bold">RECOMMEND</p>
        <p className="text-yellow-500">おすすめ記事</p>
      </div>
      <div className="text-center h-96 py-12">
        <p className="text-4xl font-bold">RELATED</p>
        <p className="text-yellow-500">関連記事</p>
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
    GetGraduateArticleBySlugQuery,
    GetGraduateArticleBySlugQueryVariables
  >({
    query: gql`
      query GetGraduateArticleBySlugQuery($slug: String!) {
        graduateArticle(filter: { slug: { eq: $slug } }) {
          title
          date
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
