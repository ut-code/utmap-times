import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import apolloClient from "../utils/apollo";
import { IndexQuery } from "../__generated__/IndexQuery";

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title="ホーム">
      <Hero image="https://picsum.photos/800/600" className="p-14 pt-36">
        <div className="text-5xl mb-6 leading-tight">
          <p>Design Your Future,</p>
          <p>Design Our Future.</p>
        </div>
        <p>東大生のキャリア設計プラットフォーム</p>
      </Hero>
      <h1>UTMap Times</h1>
      <ul className="text-4xl">
        {props.allHighlightedClubs.map((highlightedClub) => (
          <li key={highlightedClub.id}>
            <Link href={`/clubs/${highlightedClub.club?.slug}`}>
              {highlightedClub.club?.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="w-full flex relative">
        <div className="w-2/3 z-10">
          <div className="px-40 pt-32 pb-28">
            <h2 className="text-5xl font-bold">About</h2>
            <p className="py-5 text-yellow-500">UTmap とは</p>
            <p className="py-14 text-4xl text-blue-800 font-bold leading-relaxed">
              東大生のキャリア設計
              <br />
              プラットフォーム
            </p>
            <p className="pb-14">
              東大生が、より良い人生を切り開き、より良い未来をつくるために、東大生活を歩む「地図」を授けたい。
              <br />
              UTmap(ユー・ティー・マップ)は、東大生による東大生のためのキャリアプラットフォームとして、東大生のキャリアに大きな影響をもたらす「サークル」「進振り」「就活」という3つの意思決定をサポートします。
              <br />
              東大発ソーシャルスタートアップの「Pyxida(ピクシーダ)」が、総力を挙げて取材・編集したコンテンツをご活用ください。
            </p>
            <button
              type="button"
              className="h-12 w-64 text-white bg-blue-900 hover:bg-blue-500"
            >
              もっと見る
            </button>
          </div>
        </div>
        <div className="w-1/3 relative">
          <Logo className="absolute bottom-0 left-0 w-full h-2/3 bg-gray-200 z-30" />
        </div>
        <div className="absolute top-0 right-0 w-3/4 h-full bg-purple-50" />
      </div>
      <div className="h-80 bg-pink-300" />
      <div className="h-96 relative">
        <div className="h-96 w-5/6 bg-purple-200" />
        {/* <div className="h-96 w-5/6 bg-gray-100 absolute right-0 top-72 z-10 py-20 flex">
          <div className="h-56 w-2/5 pl-28 py-4 bg-red-300">
            <h2 className="text-5xl font-bold">Circle</h2>
            <p className="py-5 text-yellow-500">サークル選択のサポート</p>
            <button
              type="button"
              className="h-12 w-64 text-white bg-blue-900 hover:bg-blue-500 mt-6"
            >
              もっと見る
            </button>
          </div>
          <p className="h-56 w-3/5 pl-24 pr-36 bg-yellow-300">
            東大のサークルについてご紹介いたします。これはダミーテキストです。
            ダミーテキストです。東大のサークルについてご紹介いたします。東大の
            サークルについてご紹介いたします。これはダミーテキストです。
            ダミーテキストです。東大のサークルについてご紹介いたします。東大の
            サークルについてご紹介いたします。これはダミーテキストです。ダミー
            テキストです。東大のサークルについてご紹介いたします。
            東大のサークルについてご紹介いたします。これはダミーテキストです。
          </p>
        </div> */}
      </div>
      <div className="py-24 h-96 flex">
        <div className="w-1/3 pl-28">
          <h2 className="text-4xl font-bold">News</h2>
          <p className="py-5 text-yellow-500">お知らせ</p>
        </div>
        <ul className="w-2/3">
          {props.allNewsArticles.map((newsArticle) => (
            <li className="h-16 py-5" key={newsArticle.id}>
              <Link href={`/news-article/${newsArticle.slug}`}>
                {newsArticle.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const queryResult = await apolloClient.query<IndexQuery>({
    query: gql`
      query IndexQuery {
        allHighlightedClubs {
          id
          club {
            name
            slug
            tags {
              slug
              name
            }
            category {
              slug
              name
            }
          }
        }
        allNewsArticles {
          id
          title
          slug
          content
        }
      }
    `,
  });
  return {
    props: queryResult.data,
  };
}
