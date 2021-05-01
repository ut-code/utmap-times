import { gql, useQuery } from "@apollo/client";
import clsx from "clsx";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { AiOutlineDown, AiOutlineSearch, AiOutlineUp } from "react-icons/ai";
import * as s from "superstruct";
import Link from "next/link";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import { EventIndexMetaQuery } from "../../__generated__/EventIndexMetaQuery";
import {
  EventSearchQuery,
  EventSearchQueryVariables,
} from "../../__generated__/EventSearchQuery";
import { EventModelFilter } from "../../__generated__/globalTypes";
import AritcleLinkEvent from "../../components/ArticleLinkEvent";
import {
  RandomEventQuery,
  RandomEventQueryVariables,
} from "../../__generated__/RandomEventQuery";
import ImageOrLogo from "../../components/ImageOrLogo";

const queryType = s.type({
  q: s.optional(s.string()),
  category: s.optional(s.string()),
  isRecruiting: s.optional(s.string()),
  targets: s.optional(s.union([s.string(), s.array(s.string())])),
  features: s.optional(s.union([s.string(), s.array(s.string())])),
});
export type Query = s.Infer<typeof queryType>;

const ARTICLES_PER_PAGE = 12;

const eventSearchFragment = gql`
  fragment EventSearchFragment on EventRecord {
    id
    slug
    title
    image {
      id
      url
    }
    schedule
    location
    company {
      name
      industry {
        name
      }
    }
    category {
      id
      slug
      name
    }
    targets {
      id
      slug
      name
    }
    features {
      id
      slug
      name
    }
    isRecruiting
  }
`;

