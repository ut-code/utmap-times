import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
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
      <div className="w-full flex">
        <div className="w-2/3">
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
          <div className="h-2/3 w-full absolute bottom-0 py-60 bg-blue-900 text-center">
            ロゴ
          </div>
        </div>
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
      }
    `,
  });
  return {
    props: queryResult.data,
  };
}
