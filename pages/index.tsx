import { gql } from "@apollo/client";
import clsx from "clsx";
import dayjs from "dayjs";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import styled from "styled-components";
import Head from "next/head";
import ArticleLink from "../components/ArticleLink";
import Banners from "../components/Banners";
import HomePageFeatureLink from "../components/HomePageFeatureLink";
import Hero from "../components/Hero";
import HomePageSectionHeader from "../components/HomePageSectionHeader";
import HomePageSectionScrollButton from "../components/HomePageSectionScrollButton";
import HomePageTitleText from "../components/HomePageTitleText";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import ResponsiveImageWithFallback from "../components/ResponsiveImageWithFallback";
import apolloClient from "../utils/apollo";
import { responsiveImageFragment } from "../utils/datocms";
import { IndexQuery } from "../__generated__/IndexQuery";
import SectionHeader from "../components/SectionHeader";
import Carousel from "../components/Carousel";
import GradientImageOverlay from "../components/GradientImageOverlay";
import CategoryChip from "../components/CategoryChip";

const IndexPageHero = styled(Hero)`
  min-height: calc(100vh - 14rem);
`;

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout
      title="ホーム"
      seo={{
        description: [
          "東大生が、より良い人生を切り開き、より良い未来をつくるために、東大生活を歩む「地図」を描きたい。",
          "UTmapは、東大生のキャリアに大きな影響をもたらす「サークル」「進学選択」「就活」という３つの意思決定をサポートします。",
        ].join(""),
      }}
    >
      <Head>
        <title>UTmap - 東大生のキャリア設計プラットフォーム</title>
      </Head>
      <IndexPageHero
        image="/images/top-hero.jpg"
        useNextImageOptimization
        className="flex items-center p-4 md:p-20"
      >
        <div className="pb-15 pt-20">
          <HomePageTitleText className="w-full mb-12 max-w-2xl" />
          <p>東大生のキャリア設計プラットフォーム</p>
        </div>
      </IndexPageHero>
      <Banners />
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
                東大生が、より良い人生を切り開き、より良い未来をつくるために、東大生活を歩む「地図」を描きたい。
              </p>
              <p>
                UTmap（ユー・ティー・マップ）は、東大生による東大生のためのキャリアプラットフォームとして、東大生のキャリアに大きな影響をもたらす「サークル」「進学選択」「就活」という３つの意思決定をサポートします。
              </p>
              <p>
                UTmapが総力を挙げて取材・編集したコンテンツをご活用ください。
              </p>
            </div>
            {/* 
            デザイン上には存在するがリンク先不明のためいったん削除
            <button
              type="button"
              className="h-12 w-64 text-white bg-primary-main hover:bg-primary-400"
            >
              もっと見る
            </button> */}
          </div>
        </div>
      </div>
      <section className="flex flex-col container max-w-screen-lg mx-auto my-12 px-8 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <HomePageSectionScrollButton
          title="Circle"
          subtitle="サークル"
          linkTo="#clubs"
        />
        {/* <HomePageSectionScrollButton title="Circle" subtitle="進学" /> */}
        <HomePageSectionScrollButton
          title="Career"
          subtitle="就職/キャリア"
          linkTo="#careers"
        />
      </section>
      <HomePageSectionHeader
        id="clubs"
        image="/images/top-clubs.jpg"
        title="Circle"
        subtitle="サークル選択のサポート"
        linkTo="/clubs"
        descriptionParagraphs={[
          "東大生の1つ目の選択。 大学生活の多くの出会いはここから始まる。",
          "気の置けない友人と出会うのも、刺激的な友人と出会うのも、切磋琢磨できる友人と出会うのも。",
          "心躍る東大生活。",
          "東大生になった私たちが次に情熱を注ぐものを見つけよう。",
        ]}
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
                url={`/clubs/${highlightedClub.club?.id}`}
                media={
                  <ResponsiveImageWithFallback
                    aspectRatio={16 / 9}
                    data={highlightedClub.club?.images[0]?.responsiveImage}
                  />
                }
                category={highlightedClub.club?.category?.name ?? ""}
                isFramed
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
      {/* <HomePageSectionHeader
        id="course"
        image="/images/top-course.jpg"
        title="Course"
        subtitle="進学選択のサポート"
        linkTo="/graduates"
        descriptionParagraphs={[
          "東大生の2つ目の選択。",
          "無限の可能性を秘める私たち東大生。",
          "私たちが本当にやりたいことは何だろう？",
          "私たちの選択のその先には何が広がっているのだろう？",
          "未来の私たちを探しに行こう。",
        ]}
      /> */}
      <HomePageSectionHeader
        id="careers"
        image="/images/top-careers.jpg"
        title="Careers"
        subtitle="就職・キャリア選択のサポート"
        linkTo="/careers"
        descriptionParagraphs={[
          "東大生の3つ目の選択。",
          "就職？院進？起業？",
          "私たちが輝けるキャリアは何だろう？",
          "これから社会の一員になる私たち。",
          "最初の一歩を踏み出そう。",
        ]}
      />
      <section className="grid lg:grid-cols-3 gap-8 container max-w-screen-lg mx-auto my-12 px-8">
        <HomePageFeatureLink
          title="キャリア戦略"
          imageUrl="/images/top-button-career-strategies.jpg"
          linkTo="/career-strategies"
        />
        <HomePageFeatureLink
          title="卒業生分析"
          imageUrl="/images/top-button-graduates.jpg"
          linkTo="/graduates"
        />
        <HomePageFeatureLink
          title="企業分析"
          imageUrl="/images/top-button-companies.jpg"
          linkTo="/companies"
        />
      </section>
      <section className="py-8">
        <SectionHeader
          className="mb-12"
          title="INTERNSHIP"
          subtitle="インターンシップ情報"
        />
        <Carousel
          aspectRatio={16 / 9}
          cards={props.allInternships.map((internship) => ({
            key: internship.id,
            content: (
              <Link href={`/internships/${internship.slug}`}>
                <a className="block relative w-full h-full">
                  <ResponsiveImageWithFallback
                    aspectRatio={16 / 9}
                    data={internship.thumbnailImage?.responsiveImage}
                  />
                  <GradientImageOverlay />
                  <div className="absolute bottom-0 left-0 w-full px-20 py-6 md:py-12 md:px-12 text-white">
                    <CategoryChip type="secondary" className="mb-4 md:mb-6">
                      {internship.isRecruiting ? "募集中" : "募集終了"}
                    </CategoryChip>
                    <p className="text-xl md:text-2xl">{internship.title}</p>
                  </div>
                </a>
              </Link>
            ),
          }))}
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
              <Link href={`/news/${newsArticle.slug}`}>
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
      ${responsiveImageFragment}
      query IndexQuery {
        allHighlightedClubs {
          id
          club {
            name
            images {
              responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
                ...ResponsiveImageFragment
              }
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
        allInternships(filter: { isRecruiting: { eq: true } }, first: 5) {
          id
          slug
          title
          isLongTermInternship
          isRecruiting
          features {
            id
            name
          }
          thumbnailImage {
            responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
              ...ResponsiveImageFragment
            }
          }
        }
      }
    `,
  });
  return {
    props: queryResult.data,
    revalidate: 60,
  };
}
