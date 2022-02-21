import { gql } from "@apollo/client";
import clsx from "clsx";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import IndexHeroContent from "../../components/IndexHeroContent";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import { JobHuntingTermQuery } from "../../__generated__/JobHuntingTermQuery";

export default function JobHuntingTermIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [focusedJobHuntingTerm, setFocusedJobHuntingTerm] = useState(null);
  return (
    <Layout title="就活用語">
      <IndexHeroContent
        imageUrl="images/top-careers.jpg"
        title="就活用語"
        subtitle="の説明"
      />

      <div className="md:pl-8">
        <h3 className="text-2xl">就活用語を押して説明を見よう</h3>
        {props.jobHuntingTerms.map((term) => (
          <div key={term.id} className="my-4">
            <header className="flex items-center mb-2">
              <button
                type="button"
                className="text-lg mr-2"
                onClick={() => {
                  if (focusedJobHuntingTerm === term.id) {
                    setFocusedJobHuntingTerm(null);
                  } else {
                    setFocusedJobHuntingTerm(term.id);
                  }
                }}
              >
                <h4
                  className={clsx(
                    "text-lg mr-2",
                    focusedJobHuntingTerm === term.id
                      ? "bg-yellow-300"
                      : "bg-white"
                  )}
                >
                  {term.name}
                </h4>
                <div
                  aria-hidden
                  className="flex-grow border-b border-gray-400"
                />
              </button>
            </header>
            <ul>
              {focusedJobHuntingTerm !== null &&
                focusedJobHuntingTerm === term.id && (
                  <div>
                    説明
                    <button
                      type="button"
                      onClick={() => {
                        setFocusedJobHuntingTerm(null);
                      }}
                    >
                      <div className={clsx("block py-1 px-2 text-sm")}>
                        {props.jobHuntingTerms.find(
                          (_term) => focusedJobHuntingTerm === _term.id
                        )?.description ?? ""}
                      </div>
                    </button>
                  </div>
                )}
            </ul>
          </div>
        ))}
        {/* <ul>
          {focusedJobHuntingTerm !== null && (
            <div>
              説明
              <button
                type="button"
                onClick={() => {
                  setFocusedJobHuntingTerm(null);
                }}
              >
                <div className={clsx("block py-1 px-2 text-sm")}>
                  {props.jobHuntingTerms.find(
                    (term) => focusedJobHuntingTerm === term.id
                  )?.description ?? ""}
                </div>
              </button>
            </div>
          )}
        </ul> */}
      </div>
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
