import { gql, useQuery } from "@apollo/client";
import clsx from "clsx";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { AiOutlineDown, AiOutlineSearch, AiOutlineUp } from "react-icons/ai";
import * as s from "superstruct";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ArticleLink from "../../components/ArticleLink";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import ImageOrLogo from "../../components/ImageOrLogo";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import { ClubIndexMetaQuery } from "../../__generated__/ClubIndexMetaQuery";
import {
  ClubSearchQuery,
  ClubSearchQueryVariables,
} from "../../__generated__/ClubSearchQuery";
import { ClubModelFilter } from "../../__generated__/globalTypes";
import {
  RandomClubQuery,
  RandomClubQueryVariables,
} from "../../__generated__/RandomClubQuery";

const queryType = s.type({
  q: s.optional(s.string()),
  category: s.optional(s.string()),
  tag: s.optional(s.union([s.string(), s.array(s.string())])),
});
export type Query = s.Infer<typeof queryType>;

const ARTICLES_PER_PAGE = 12;

const clubSearchFragment = gql`
  fragment ClubSearchFragment on ClubRecord {
    id
    name
    images {
      url(imgixParams: { maxW: 600 })
    }
    category {
      name
    }
    tags {
      id
      slug
      name
    }
  }
`;

export default function ClubIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const query = router.query as s.Infer<typeof queryType>;
  const [search, setSearch] = useState(query.q ?? "");

  const randomClubIndex1 = useMemo(
    () => Math.floor(Math.random() * props.totalClubCount),
    [props.totalClubCount]
  );
  const randomClubIndex2 = useMemo(
    () => Math.floor(Math.random() * props.totalClubCount),
    [props.totalClubCount]
  );
  const randomClubIndex3 = useMemo(
    () => Math.floor(Math.random() * props.totalClubCount),
    [props.totalClubCount]
  );
  const randomClubQuery = useQuery<RandomClubQuery, RandomClubQueryVariables>(
    gql`
      ${clubSearchFragment}
      query RandomClubQuery(
        $randomClubIndex1: IntType!
        $randomClubIndex2: IntType!
        $randomClubIndex3: IntType!
      ) {
        club1: allClubs(skip: $randomClubIndex1, first: 1) {
          ...ClubSearchFragment
        }
        club2: allClubs(skip: $randomClubIndex2, first: 1) {
          ...ClubSearchFragment
        }
        club3: allClubs(skip: $randomClubIndex3, first: 1) {
          ...ClubSearchFragment
        }
      }
    `,
    {
      variables: { randomClubIndex1, randomClubIndex2, randomClubIndex3 },
      ssr: false,
    }
  );

  const selectedCategorySlug = query.category;
  const selectedCategory =
    props.clubCategories.find(
      (category) => category.slug === selectedCategorySlug
    ) ?? null;
  const [expandedCategoryGroupIds, setExpandedCategoryGroupIds] = useState<
    string[]
  >(selectedCategory?.group ? [selectedCategory?.group.id] : []);
  const selectedTagSlugs = Array.isArray(query.tag) ? query.tag : [query.tag];
  const selectedTags = props.clubTags.filter((tag) =>
    selectedTagSlugs.some((slug) => slug === tag.slug)
  );
  const nameFilter: ClubModelFilter = query.q
    ? { name: { matches: { pattern: query.q || "" } } }
    : {};
  const categoryFilter: ClubModelFilter = selectedCategory
    ? { category: { eq: selectedCategory.id } }
    : {};
  const tagFilter: ClubModelFilter = selectedTags.length
    ? { tags: { allIn: selectedTags.map((tag) => tag.id) } }
    : {};
  const searchQuery = useQuery<ClubSearchQuery, ClubSearchQueryVariables>(
    gql`
      ${clubSearchFragment}
      query ClubSearchQuery(
        $filter: ClubModelFilter
        $first: IntType
        $skip: IntType
      ) {
        allClubs(filter: $filter, first: $first, skip: $skip) {
          ...ClubSearchFragment
        }
        _allClubsMeta(filter: $filter) {
          count
        }
      }
    `,
    {
      variables: {
        filter: { ...nameFilter, ...categoryFilter, ...tagFilter },
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

  const randomClub1 = randomClubQuery.data?.club1[0];
  const searchQueryData = searchQuery.data;
  const randomClubs = [
    randomClubQuery.data?.club1[0],
    randomClubQuery.data?.club2[0],
    randomClubQuery.data?.club3[0],
  ];

  const [pickUpIndex, setPickUpIndex] = useState(0);
  const indexForward = () => {
    setPickUpIndex(pickUpIndex !== 2 ? pickUpIndex + 1 : pickUpIndex);
  };
  const indexback = () => {
    setPickUpIndex(pickUpIndex !== 0 ? pickUpIndex - 1 : pickUpIndex);
  };
  return (
    <Layout title="サークル">
      <Hero image="/images/top-clubs.jpg">
        <div className="pt-40 pb-24 px-20 md:px-56 md:pt-56 md:pb-32">
          <h1 className="text-6xl">Circle</h1>
          <h2>サークル選択のサポート</h2>
        </div>
      </Hero>
      <Banners />
      <section className="container mx-auto py-24 lg:py-32">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold">PICKUP{randomClub1?.id}</h2>
          <p className="text-secondary-main">注目のサークル</p>
        </header>
        <div className="relative px-6 lg:mx-24">
          <button
            className="absolute top-52 md:top-56 lg:top-60 left-0 z-10 h-12 w-12 rounded-full bg-primary-400 text-white text-xs hover:bg-primary-50 focus:outline-none"
            type="button"
            onClick={() => {
              indexback();
            }}
          >
            <BsChevronLeft className="m-auto" />
          </button>
          <button
            className="absolute top-52 md:top-56 lg:top-60 right-0 z-10 h-12 w-12 rounded-full bg-primary-400 text-white text-xs hover:bg-primary-50 focus:outline-none"
            type="button"
            onClick={() => {
              indexForward();
            }}
          >
            <BsChevronRight className="m-auto" />
          </button>
          {randomClubs.map((randomClub, index) => (
            <Link key={randomClub?.id} href={`/clubs/${randomClub?.id}`}>
              <a
                className={clsx("block relative hover:bg-gray-100 p-8", {
                  hidden: index !== pickUpIndex,
                })}
              >
                <ImageOrLogo
                  alt={randomClub?.name ?? ""}
                  src={randomClub?.images[0]?.url}
                  className="w-full h-96"
                />
                <div className="inline-block relative z-10 -mt-6 lg:-mt-12 lg:p-14 lg:mr-32 lg:bg-white">
                  <div className="inline-block bg-secondary-main py-2 px-6 text-white">
                    {randomClub?.category?.name}
                  </div>
                  <p className={clsx("my-6 text-3xl lg:text-4xl")}>
                    {randomClub?.name}
                  </p>
                  <ul>
                    {randomClub?.tags.map((tag) => (
                      <li
                        key={tag.id}
                        className="inline-block mr-2 my-2 p-1 border bg-gray-200 text-sm"
                      >
                        {`#${tag.name}`}
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
          ))}
        </div>
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
              <ul className="space-y-2">
                {props.clubCategoryGroups.map((clubCategoryGroup) => {
                  const isExpanded = expandedCategoryGroupIds.includes(
                    clubCategoryGroup.id
                  );
                  return (
                    <li key={clubCategoryGroup.id} className="bg-white">
                      <button
                        type="button"
                        className={clsx(
                          "flex items-center w-full py-4 px-6 focus:outline-none bg-white text-left"
                        )}
                        onClick={() => {
                          setExpandedCategoryGroupIds(
                            expandedCategoryGroupIds
                              .filter((id) => id !== clubCategoryGroup.id)
                              .concat(isExpanded ? [] : [clubCategoryGroup.id])
                          );
                        }}
                      >
                        <p className="flex-grow">{clubCategoryGroup.name}</p>
                        {isExpanded ? <AiOutlineUp /> : <AiOutlineDown />}
                      </button>
                      {isExpanded && (
                        <ul className="border-t border-gray-200">
                          {props.clubCategories
                            .filter(
                              (category) =>
                                category.group?.id === clubCategoryGroup.id
                            )
                            .map((category) => {
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
                                          ? "bg-yellow-300"
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
                  );
                })}
              </ul>
            </div>
            <div className="md:pl-8">
              <h3 className="text-2xl">タグで検索</h3>
              {props.clubTagCategories.map((tagCategory) => (
                <div key={tagCategory.id} className="my-4">
                  <header className="flex items-center mb-2">
                    <h4 className="text-lg mr-2">{tagCategory.name}</h4>
                    <div
                      aria-hidden
                      className="flex-grow border-b border-gray-400"
                    />
                  </header>
                  <ul>
                    {props.clubTags
                      .filter((tag) => tag.category?.id === tagCategory.id)
                      .map((tag) => {
                        const isSelected = selectedTags.some(
                          (selectedTag) => selectedTag.id === tag.id
                        );
                        const newSelectedTags = isSelected
                          ? selectedTags.filter(
                              (selectedTag) => selectedTag.id !== tag.id
                            )
                          : [...selectedTags, tag];
                        const newQuery: Query = {
                          tag: newSelectedTags.map(
                            (selectedTag) => selectedTag.slug ?? ""
                          ),
                        };
                        return (
                          <li key={tag.id} className="inline-block mr-2 mb-2">
                            <Link
                              href={{ query: { ...query, ...newQuery } }}
                              scroll={false}
                            >
                              <a
                                className={clsx(
                                  "block py-1 px-2 text-sm",
                                  isSelected ? "bg-yellow-300" : "bg-white"
                                )}
                              >
                                {`#${tag.name}`}
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto my-12">
        {searchQueryData ? (
          <>
            {searchQueryData._allClubsMeta.count === 0 ? (
              <p className="px-8">
                サークルが見つかりませんでした。キーワードを変えてお試しください。
              </p>
            ) : (
              <>
                <p className="mb-8 px-8">{`${searchQueryData._allClubsMeta.count}件のサークルが見つかりました。`}</p>
                <ul className="md:grid md:grid-cols-2 xl:grid-cols-3">
                  {searchQueryData.allClubs.map((club) => (
                    <li key={club.id}>
                      <ArticleLink
                        title={club.name ?? ""}
                        category={club.category?.name ?? ""}
                        url={`/clubs/${club.id}`}
                        imageUrl={club.images[0]?.url ?? "/images/utmap.png"}
                        tags={club.tags.map((tag) => ({
                          id: tag.id,
                          name: tag.name ?? "",
                        }))}
                        className="h-full"
                      />
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-8">
                  {searchQueryData.allClubs.length <
                  searchQueryData._allClubsMeta.count ? (
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
  const metaQueryResult = await apolloClient.query<ClubIndexMetaQuery>({
    query: gql`
      query ClubIndexMetaQuery {
        allClubCategoryGroups {
          id
          name
        }
        allClubCategories(first: 100) {
          id
          name
          slug
          group {
            id
          }
        }
        allClubTags(first: 100) {
          id
          name
          slug
          category {
            id
          }
        }
        allClubTagCategories(first: 100) {
          id
          name
        }
        _allClubsMeta {
          count
        }
      }
    `,
  });
  return {
    props: {
      clubCategoryGroups: metaQueryResult.data.allClubCategoryGroups,
      clubCategories: metaQueryResult.data.allClubCategories,
      clubTags: metaQueryResult.data.allClubTags,
      clubTagCategories: metaQueryResult.data.allClubTagCategories,
      totalClubCount: metaQueryResult.data._allClubsMeta.count,
    },
  };
}
