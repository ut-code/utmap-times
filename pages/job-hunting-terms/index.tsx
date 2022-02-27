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
    <Layout title="DICTIONARY">
      <IndexHeroContent
        imageUrl="images/top-careers.jpg"
        title="DICTIONARY"
        subtitle="就活用語"
      />

      <section className="bg-gray-200">
        <div className="box-border md:box-content">
          <header className="flex items-enter mb-2">
            <h4 className="text-lg mr-2">戦略・フレームワーク説明</h4>
            <div
              aria-hidden="true"
              className="flex-grow border-b border-gray-400"
            />
          </header>
          <ul className="flex flex-wrap">
            {props.jobHuntingTerms.map((term) => (
              <div key={term.id} className="my-4">
                {/* <header className="flex items-center mb-2"> */}
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
                  <div
                    className={clsx(
                      focusedJobHuntingTerm === term.id
                        ? "inline-block mr-2 mb-2 bg-yellow-300"
                        : "inline-block mr-2 mb-2"
                    )}
                  >
                    {term.name}
                  </div>

                  <div
                    aria-hidden
                    className="flex-grow border-b border-gray-400"
                  />
                </button>
                {/* </header> */}

                <ul>
                  {focusedJobHuntingTerm !== null &&
                    focusedJobHuntingTerm === term.id && (
                      <li>
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
                      </li>
                    )}
                </ul>
              </div>
            ))}
          </ul>
        </div>
      </section>
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
