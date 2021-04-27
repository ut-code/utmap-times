import { gql, useQuery } from "@apollo/client";
import clsx from "clsx";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import * as s from "superstruct";
import ArticleLinkIntern, {
  articleLinkInternFragment,
} from "../../components/ArticleLinkIntern";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import ImageOrLogo from "../../components/ImageOrLogo";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import { InternshipsIndexMetaQuery } from "../../__generated__/InternshipsIndexMetaQuery";
import {
  InternshipsSearchQuery,
  InternshipsSearchQueryVariables,
} from "../../__generated__/InternshipsSearchQuery";
import { InternshipModelFilter } from "../../__generated__/globalTypes";
import {
  RandomInternshipsQuery,
  RandomInternshipsQueryVariables,
} from "../../__generated__/RandomInternshipsQuery";

const queryType = s.type({
  q: s.optional(s.string()),
  isRecruiting: s.optional(s.boolean()),
  features: s.optional(s.union([s.string(), s.array(s.string())])),
});
export type Query = s.Infer<typeof queryType>;

const ARTICLES_PER_PAGE = 12;

export default function InternshipsIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const query = router.query as s.Infer<typeof queryType>;
  const [search, setSearch] = useState(query.q ?? "");

  const randomInternshipsIndex = useMemo(
    () => Math.floor(Math.random() * props.totalInternshipsCount),
    [props.totalInternshipsCount]
  );
  const randomInternshipsQuery = useQuery<
    RandomInternshipsQuery,
    RandomInternshipsQueryVariables
  >(
    gql`
      ${articleLinkInternFragment}
      query RandomInternshipsQuery($randomInternshipsIndex: IntType!) {
        allInternships(skip: $randomInternshipsIndex, first: 1) {
          ...ArticleLinkInternFragment
        }
      }
    `,
    { variables: { randomInternshipsIndex }, ssr: false }
  );
  const selectedIsRecruiting = query.isRecruiting;
  const isRecruitingFilter: InternshipModelFilter = selectedIsRecruiting
    ? {}
    : {};
  const selectedFeaturesSlugs = Array.isArray(query.features)
    ? query.features
    : [query.features];
  const selectedFeatures = props.InternshipsFeatures.filter((features) =>
    selectedFeaturesSlugs.some((slug) => slug === features.slug)
  );
  const titleFilter: InternshipModelFilter = query.q
    ? { title: { matches: { pattern: query.q || "" } } }
    : {};
  const featuresFilter: InternshipModelFilter = selectedFeatures.length
    ? { features: { allIn: selectedFeatures.map((features) => features.id) } }
    : {};
  const searchQuery = useQuery<
    InternshipsSearchQuery,
    InternshipsSearchQueryVariables
  >(
    gql`
      ${articleLinkInternFragment}
      query InternshipsSearchQuery(
        $filter: InternshipModelFilter
        $first: IntType
        $skip: IntType
      ) {
        allInternships(filter: $filter, first: $first, skip: $skip) {
          ...ArticleLinkInternFragment
        }
        _allInternshipsMeta(filter: $filter) {
          count
        }
      }
    `,
    {
      variables: {
        filter: { ...titleFilter, ...featuresFilter, ...isRecruitingFilter },
        first: ARTICLES_PER_PAGE * (page + 1),
        skip: 0,
      },
      ssr: false,
    }
  );

  const fetchMore = () => {
    const newPage = page + 1;
    setIsLoading(true);
    searchQuery
      .fetchMore({
        variables: {
          first: ARTICLES_PER_PAGE,
          skip: newPage * ARTICLES_PER_PAGE,
        },
      })
      .then(() => {
        setPage(newPage);
        setIsLoading(false);
      });
  };

  const searchQueryData = searchQuery.data;
  const randomInternships = randomInternshipsQuery.data?.allInternships[0];

  return (
    <Layout title="インターン">
      <Hero image="/images/top-internships.jpg">
        <div className="pt-40 pb-24 px-20 md:px-56 md:pt-56 md:pb-32">
          <h1 className="text-6xl">Internships</h1>
          <h2>インターンシップ選択のサポート</h2>
        </div>
      </Hero>
      <Banners />
      <section className="container mx-auto py-24 lg:py-32">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold">PICKUP</h2>
          <p className="text-secondary-main">注目のインターン</p>
        </header>
        <Link href={`/internships/${randomInternships?.id}`}>
          <a className="block relative hover:bg-gray-100 p-8">
            <ImageOrLogo
              alt={randomInternships?.title ?? ""}
              src={randomInternships?.images[0]?.url ?? "/images/utmap.png"}
              className="w-full h-96"
            />
            <div className="inline-block relative z-10 -mt-6 lg:-mt-12 lg:p-14 lg:mr-32 lg:bg-white">
              <p className={clsx("my-6 text-3xl lg:text-4xl")}>
                {randomInternships?.title}
              </p>
              <ul>
                {randomInternships?.features.map((feature) => (
                  <li
                    key={feature.id}
                    className="inline-block mr-2 my-2 p-1 border bg-gray-200 text-sm"
                  >
                    {`#${feature.name}`}
                  </li>
                ))}
              </ul>
              <div
                aria-hidden
                className="hidden absolute bottom-0 left-0 w-1/2 border-b-2 border-primary-main lg:block"
              />
            </div>
          </a>
        </Link>
      </section>
      <section className="bg-gray-200">
        <div className="container mx-auto py-16 px-8 md:px-24">
          <form
            onSubmit={(e) => {
              const newQuery: Query = { q: search };
              router.push({ query: { ...query, ...newQuery } });
              e.preventDefault();
            }}
          >
            <div className="flex items-stretch mb-16">
              <input
                placeholder="キーワードで検索"
                className="flex-grow p-4"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                type="submit"
                className="w-16 text-center bg-blue-900 hover:bg-blue-700 text-white"
              >
                <AiOutlineSearch className="inline text-xl" />
              </button>
            </div>
          </form>
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2">
            <div className="md:pr-8 md:border-r md:border-gray-500">
              <h3 className="text-2xl mb-6">カテゴリで検索</h3>
            </div>
            <div className="md:pl-8">
              <h3 className="text-2xl">タグで検索</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto my-12">
        {searchQueryData ? (
          <>
            {searchQueryData._allInternshipsMeta.count === 0 ? (
              <p className="px-8">
                サークルが見つかりませんでした。キーワードを変えてお試しください。
              </p>
            ) : (
              <>
                <p className="mb-8 px-8">{`${searchQueryData._allInternshipsMeta.count}件のサークルが見つかりました。`}</p>
                <ul className="md:grid md:grid-cols-1 xl:grid-cols-1">
                  {searchQueryData.allInternships.map((internship) => (
                    <li key={internship.id}>
                      <ArticleLinkIntern
                        article={internship}
                        className="h-full"
                      />
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-8">
                  {searchQueryData.allInternships.length <
                  searchQueryData._allInternshipsMeta.count ? (
                    <button
                      type="button"
                      className={clsx(
                        "h-12 w-64 text-white",
                        !isLoading
                          ? "bg-blue-900 hover:bg-blue-500"
                          : "bg-gray-300"
                      )}
                      disabled={isLoading}
                      onClick={fetchMore}
                    >
                      もっと見る
                    </button>
                  ) : (
                    <p className="bg-gray-100 py-6">
                      すべてのサークルを検索しました。
                    </p>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <p>読み込み中です...</p>
        )}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const metaQueryResult = await apolloClient.query<InternshipsIndexMetaQuery>({
    query: gql`
      query InternshipsIndexMetaQuery {
        allInternshipFeatures(first: 100) {
          id
          name
          slug
        }
        _allInternshipsMeta {
          count
        }
      }
    `,
  });
  return {
    props: {
      InternshipsFeatures: metaQueryResult.data.allInternshipFeatures,
      totalInternshipsCount: metaQueryResult.data._allInternshipsMeta.count,
    },
  };
}
