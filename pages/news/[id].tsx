import { gql } from "@apollo/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
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
      <Hero image="https://picsum.photos/800/600">
        <div className="container mx-auto px-8 md:px-24 py-48">
          <h1 className="text-3xl">{props.newsArticle.title}</h1>
        </div>
      </Hero>
      <div className="container mx-auto px-8 md:px-24">
        <div className="pt-28 border-b-2">
          <p>2020/12/26</p>
          <h1 className="py-8 text-3xl font-bold">{props.newsArticle.title}</h1>
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
        <img
          src="https://picsum.photos/800/600"
          alt="画像"
          className="w-full"
        />
        <p className="pt-8 pb-20 border-b-2">{props.newsArticle.content}</p>
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
