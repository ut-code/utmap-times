import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import apolloClient from "../utils/apollo";
import { AboutIndexQuery } from "../__generated__/AboutIndexQuery";

export default function AboutPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title="What is UTmap">
      <Hero image="https://picsum.photos/800/600">
        <h1 className="text-4xl p-32">What is UTmap</h1>
      </Hero>
      <div className="overflow-x-hidden bg-black p-4">
        <div className="flex flex-row w-max space-x-8">
          {[...props.allBanners].map((banner) => (
            <Link href={banner.link ?? ""}>
              <a>
                <img
                  src={banner.image?.url ?? ""}
                  alt="banner"
                  className="h-16"
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
      <main className="container mx-auto px-2 py-16 leading-loose text-2xl">
        <p>
          東大生が、より良い人生を切り開き、より良い未来をつくるために、東大生活を歩む「地図」を授けたい。
        </p>
        <p>
          UTmap（ユー・ティー・マップ）は、東大生による東大生のためのキャリアプラットフォームとして、東大生のキャリアに大きな影響をもたらす「サークル」「進振り」「就活」という３つの意思決定をサポートします。
        </p>
        <p>UTmapが総力を挙げて取材・編集したコンテンツをご活用ください。</p>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const queryResult = await apolloClient.query<AboutIndexQuery>({
    query: gql`
      query AboutIndexQuery {
        allBanners {
          title
          link
          image {
            url
          }
        }
      }
    `,
  });
  return {
    props: queryResult.data,
  };
}
