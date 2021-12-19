import { gql, useQuery } from "@apollo/client";
import clsx from "clsx";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { AiOutlineDown, AiOutlineSearch, AiOutlineUp } from "react-icons/ai";
import * as s from "superstruct";
import Link from "next/link";
import Banners from "../../components/Banners";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import { EventIndexMetaQuery } from "../../__generated__/EventIndexMetaQuery";
import {
  EventSearchQuery,
  EventSearchQueryVariables,
} from "../../__generated__/EventSearchQuery";
import {
  EventModelFilter,
  EventModelOrderBy,
} from "../../__generated__/globalTypes";
import AritcleLinkEvent from "../../components/ArticleLinkEvent";
import {
  RandomEventQuery,
  RandomEventQueryVariables,
} from "../../__generated__/RandomEventQuery";
import SectionHeader from "../../components/SectionHeader";
import IndexHeroContent from "../../components/IndexHeroContent";
import HighlightedArticleLink from "../../components/HighlightedArticleLink";
import { responsiveImageFragment } from "../../utils/datocms";

const queryOrderByType = s.union([
  s.literal("createdAt"),
  s.literal("startsAt"),
  s.literal("applicationDeadline"),
]);
type QueryOrderBy = s.Infer<typeof queryOrderByType>;

const queryOrderByMap: Record<QueryOrderBy, EventModelOrderBy> = {
  applicationDeadline: EventModelOrderBy.applicationDeadlineString_ASC,
  createdAt: EventModelOrderBy.createdAt_DESC,
  startsAt: EventModelOrderBy.startsAt_ASC,
};

const queryType = s.type({
  q: s.optional(s.string()),
  category: s.optional(s.string()),
  isRecruiting: s.optional(s.string()),
  targets: s.optional(s.union([s.string(), s.array(s.string())])),
  features: s.optional(s.union([s.string(), s.array(s.string())])),
  orderBy: s.optional(queryOrderByType),
  page: s.optional(s.string()),
});
export type Query = s.Infer<typeof queryType>;