export default function EventIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const query = router.query as s.Infer<typeof queryType>;
  const [search, setSearch] = useState(query.q ?? "");
  const [expandedEventGroup, setExpandedEventGroup] = useState("");

  const randomEventIndex = useMemo(
    () => Math.floor(Math.random() * props.totalEventCount),
    [props.totalEventCount]
  );
  const randomEventQuery = useQuery<
    RandomEventQuery,
    RandomEventQueryVariables
  >(
    gql`
      ${eventSearchFragment}
      query RandomEventQuery($randomEventIndex: IntType!) {
        allEvents(skip: $randomEventIndex, first: 1) {
          ...EventSearchFragment
        }
      }
    `,
    { variables: { randomEventIndex }, ssr: false }
  );

  const selectedCategorySlug = query.category;
  const selectedCategory =
    props.eventCategories.find(
      (category) => category.slug === selectedCategorySlug
    ) ?? null;
  const selectedTargetSlugs = Array.isArray(query.targets)
    ? query.targets
    : [query.targets];
  const selectedTargets = props.eventTargets.filter((target) =>
    selectedTargetSlugs?.some((slug) => slug === target.slug)
  );
  const selectedFeatureSlugs = Array.isArray(query.features)
    ? query.features
    : [query.features];
  const selectedFeatures = props.eventFeatures.filter((feature) =>
    selectedFeatureSlugs?.some((slug) => slug === feature.slug)
  );
  const titleFilter: EventModelFilter = query.q
    ? { title: { matches: { pattern: query.q || "" } } }
    : {};
  const categoryFilter: EventModelFilter = selectedCategory
    ? { category: { eq: selectedCategory.id } }
    : {};
  const isRecrutingFilter: EventModelFilter = query.isRecruiting
    ? { isRecruiting: { eq: query.isRecruiting } }
    : {};
  const targetFilter: EventModelFilter = selectedTargets
    ? {
        targets: {
          allIn: selectedTargets.map((selectedTarget) => selectedTarget.id),
        },
      }
    : {};
  const featureFilter: EventModelFilter = selectedFeatures
    ? {
        features: {
          allIn: selectedFeatures.map((selectedFeature) => selectedFeature.id),
        },
      }
    : {};
  const searchQuery = useQuery<EventSearchQuery, EventSearchQueryVariables>(
    gql`
      ${eventSearchFragment}
      query EventSearchQuery($filter: EventModelFilter) {
        allEvents(filter: $filter) {
          ...EventSearchFragment
        }
        _allEventsMeta(filter: $filter) {
          count
        }
      }
    `,
    {
      variables: {
        filter: {
          ...titleFilter,
          ...categoryFilter,
          ...isRecrutingFilter,
          ...targetFilter,
          ...featureFilter,
        },
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
  const randomEvent = randomEventQuery.data?.allEvents[0];

  return (
    <Layout title="イベント">
      <Hero image="/images/article.jpg">
        <div className="pt-40 pb-24 px-20 md:px-56 md:pt-56 md:pb-32">
          <h1 className="text-6xl">Event</h1>
          <h2>イベント</h2>
        </div>
      </Hero>
      <Banners />
      <section className="container mx-auto pt-24 pb-80">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold">PICKUP</h2>
          <p className="text-secondary-main">注目のイベント</p>
        </header>
        <Link href={`/events/${randomEvent?.slug}`}>
          <a className="block relative hover:bg-gray-100 p-8">
            <ImageOrLogo
              alt={randomEvent?.title ?? ""}
              src={randomEvent?.image?.url}
              className="w-full h-96 bg-cover"
            />
            <div className="absolute -bottom-28 bg-white p-8">
              <div className="flex py-4 items-center text-left">
                <h3 className="flex-grow pl-2 pr-8 border-l-4 border-secondary-main text-2xl font-bold">
                  {randomEvent?.title}
                </h3>
                <p
                  className={clsx(
                    "py-1 px-4 text-white text-sm",
                    randomEvent?.isRecruiting
                      ? "bg-secondary-main"
                      : "bg-gray-500"
                  )}
                >
                  {randomEvent?.isRecruiting ? "募集中" : "募集終了"}
                </p>
              </div>
              <p>{randomEvent?.schedule}</p>
              <p>{`開催場所：${randomEvent?.location}`}</p>
              <p className="my-3 py-1 border-b border-gray-500 text-lg">
                {`${randomEvent?.company?.name} / ${randomEvent?.company?.industry?.name}`}
              </p>
              {randomEvent?.targets.map((target) => (
                <p className="inline-block mr-2 my-2 p-1 border bg-gray-200">{`#${target.name}`}</p>
              ))}
              {randomEvent?.features.map((feature) => (
                <p className="inline-block mr-2 my-2 p-1 border bg-gray-200">{`#${feature.name}`}</p>
              ))}
            </div>
          </a>
        </Link>
      </section>
      <section className="bg-gray-200">
        <div className="container mx-auto py-16 px-8 md:px-24">
          <h3 className="pb-6 text-2xl">カテゴリで絞り込み</h3>
          <div className="w-full pb-4">
            <ul className="md:grid md:grid-cols-2 xl:grid-cols-4">
              <li key="category" className="md:mr-2">
                <button
                  type="button"
                  className="flex items-center w-full py-4 px-6 focus:outline-none bg-white text-left"
                  onClick={() => {
                    setExpandedEventGroup(
                      expandedEventGroup === "category" ? "" : "category"
                    );
                  }}
                >
                  <p className="flex-grow">イベント種類</p>
                  {expandedEventGroup === "category" ? (
                    <AiOutlineUp />
                  ) : (
                    <AiOutlineDown />
                  )}
                </button>
                {expandedEventGroup === "category" && (
                  <ul className="border-t border-gray-200">
                    {props.eventCategories.map((category) => {
                      const newQuery: Query = {
                        category:
                          selectedCategory?.id === category.id
                            ? undefined
                            : category.slug ?? undefined,
                      };
                      return (
                        <li key={category.id}>
                          <Link
                            href={{ query: { ...query, ...newQuery } }}
                            scroll={false}
                          >
                            <a
                              className={clsx(
                                "block py-1 px-6",
                                query.category === category.slug
                                  ? "bg-secondary-300"
                                  : "bg-white"
                              )}
                            >
                              {category.name}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
              <li key="isRecruiting" className="my-2 md:my-0 xl:mr-2">
                <button
                  type="button"
                  className="flex items-center w-full py-4 px-6 focus:outline-none bg-white text-left"
                  onClick={() => {
                    setExpandedEventGroup(
                      expandedEventGroup === "isRecruiting"
                        ? ""
                        : "isRecruiting"
                    );
                  }}
                >
                  <p className="flex-grow">募集状況</p>
                  {expandedEventGroup === "isRecruiting" ? (
                    <AiOutlineUp />
                  ) : (
                    <AiOutlineDown />
                  )}
                </button>
                {expandedEventGroup === "isRecruiting" && (
                  <ul className="border-t border-gray-200">
                    {[
                      { title: "募集中", boolean: "true" },
                      { title: "募集終了", boolean: "false" },
                    ].map((component) => {
                      const newQuery: Query = {
                        isRecruiting:
                          query.isRecruiting === component.boolean
                            ? undefined
                            : component.boolean ?? undefined,
                      };
                      return (
                        <li key={component.title}>
                          <Link
                            href={{ query: { ...query, ...newQuery } }}
                            scroll={false}
                          >
                            <a
                              className={clsx(
                                "block py-1 px-6",
                                query.isRecruiting === component.boolean
                                  ? "bg-secondary-300"
                                  : "bg-white"
                              )}
                            >
                              {component.title}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
              <li key="targets" className="my-2 md:mr-2 xl:my-0">
                <button
                  type="button"
                  className="flex items-center w-full py-4 px-6 focus:outline-none bg-white text-left"
                  onClick={() => {
                    setExpandedEventGroup(
                      expandedEventGroup === "targets" ? "" : "targets" ?? ""
                    );
                  }}
                >
                  <p className="flex-grow">対象</p>
                  {expandedEventGroup === "targets" ? (
                    <AiOutlineUp />
                  ) : (
                    <AiOutlineDown />
                  )}
                </button>
                {expandedEventGroup === "targets" && (
                  <ul className="border-t border-gray-200">
                    {props.eventTargets.map((target) => {
                      const isSelected = selectedTargets.some(
                        (selectedTarget) => selectedTarget.id === target.id
                      );
                      const newSelectedTargets = isSelected
                        ? selectedTargets.filter(
                            (selectedTarget) => selectedTarget.id !== target.id
                          )
                        : [...selectedTargets, target];
                      const newQuery: Query = {
                        targets: newSelectedTargets.map(
                          (selectedTarget) => selectedTarget.slug ?? ""
                        ),
                      };
                      return (
                        <li key="targets">
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
                              {target.name}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
              <li key="features" className="my-2 xl:my-0">
                <button
                  type="button"
                  className="flex items-center w-full py-4 px-6 focus:outline-none bg-white text-left"
                  onClick={() => {
                    setExpandedEventGroup(
                      expandedEventGroup === "features" ? "" : "features" ?? ""
                    );
                  }}
                >
                  <p className="flex-grow">特徴</p>
                  {expandedEventGroup === "features" ? (
                    <AiOutlineUp />
                  ) : (
                    <AiOutlineDown />
                  )}
                </button>
                {expandedEventGroup === "features" && (
                  <ul className="border-t border-gray-200">
                    {props.eventFeatures.map((feature) => {
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
            </ul>
          </div>
          <form
            onSubmit={(e) => {
              const newQuery: Query = { q: search };
              router.push({ query: { ...query, ...newQuery } });
              e.preventDefault();
            }}
          >
            <div className="flex items-stretch">
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
            {searchQueryData._allEventsMeta.count === 0 ? (
              <p className="px-8">
                イベントが見つかりませんでした。キーワードを変えてお試しください。
              </p>
            ) : (
              <>
                <p>{`${searchQueryData._allEventsMeta.count}件のイベントが見つかりました。`}</p>
                <ul className="md:grid md:grid-cols-2 xl:grid-cols-3">
                  {searchQueryData?.allEvents.map((event) => (
                    <li key={event.id}>
                      <AritcleLinkEvent
                        title={event.title ?? ""}
                        url={`events/${event.slug}`}
                        imageUrl={event.image?.url ?? "/images/utmap.png"}
                        schedule={event.schedule ?? ""}
                        location={event.location ?? ""}
                        companyName={event.company?.name ?? undefined}
                        industryName={
                          event.company?.industry?.name ?? undefined
                        }
                        targets={event.targets.map((target) => ({
                          id: target.id,
                          name: target.name ?? "",
                        }))}
                        features={event.features.map((feature) => ({
                          id: feature.id,
                          name: feature.name ?? "",
                        }))}
                        isRecruiting={event.isRecruiting}
                      />
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-8">
                  {searchQueryData.allEvents.length <
                  searchQueryData._allEventsMeta.count ? (
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
                      すべてのイベントを検索しました。
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
  const metaQueryResult = await apolloClient.query<EventIndexMetaQuery>({
    query: gql`
      query EventIndexMetaQuery {
        allEventCategories(first: 100) {
          id
          name
          slug
        }
        allEventTargets(first: 100) {
          id
          name
          slug
        }
        allEventFeatures {
          id
          name
          slug
        }
        _allEventsMeta {
          count
        }
      }
    `,
  });
  return {
    props: {
      eventCategories: metaQueryResult.data.allEventCategories,
      eventTargets: metaQueryResult.data.allEventTargets,
      eventFeatures: metaQueryResult.data.allEventFeatures,
      totalEventCount: metaQueryResult.data._allEventsMeta.count,
    },
  };
}
