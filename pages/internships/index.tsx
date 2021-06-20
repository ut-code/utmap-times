import { gql, useQuery } from "@apollo/client";
import clsx from "clsx";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { AiOutlineSearch, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
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
  isRecruiting: s.optional(s.string()),
  isLongTermInternship: s.optional(s.string()),
  features: s.optional(s.union([s.string(), s.array(s.string())])),
  industry: s.optional(s.union([s.string(), s.array(s.string())])),
  jobType: s.optional(s.union([s.string(), s.array(s.string())])),
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
  const [expandedInternshipGroup, setExpandedInternshipGroup] = useState("");

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
  const isRecruitingFilter: InternshipModelFilter = query.isRecruiting
    ? { isRecruiting: { eq: query.isRecruiting } }
    : {};
  const isLongTermInternshipFilter: InternshipModelFilter =
    query.isLongTermInternship
      ? { isLongTermInternship: { eq: query.isLongTermInternship } }
      : {};
  const selectedFeaturesSlugs = Array.isArray(query.features)
    ? query.features
    : [query.features];
  const selectedFeatures = props.InternshipsFeatures.filter((feature) =>
    selectedFeaturesSlugs.some((slug) => slug === feature.slug)
  );
  const selectedJobTypesSlugs = Array.isArray(query.jobType)
    ? query.jobType
    : [query.jobType];
  const selectedJobTypes = props.InternshipsJobType.filter((jobType) =>
    selectedJobTypesSlugs.some((slug) => slug === jobType.slug)
  );
  const selectedIndustriesSlugs = Array.isArray(query.industry)
    ? query.industry
    : [query.industry];
  const selectedIndustries = props.InternshipsIndustry.filter((industry) =>
    selectedIndustriesSlugs.some((slug) => slug === industry.slug)
  );
  const titleFilter: InternshipModelFilter = query.q
    ? { title: { matches: { pattern: query.q || "" } } }
    : {};
  const featuresFilter: InternshipModelFilter = selectedFeatures.length
    ? { features: { allIn: selectedFeatures.map((feature) => feature.id) } }
    : {};
  const jobTypeFilter: InternshipModelFilter = selectedJobTypes.length
    ? { jobType: { in: selectedJobTypes.map((jobType) => jobType.id) } }
    : {};
  const industryFilter: InternshipModelFilter = selectedIndustries.length
    ? { industry: { in: selectedIndustries.map((industry) => industry.id) } }
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
        filter: {
          ...titleFilter,
          ...featuresFilter,
          ...isRecruitingFilter,
          ...isLongTermInternshipFilter,
          ...industryFilter,
          ...jobTypeFilter,
        },
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
        <div className="py-8 space-y-8 md:space-y-0 md:grid md:grid-cols-2 xl:grid-cols-3">
          <Link href={`/internships/${randomInternships?.slug}`}>
            <a className="block relative hover:bg-gray-100 p-8">
              <div className="relative">
                <ImageOrLogo
                  alt={randomInternships?.title ?? ""}
                  src={randomInternships?.images[0]?.url ?? "/images/utmap.png"}
                  className="w-full h-96 object-cover"
                />
                <img
                  alt={randomInternships?.company?.name ?? ""}
                  src={
                    randomInternships?.company?.logo?.url ?? "/images/utmap.png"
                  }
                  className="absolute top-0 right-0 w-32 h-32 object-cover"
                />
              </div>
              <div className="inline-block relative z-10 w-full -mt-6 lg:-mt-12 lg:p-14 lg:mr-0 lg:bg-white">
                <div
                  className={clsx(
                    "inline-block py-1 px-4 text-white text-sm",
                    randomInternships?.isRecruiting
                      ? "bg-secondary-main"
                      : "bg-gray-500"
                  )}
                >
                  {randomInternships?.isRecruiting ? "募集中" : "募集終了"}
                </div>
                <p className={clsx("my-6 text-2xl lg:text-3xl")}>
                  {randomInternships?.title}
                </p>
                <div className="py-4 border-t border-secondary-main">
                  {randomInternships?.company?.name}
                </div>
                <div
                  aria-hidden
                  className="hidden absolute bottom-0 left-0 w-1/2 lg:block"
                />
              </div>
            </a>
          </Link>
          <Link href={`/internships/${randomInternships?.slug}`}>
            <a className="block relative hover:bg-gray-100 p-8">
              <div className="relative">
                <ImageOrLogo
                  alt={randomInternships?.title ?? ""}
                  src={randomInternships?.images[0]?.url ?? "/images/utmap.png"}
                  className="w-full h-96"
                />
                <img
                  alt={randomInternships?.company?.name ?? ""}
                  src={
                    randomInternships?.company?.logo?.url ?? "/images/utmap.png"
                  }
                  className="absolute top-0 right-0 w-32 h-32 object-cover"
                />
              </div>
              <div className="inline-block relative z-10 w-full -mt-6 lg:-mt-12 lg:p-14 lg:mr-0 lg:bg-white">
                <p
                  className={clsx(
                    "inline-block py-1 px-4 text-white text-sm",
                    randomInternships?.isRecruiting
                      ? "bg-secondary-main"
                      : "bg-gray-500"
                  )}
                >
                  {randomInternships?.isRecruiting ? "募集中" : "募集終了"}
                </p>
                <p className={clsx("my-6 text-2xl lg:text-3xl")}>
                  {randomInternships?.title}
                </p>
                <div className="py-4 border-t border-secondary-main">
                  {randomInternships?.company?.name}
                </div>
                <div
                  aria-hidden
                  className="hidden absolute bottom-0 left-0 w-1/2 lg:block"
                />
              </div>
            </a>
          </Link>
          <Link href={`/internships/${randomInternships?.slug}`}>
            <a className="block relative hover:bg-gray-100 p-8">
              <div className="relative">
                <ImageOrLogo
                  alt={randomInternships?.title ?? ""}
                  src={randomInternships?.images[0]?.url ?? "/images/utmap.png"}
                  className="w-full h-96"
                />
                <img
                  alt={randomInternships?.company?.name ?? ""}
                  src={
                    randomInternships?.company?.logo?.url ?? "/images/utmap.png"
                  }
                  className="absolute top-0 right-0 w-32 h-32 object-cover"
                />
              </div>
              <div className="inline-block relative z-10 w-full -mt-6 lg:-mt-12 lg:p-14 lg:mr-0 lg:bg-white">
                <p
                  className={clsx(
                    "inline-block py-1 px-4 text-white text-sm",
                    randomInternships?.isRecruiting
                      ? "bg-secondary-main"
                      : "bg-gray-500"
                  )}
                >
                  {randomInternships?.isRecruiting ? "募集中" : "募集終了"}
                </p>
                <p className={clsx("my-6 text-2xl lg:text-3xl")}>
                  {randomInternships?.title}
                </p>
                <div className="py-4 border-t border-secondary-main">
                  {randomInternships?.company?.name}
                </div>
                <div
                  aria-hidden
                  className="hidden absolute bottom-0 left-0 w-1/2 lg:block"
                />
              </div>
            </a>
          </Link>
        </div>
      </section>
      <section className="bg-gray-200">
        <div className="container mx-auto py-16 px-8 md:px-24">
          <div className="py-8 space-y-8 md:space-y-0 md:grid md:grid-cols-2">
            <button type="button" key="isLongTermInternship" className="mx-4">
              <span className="h-12">
                {[{ title: "長期インターンシップで探す", boolean: "true" }].map(
                  (isLongTermInternship) => {
                    const newQuery: Query = {
                      isLongTermInternship:
                        query.isLongTermInternship ===
                        isLongTermInternship.boolean
                          ? undefined
                          : isLongTermInternship.boolean ?? undefined,
                    };
                    return (
                      <span key={isLongTermInternship.title}>
                        <Link
                          href={{ query: { ...query, ...newQuery } }}
                          scroll={false}
                        >
                          <a
                            className={clsx(
                              "block py-3 px-6",
                              query.isLongTermInternship ===
                                isLongTermInternship.boolean
                                ? "bg-blue-900 hover:bg-blue-700 text-white"
                                : "bg-gray-500 hover:bg-blue-300 text-white"
                            )}
                          >
                            {isLongTermInternship.title}
                          </a>
                        </Link>
                      </span>
                    );
                  }
                )}
              </span>
            </button>
            <button type="button" key="isLongTermInternship" className="mx-2">
              <span className="h-12">
                {[
                  { title: "短期インターンシップで探す", boolean: "false" },
                ].map((isLongTermInternship) => {
                  const newQuery: Query = {
                    isLongTermInternship:
                      query.isLongTermInternship ===
                      isLongTermInternship.boolean
                        ? undefined
                        : isLongTermInternship.boolean ?? undefined,
                  };
                  return (
                    <span key={isLongTermInternship.title}>
                      <Link
                        href={{ query: { ...query, ...newQuery } }}
                        scroll={false}
                      >
                        <a
                          className={clsx(
                            "block py-3 px-6",
                            query.isLongTermInternship ===
                              isLongTermInternship.boolean
                              ? "bg-blue-900 hover:bg-blue-700 text-white"
                              : "bg-gray-500 hover:bg-gray-600 text-white"
                          )}
                        >
                          {isLongTermInternship.title}
                        </a>
                      </Link>
                    </span>
                  );
                })}
              </span>
            </button>
          </div>
          <p className="my-4 ">カテゴリで絞り込み</p>
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4">
            <div className="md:pr-8">
              <li key="jobType" className="my-2 xl:my-0">
                <button
                  type="button"
                  className="flex items-center w-full py-4 px-6 focus:outline-none bg-white text-left"
                  onClick={() => {
                    setExpandedInternshipGroup(
                      expandedInternshipGroup === "jobType"
                        ? ""
                        : "jobType" ?? ""
                    );
                  }}
                >
                  <p className="flex-grow">職種</p>
                  {expandedInternshipGroup === "jobType" ? (
                    <AiOutlineUp />
                  ) : (
                    <AiOutlineDown />
                  )}
                </button>
                {expandedInternshipGroup === "jobType" && (
                  <ul className="border-t">
                    {props.InternshipsJobType.map((jobType) => {
                      const isSelected = selectedJobTypes.some(
                        (selectedJobType) => selectedJobType.id === jobType.id
                      );
                      const newSelectedJobTypes = isSelected
                        ? selectedJobTypes.filter(
                            (selectedJobType) =>
                              selectedJobType.id !== jobType.id
                          )
                        : [...selectedJobTypes, jobType];
                      const newQuery: Query = {
                        features: newSelectedJobTypes.map(
                          (selectedJobType) => selectedJobType.slug ?? ""
                        ),
                      };
                      return (
                        <li key="features">
                          <Link
                            href={{ query: { ...query, ...newQuery } }}
                            scroll={false}
                          >
                            <a
                              className={clsx(
                                "block py-1 px-2",
                                isSelected ? "bg-secondary-300" : "bg-white"
                              )}
                            >
                              {jobType.name}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            </div>
            <div className="md:pr-4">
              <li key="industries" className="my-2 xl:my-0">
                <button
                  type="button"
                  className="flex items-center w-full py-4 px-6 focus:outline-none bg-white text-left"
                  onClick={() => {
                    setExpandedInternshipGroup(
                      expandedInternshipGroup === "industries"
                        ? ""
                        : "industries" ?? ""
                    );
                  }}
                >
                  <p className="flex-grow">業界</p>
                  {expandedInternshipGroup === "industries" ? (
                    <AiOutlineUp />
                  ) : (
                    <AiOutlineDown />
                  )}
                </button>
                {expandedInternshipGroup === "industries" && (
                  <ul className="border-t border-gray-200">
                    {props.InternshipsIndustry.map((industry) => {
                      const isSelected = selectedIndustries.some(
                        (selectedIndustry) =>
                          selectedIndustry.id === industry.id
                      );
                      const newSelectedindustries = isSelected
                        ? selectedIndustries.filter(
                            (selectedIndustry) =>
                              selectedIndustry.id !== industry.id
                          )
                        : [...selectedIndustries, industry];
                      const newQuery: Query = {
                        industry: newSelectedindustries.map(
                          (selectedIndustry) => selectedIndustry.slug ?? ""
                        ),
                      };
                      return (
                        <li key="industry">
                          <Link
                            href={{ query: { ...query, ...newQuery } }}
                            scroll={false}
                          >
                            <a
                              className={clsx(
                                "block py-1 px-2",
                                isSelected ? "bg-secondary-300" : "bg-white"
                              )}
                            >
                              {industry.name}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            </div>
            <div className="md:pl-4">
              <li key="features" className="my-2 xl:my-0">
                <button
                  type="button"
                  className="flex items-center w-full py-4 px-6 focus:outline-none bg-white text-left"
                  onClick={() => {
                    setExpandedInternshipGroup(
                      expandedInternshipGroup === "features"
                        ? ""
                        : "features" ?? ""
                    );
                  }}
                >
                  <p className="flex-grow">特徴</p>
                  {expandedInternshipGroup === "features" ? (
                    <AiOutlineUp />
                  ) : (
                    <AiOutlineDown />
                  )}
                </button>
                {expandedInternshipGroup === "features" && (
                  <ul className="border-t border-gray-200">
                    {props.InternshipsFeatures.map((feature) => {
                      const isSelected = selectedFeatures.some(
                        (selectedFeature) => selectedFeature.id === feature.id
                      );
                      const newSelectedFeatures = isSelected
                        ? selectedFeatures.filter(
                            (selectedFeature) =>
                              selectedFeature.id !== feature.id
                          )
                        : [...selectedFeatures, feature];
                      const newQuery: Query = {
                        features: newSelectedFeatures.map(
                          (selectedFeature) => selectedFeature.slug ?? ""
                        ),
                      };
                      return (
                        <li key="features">
                          <Link
                            href={{ query: { ...query, ...newQuery } }}
                            scroll={false}
                          >
                            <a
                              className={clsx(
                                "block py-1 px-2",
                                isSelected ? "bg-secondary-300" : "bg-white"
                              )}
                            >
                              {feature.name}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            </div>
            <div className="md:pl-8">
              <li key="isRecruiting" className="my-2 md:my-0 xl:mr-2">
                <button
                  type="button"
                  className="flex items-center w-full py-4 px-6 focus:outline-none bg-white text-left"
                  onClick={() => {
                    setExpandedInternshipGroup(
                      expandedInternshipGroup === "isRecruiting"
                        ? ""
                        : "isRecruiting"
                    );
                  }}
                >
                  <p className="flex-grow">募集状況</p>
                  {expandedInternshipGroup === "isRecruiting" ? (
                    <AiOutlineUp />
                  ) : (
                    <AiOutlineDown />
                  )}
                </button>
                {expandedInternshipGroup === "isRecruiting" && (
                  <ul className="border-t border-gray-200">
                    {[
                      { title: "募集中", boolean: "true" },
                      { title: "募集終了", boolean: "false" },
                    ].map((isRecruiting) => {
                      const newQuery: Query = {
                        isRecruiting:
                          query.isRecruiting === isRecruiting.boolean
                            ? undefined
                            : isRecruiting.boolean ?? undefined,
                      };
                      return (
                        <li key={isRecruiting.title}>
                          <Link
                            href={{ query: { ...query, ...newQuery } }}
                            scroll={false}
                          >
                            <a
                              className={clsx(
                                "block py-1 px-6",
                                query.isRecruiting === isRecruiting.boolean
                                  ? "bg-secondary-300"
                                  : "bg-white"
                              )}
                            >
                              {isRecruiting.title}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              const newQuery: Query = { q: search };
              router.push({ query: { ...query, ...newQuery } });
              e.preventDefault();
            }}
          >
            <div className="flex items-stretch my-16">
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
                <ul className="md:grid md:grid-cols-1 xl:grid-cols-1 mx-12">
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
        allIndustries {
          id
          name
          slug
        }
        allInternshipJobTypes {
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
      InternshipsIndustry: metaQueryResult.data.allIndustries,
      InternshipsJobType: metaQueryResult.data.allInternshipJobTypes,
      totalInternshipsCount: metaQueryResult.data._allInternshipsMeta.count,
    },
  };
}