const eventSearchFragment = gql`
  ${responsiveImageFragment}
  fragment EventSearchFragment on EventRecord {
    id
    slug
    title
    thumbnailImage {
      id
      url
      responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
        ...ResponsiveImageFragment
      }
    }
    schedule
    location
    company {
      name
      industry {
        name
      }
      logo {
        url
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
  const query = router.query as s.Infer<typeof queryType>;
  const [search, setSearch] = useState(query.q ?? "");
  const [expandedEventGroup, setExpandedEventGroup] = useState("");
  const ARTICLES_PER_PAGE = 9;

  const randomEventIndex = useMemo(
    () => Math.floor(Math.random() * props.totalRecruitingEventCount),
    [props.totalRecruitingEventCount]
  );
  const randomEventQuery = useQuery<
    RandomEventQuery,
    RandomEventQueryVariables
  >(
    gql`
      ${eventSearchFragment}
      query RandomEventQuery($randomEventIndex: IntType!) {
        allEvents(
          filter: { isRecruiting: { eq: true } }
          skip: $randomEventIndex
          first: 1
        ) {
          ...EventSearchFragment
        }
      }
    `,
    {
      variables: { randomEventIndex },
      ssr: false,
      skip: props.totalRecruitingEventCount === 0,
    }
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
  const selectedOrderBy = [queryOrderByMap[query.orderBy ?? "createdAt"]];
  const selectedPage = query.page ? parseInt(query.page, 10) : 0;
  const searchQuery = useQuery<EventSearchQuery, EventSearchQueryVariables>(
    gql`
      ${eventSearchFragment}
      query EventSearchQuery(
        $filter: EventModelFilter
        $orderBy: [EventModelOrderBy]
        $first: IntType
        $skip: IntType
      ) {
        allEvents(
          filter: $filter
          orderBy: $orderBy
          first: $first
          skip: $skip
        ) {
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
        orderBy: selectedOrderBy,
        first: ARTICLES_PER_PAGE,
        skip: ARTICLES_PER_PAGE * selectedPage ?? 0,
      },
      ssr: false,
    }
  );

  const searchQueryData = searchQuery.data;
  const randomEvent = randomEventQuery.data?.allEvents[0];
  const totalPages =
    searchQueryData && searchQueryData._allEventsMeta.count > ARTICLES_PER_PAGE
      ? Math.floor(searchQueryData._allEventsMeta.count / ARTICLES_PER_PAGE) + 1
      : undefined;
  const pageIndex = totalPages && [...Array(totalPages)].map((_, i) => i);
  return (
    <Layout title="イベント">
      <IndexHeroContent
        imageUrl="/images/article.jpg"
        title="Event"
        subtitle="イベント"
      />
      <Banners />
      {props.totalRecruitingEventCount > 0 && (
        <section className="container mx-auto py-12 md:py-24">
          <SectionHeader
            className="mb-6 md:mb-12"
            title="PICKUP"
            subtitle="注目のイベント"
          />
          <HighlightedArticleLink
            title={randomEvent?.title ?? ""}
            url={`/events/${randomEvent?.slug}`}
            aspectRatio={16 / 9}
            responsiveImage={randomEvent?.thumbnailImage?.responsiveImage}
            subImageUrl={randomEvent?.company?.logo?.url}
            category={randomEvent?.isRecruiting ? "募集中" : "募集終了"}
            isCategoryActive={randomEvent?.isRecruiting}
            information={
              randomEvent?.company ? (
                <p className="block mt-2">{`${randomEvent?.company?.name} / ${randomEvent?.company?.industry?.name}`}</p>
              ) : (
                <div />
              )
            }
          />
        </section>
      )}
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
                        <li key={target.id}>
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
                        <li key={feature.id}>
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
                <p className="px-8">{`${searchQueryData._allEventsMeta.count}件のイベントが見つかりました。`}</p>
                <div className="py-12 text-center items-center">
                  <div className="py-1 px-3 mr-4 hidden sm:inline-block bg-primary-main text-white ">
                    並び替え順
                  </div>
                  {[
                    { title: "新着", slug: "createdAt", default: undefined },
                    { title: "開催日", slug: "startsAt", default: "false" },
                    {
                      title: "締め切り日",
                      slug: "applicationDeadline",
                      default: "false",
                    },
                  ].map((component) => {
                    const createdAtSlug =
                      component.slug === "createdAt" ? "createdAt" : undefined;
                    const startsAtSlug =
                      !createdAtSlug && component.slug === "startsAt"
                        ? "startsAt"
                        : undefined;
                    const applicationDeadlineSlug =
                      !startsAtSlug && component.slug === "applicationDeadline"
                        ? "applicationDeadline"
                        : undefined;
                    const newQuery: Query = {
                      orderBy:
                        createdAtSlug ??
                        startsAtSlug ??
                        applicationDeadlineSlug,
                    };
                    return (
                      <div
                        key={component.slug}
                        className="relative inline-block pl-1"
                      >
                        <Link
                          href={{ query: { ...query, ...newQuery } }}
                          scroll={false}
                        >
                          <a
                            className={clsx(
                              "inline-block px-2 md:px-4",
                              query.orderBy === component.slug ||
                                query.orderBy === component.default
                                ? "text-black"
                                : "text-gray-400"
                            )}
                          >
                            {component.title}
                          </a>
                        </Link>
                        <div
                          className={clsx(
                            "absolute left-1/2 -bottom-4 h-2 w-2 rounded-full",
                            query.orderBy === component.slug ||
                              query.orderBy === component.default
                              ? "bg-primary-main"
                              : "hidden"
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
                <ul className="md:grid md:grid-cols-2 xl:grid-cols-3">
                  {searchQueryData?.allEvents.map((event) => (
                    <li key={event.id}>
                      <AritcleLinkEvent
                        title={event.title ?? ""}
                        url={`events/${event.slug}`}
                        imageUrl={
                          event.thumbnailImage?.url ?? "/images/utmap.png"
                        }
                        companyLogoUrl={
                          event.company?.logo?.url ?? "/images/utmap.png"
                        }
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
              </>
            )}
            <div className="py-12 text-center space-x-2">
              {pageIndex &&
                pageIndex.map((index) => {
                  const newQuery: Query = {
                    page: index.toString(),
                  };

                  return (
                    <Link
                      key={index}
                      href={{ query: { ...query, ...newQuery } }}
                      scroll={false}
                    >
                      <a
                        className={clsx(
                          "inline-block h-12 w-12 pt-1 text-center leading-10 text-sm",
                          selectedPage === index
                            ? "bg-primary-main text-white"
                            : "text-primary-main"
                        )}
                      >
                        {index + 1}
                      </a>
                    </Link>
                  );
                })}
            </div>
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
        _allEventsMeta(filter: { isRecruiting: { eq: true } }) {
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
      totalRecruitingEventCount: metaQueryResult.data._allEventsMeta.count,
    },
    revalidate: 60,
  };
}
