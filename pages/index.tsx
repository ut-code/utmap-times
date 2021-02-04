import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import Layout from "../components/Layout";
import apolloClient from "../utils/apollo";
import { IndexQuery } from "../__generated__/IndexQuery";

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title="ホーム">
      <h1>UTMap Times</h1>
      <ul className="text-4xl">
        {props.allCircles.map((circle) => (
          <li key={circle.name}>{circle.name}</li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const queryResult = await apolloClient.query<IndexQuery>({
    query: gql`
      query IndexQuery {
        allCircles {
          name
        }
      }
    `,
  });
  return {
    props: queryResult.data,
  };
}
