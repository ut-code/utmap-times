import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import ArticleLink from "../components/ArticleLink";
import FeatureLink from "../components/FeatureLink";
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
      <div className="relative">
        <div
          aria-hidden
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-3/4 h-full bg-purple-50 bg-opacity-40" />
          <Logo
            disableText
            className="hidden lg:block absolute -bottom-0 right-0 w-auto h-full opacity-10"
          />
          <Logo className="hidden lg:block absolute bottom-0 right-0 w-96 h-96 bg-white" />
        </div>
        <div className="relative container max-w-screen-lg mx-auto z-10">
          <div className="px-8 py-32 lg:w-2/3">
            <h2 className="text-5xl font-bold">About</h2>
            <p className="py-5 text-yellow-500">UTmap とは</p>
            <p className="py-14 text-3xl text-blue-800 font-bold leading-relaxed md:text-4xl">
              東大生のキャリア設計
              <br />
              プラットフォーム
            </p>
            <div className="mb-16 space-y-4">
              <p>
                東大生が、より良い人生を切り開き、より良い未来をつくるために、東大生活を歩む「地図」を授けたい。
              </p>
              <p>
                UTmap(ユー・ティー・マップ)は、東大生による東大生のためのキャリアプラットフォームとして、東大生のキャリアに大きな影響をもたらす「サークル」「進振り」「就活」という3つの意思決定をサポートします。
              </p>
              <p>
                東大発ソーシャルスタートアップの「Pyxida(ピクシーダ)」が、総力を挙げて取材・編集したコンテンツをご活用ください。
              </p>
            </div>
            <button
              type="button"
              className="h-12 w-64 text-white bg-blue-900 hover:bg-blue-500"
            >
              もっと見る
            </button>
          </div>
        </div>
      </div>
      <section className="container max-w-screen-lg mx-auto my-12">
        <header className="flex items-end mx-8 py-2 border-b border-yellow-500">
          <h2 className="mr-2 text-3xl font-bold">PICKUP</h2>
          <p className="text-yellow-500">注目のサークル</p>
        </header>
        <ul className="md:grid md:grid-cols-2 my-6">
          {props.allHighlightedClubs.map((highlightedClub) => (
            <li key={highlightedClub.id}>
              <ArticleLink
                title={highlightedClub.club?.name ?? ""}
                url={`/clubs/${highlightedClub.club?.slug}`}
                imageUrl={highlightedClub.club?.image[0]?.url ?? ""}
                category={highlightedClub.club?.category?.name ?? ""}
                tags={highlightedClub.club?.tags.map((tag) => ({
                  id: tag.id,
                  name: tag.name ?? "",
                }))}
              />
            </li>
          ))}
        </ul>
        <Link href="/clubs">
          <a className="block mx-8 px-12 py-4 text-center text-white bg-blue-900 hover:bg-blue-500">
            もっと見る
          </a>
        </Link>
      </section>
      <section className="grid lg:grid-cols-3 gap-8 container max-w-screen-lg mx-auto my-12 px-8">
        <FeatureLink
          title="学部紹介"
          imageUrl="https://picsum.photos/800/600?r=0"
          linkTo="/"
        />
        <FeatureLink
          title="単位計算"
          imageUrl="https://picsum.photos/800/600?r=1"
          linkTo="/"
        />
        <FeatureLink
          title="卒業生インタビュー"
          imageUrl="https://picsum.photos/800/600?r=2"
          linkTo="/"
        />
      </section>
      <section className="grid lg:grid-cols-3 gap-8 container max-w-screen-lg mx-auto my-12 px-8">
        <FeatureLink
          title="キャリア戦略"
          imageUrl="https://picsum.photos/800/600?r=3"
          linkTo="/"
          className="lg:col-span-3"
        />
        <FeatureLink
          title="キャリア特集"
          imageUrl="https://picsum.photos/800/600?r=4"
          linkTo="/"
        />
        <FeatureLink
          title="業界分析"
          imageUrl="https://picsum.photos/800/600?r=5"
          linkTo="/"
        />
        <FeatureLink
          title="企業分析"
          imageUrl="https://picsum.photos/800/600?r=6"
          linkTo="/"
        />
        <FeatureLink
          title="職歴分析"
          imageUrl="https://picsum.photos/800/600?r=7"
          linkTo="/"
        />
        <FeatureLink
          title="OB/OG分析"
          imageUrl="https://picsum.photos/800/600?r=8"
          linkTo="/"
        />
        <FeatureLink
          title="就活用語"
          imageUrl="https://picsum.photos/800/600?r=9"
          linkTo="/"
        />
      </section>
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
            image {
              url(imgixParams: { maxW: 300 })
            }
            slug
            tags {
              id
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
