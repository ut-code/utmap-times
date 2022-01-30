import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import ArticleContentContainer from "../../components/ArticleContentContainer";
import Banners from "../../components/Banners";
import IndexHeroContent from "../../components/IndexHeroContent";
import Layout from "../../components/Layout";
import ReadMore from "../../components/ReadMore";
import apolloClient from "../../utils/apollo";
import { CareerStrategiesIndexQuery } from "../../__generated__/CareerStrategiesIndexQuery";

export default function CareerStrategiesIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title="キャリア戦略">
      <IndexHeroContent
        imageUrl="/images/article.jpg"
        title="キャリア戦略"
        subtitle="Career Strategies"
      />
      <Banners />
      <ArticleContentContainer className="py-16">
        <p className="leading-loose mt-4 mb-16 px-16">
          「東大生のためのキャリア戦略」は、UTmap&nbsp;編集部が、日本No.1の実績をもつキャリアコンサルタント・渡辺秀和⽒（（株）コンコードエグゼクティブグループCEO）を迎えて制作した特集コンテンツです。東京⼤学で⼈気を博したキャリアデザインの授業「キャリア・マーケットデザイン」のコースディレクターを務めた渡辺秀和氏が、不透明な時代を生き抜くためのキャリア設計法を解説します。
        </p>
        <p className="mb-8">
          {props.allCareerStrategyArticles.length}件の記事が見つかりました。
        </p>
        {props.allCareerStrategyArticles.map((article) => (
          <Link key={article.id} href={`/career-strategies/${article.slug}`}>
            <a className="block bg-gray-100 hover:bg-gray-200 lg:flex lg:min-h-64 mb-8">
              <img
                className="object-cover w-full h-64 md:h-80 lg:w-80 lg:h-auto"
                alt={article.thumbnailImage?.alt ?? undefined}
                src={article.thumbnailImage?.url}
              />
              <div className="flex flex-col space-y-4 p-6 sm:p-10">
                <h2 className="px-2 py-1 border-l-8 border-secondary-main font-bold">
                  {article.title}
                </h2>
                <div className="flex-grow text-base">{article.summary}</div>
                <ReadMore />
              </div>
            </a>
          </Link>
        ))}
      </ArticleContentContainer>
    </Layout>
  );
}

export async function getStaticProps() {
  const queryResult = await apolloClient.query<CareerStrategiesIndexQuery>({
    query: gql`
      query CareerStrategiesIndexQuery {
        allCareerStrategyArticles(first: 100) {
          id
          slug
          title
          summary
          thumbnailImage {
            alt
            url(imgixParams: { w: 1000, h: 1000 })
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
