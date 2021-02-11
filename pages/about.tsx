import { gql } from "@apollo/client";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import apolloClient from "../utils/apollo";
import { IndexQuery } from "../__generated__/IndexQuery";

export default function AboutPage() {
  return (
    <Layout title="What is UTmap">
      <Hero image="https://picsum.photos/800/600">
        <h1 className="text-4xl p-32">What is UTmap</h1>
      </Hero>
      <p>こんにちは</p>
    </Layout>
  );
}

export async function getStaticProps() {
  const queryResult = await apolloClient.query<IndexQuery>({
    query: gql`
      query IndexQuery {
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
