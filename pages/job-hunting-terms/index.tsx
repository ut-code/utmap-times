import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import { JobHuntingTermQuery } from "../../__generated__/JobHuntingTermQuery";

export default function JobHuntingTermIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [focusedJobHuntingTerm, setFocusedJobHuntingTerm] = useState(null);
  return (
    <>
      <Layout title="就活用語">
        {props.jobHuntingTerms.map((term) => (
          <div key={term.id}>
            <button
              type="button"
              onClick={() => {
                setFocusedJobHuntingTerm(term.id);
              }}
            >
              {term.name}
            </button>
          </div>
        ))}
      </Layout>

      {focusedJobHuntingTerm !== null && (
        <div>
          説明
          <button
            type="button"
            onClick={() => {
              setFocusedJobHuntingTerm(null);
            }}
          >
            説明
            {props.jobHuntingTerms.find(
              (term) => focusedJobHuntingTerm === term.id
            )?.description ?? ""}
          </button>
        </div>
      )}
    </>
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
