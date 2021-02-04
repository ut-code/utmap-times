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
