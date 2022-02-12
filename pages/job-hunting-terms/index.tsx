import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import { JobHuntingTermQuery } from "../../__generated__/JobHuntingTermQuery";

export default function JobHuntingTermIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title="就活用語">
      {props.jobHuntingTerms.map((term) => (
        <div key={term.id}>{term.name}</div>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const queryResult = await apolloClient.query<JobHuntingTermQuery>({
    query: gql`
      query JobHuntingTermQuery {
        allJobHuntingTerms {
          id
          name
          description
          slug
        }
      }
    `,
  });

  return {
    props: { jobHuntingTerms: queryResult.data.allJobHuntingTerms },
    revalidate: 60,
  };
}
