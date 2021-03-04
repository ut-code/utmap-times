import { gql } from "@apollo/client";
import clsx from "clsx";
import dayjs from "dayjs";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import ArticleLink from "../components/ArticleLink";
import FeatureLink from "../components/FeatureLink";
import Hero from "../components/Hero";
import HomePageSectionHeader from "../components/HomePageSectionHeader";
import HomePageTitleText from "../components/HomePageTitleText";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import apolloClient from "../utils/apollo";
import { IndexQuery } from "../__generated__/IndexQuery";

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title="ホーム">
      <Hero
        image="/images/top-hero.jpg"
        useNextImageOptimization
        className="flex items-center min-h-screen p-4 md:p-20"
      >
        <div className="py-32">
          <HomePageTitleText className="w-full mb-12 max-w-2xl" />
          <p>東大生のキャリア設計プラットフォーム</p>
        </div>
      </Hero>
      <div className="relative">
        <div
          aria-hidden
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-3/4 h-full bg-primary-50 bg-opacity-5 " />
          <Logo
            disableText
            className="hidden lg:block absolute -bottom-0 right-0 w-auto h-full opacity-10"
          />
          <Logo className="hidden lg:block absolute bottom-0 right-0 w-96 h-96 bg-white" />
        </div>
        <div className="relative container max-w-screen-lg mx-auto z-10">
          <div className="px-8 py-32 lg:w-2/3">
            <h2 className="text-5xl font-bold">About</h2>
            <p className="py-5 text-secondary-main">UTmap とは</p>
            <p className="py-14 text-3xl text-primary-main font-bold leading-relaxed md:text-4xl">
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
              className="h-12 w-64 text-white bg-primary-main hover:bg-primary-400"
            >
              もっと見る
            </button>
          </div>
        </div>
      </div>
      <HomePageSectionHeader
        image="/images/top-clubs.jpg"
        title="Circle"
        subtitle="サークル選択のサポート"
        linkTo="/graduates"
        description={
          <>
            <p>
              東大のサークルについてご紹介いたします。これはダミーテキストです。ダミーテキストです。東大のサークルについてご紹介いたします。東大のサークルについてご紹介いたします。これはダミーテキストです。
            </p>
            <p>
              ダミーテキストです。東大のサークルについてご紹介いたします。東大のサークルについてご紹介いたします。これはダミーテキストです。ダミーテキストです。東大のサークルについてご紹介いたします。
            </p>
            <p>
              東大のサークルについてご紹介いたします。これはダミーテキストです。
            </p>
          </>
        }
      />
      <section className="container max-w-screen-lg mx-auto my-12">
        <header className="flex items-end mx-8 py-2 border-b border-secondary-main">
          <h2 className="mr-2 text-3xl font-bold">PICKUP</h2>
          <p className="text-secondary-main">注目のサークル</p>
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
          <a className="block mx-8 px-12 py-4 text-center text-white bg-primary-main hover:bg-primary-400">
            もっと見る
          </a>
        </Link>
      </section>
      <HomePageSectionHeader
        image="/images/top-careers.jpg"
        title="Careers"
        subtitle="就職・キャリア選択のサポート"
        linkTo="/graduates"
        description={
          <>
            <p>
              東大のサークルについてご紹介いたします。これはダミーテキストです。ダミーテキストです。東大のサークルについてご紹介いたします。東大のサークルについてご紹介いたします。これはダミーテキストです。
            </p>
            <p>
              ダミーテキストです。東大のサークルについてご紹介いたします。東大のサークルについてご紹介いたします。これはダミーテキストです。ダミーテキストです。東大のサークルについてご紹介いたします。
            </p>
            <p>
              東大のサークルについてご紹介いたします。これはダミーテキストです。
            </p>
          </>
        }
      />
      <section className="grid lg:grid-cols-1 gap-8 container max-w-screen-lg mx-auto my-12 px-8">
        <FeatureLink
          title="OB/OG分析"
          imageUrl="/images/top-button-graduates.jpg"
          linkTo="/graduates"
        />
      </section>
      <section className="container max-w-screen-lg mx-auto my-12 px-8 md:grid md:grid-cols-3">
        <div>
          <h2 className="my-5 text-4xl font-bold">News</h2>
          <p className="my-5 text-secondary-main">お知らせ</p>
        </div>
        <ul className="md:col-span-2">
          {props.allNewsArticles.map((newsArticle, index) => (
            <li
              className={clsx("border-gray-300", {
                "border-t": index > 0,
              })}
              key={newsArticle.id}
            >
              <Link href={`/news/${newsArticle.id}`}>
                <a className="block py-4 hover:bg-gray-50 md:flex md:px-2">
                  <time className="block w-36 mb-2 md:m-0 md:flex-shrink-0">
                    {dayjs(newsArticle.updatedAt).format("YYYY-MM-DD")}
                  </time>
                  <p className="md:flex-grow">{newsArticle.title}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
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
            images {
              url(imgixParams: { maxW: 300 })
            }
            id
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
          updatedAt
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
