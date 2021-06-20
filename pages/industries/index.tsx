import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import { IndustryIndexQuery } from "../../__generated__/IndustryIndexQuery";

export default function IndustryIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title="業界分析">
      <Hero image="/images/top-careers.jpg">
        <div className="pt-40 pb-24 px-16 md:px-56 md:pt-56 md:pb-32">
          <h1 className="text-4xl">業界分析</h1>
          <h2>Industry Analysis</h2>
        </div>
      </Hero>
      <Banners />
      <section className="bg-gray-100">
        <div className="container mx-auto py-24 px-8">
          <div className="pb-6 text-center">
            <p className="w-12 mx-auto mb-6 border-b border-secondary-main" />
            <h3 className="text-2xl font-bold">業界一覧</h3>
          </div>
          <ul className="md:grid md:grid-cols-2 xl:grid-cols-3 items-center">
            {props.industries.map((industry) => (
              <li key={industry.id}>
                <Link href="https://utmap.jp/" scroll={false}>
                  <a className="block relative p-4 hover:bg-gray-300">
                    <img
                      src={industry.image?.url}
                      alt={industry.name ?? ""}
                      className="block object-cover w-full md:h-60 max-h-60"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-0 box-border p-4 w-full h-full"
                    >
                      <div className="h-full w-full bg-black opacity-30" />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-2xl text-white">
                      {industry.name}
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const queryResult = await apolloClient.query<IndustryIndexQuery>({
    query: gql`
      query IndustryIndexQuery {
        allIndustries {
          id
          name
          slug
          image {
            url
          }
        }
      }
    `,
  });
  return {
    props: {
      industries: queryResult.data.allIndustries,
    },
  };
}
