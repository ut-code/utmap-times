import { gql } from "@apollo/client";
import clsx from "clsx";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineDown, AiOutlineSearch, AiOutlineUp } from "react-icons/ai";
import * as s from "superstruct";
import ArticleLink from "../../components/ArticleLink";
import Hero from "../../components/Hero";
import ImageOrLogo from "../../components/ImageOrLogo";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import { ClubIndexMetaQuery } from "../../__generated__/ClubIndexMetaQuery";
import {
  ClubIndexQuery,
  ClubIndexQueryVariables,
} from "../../__generated__/ClubIndexQuery";
import { ClubModelFilter } from "../../__generated__/globalTypes";

const queryType = s.type({
  q: s.optional(s.string()),
  category: s.optional(s.string()),
  tag: s.optional(s.union([s.string(), s.array(s.string())])),
});
export type Query = s.Infer<typeof queryType>;

export default function ClubIndexPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const query = router.query as s.Infer<typeof queryType>;
  const [search, setSearch] = useState(query.q ?? "");
  const selectedCategory =
    props.clubCategories.find((category) => category.slug === query.category) ??
    null;
  const [expandedCategoryGroupIds, setExpandedCategoryGroupIds] = useState<
    string[]
  >(selectedCategory?.group ? [selectedCategory?.group.id] : []);

  return (
    <Layout title="サークル">
      <Hero image="/images/top-clubs.jpg">
        <div className="pt-40 pb-24 px-20 md:px-56 md:pt-56 md:pb-32">
          <h1 className="text-6xl">Circle</h1>
          <h2>サークル選択のサポート</h2>
        </div>
      </Hero>
      <section className="container mx-auto py-24 lg:py-32">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold">PICKUP</h2>
          <p className="text-secondary-main">注目のサークル</p>
        </header>
        <Link href={`/clubs/${props.randomClub.id}`}>
          <a className="block relative hover:bg-gray-100 p-8">
            <ImageOrLogo
              alt={props.randomClub.name ?? ""}
              src={props.randomClub.images[0]?.url}
              className="w-full h-96"
            />
            <div className="inline-block relative z-10 -mt-6 lg:-mt-12 lg:p-14 lg:mr-32 lg:bg-white">
              <div className="inline-block bg-secondary-main py-2 px-6 text-white">
                {props.randomClub.category?.name}
              </div>
              <p className="my-6 text-3xl lg:text-4xl">
                {props.randomClub.name}
              </p>
              <ul>
                {props.randomClub.tags.map((tag) => (
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
                        const isSelected = props.selectedTags.some(
                          (selectedTag) => selectedTag.id === tag.id
                        );
                        const newSelectedTags = isSelected
                          ? props.selectedTags.filter(
                              (selectedTag) => selectedTag.id !== tag.id
                            )
                          : [...props.selectedTags, tag];
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
        {!props.foundClubs.length && (
          <p>
            サークルが見つかりませんでした。キーワードを変えてお試しください。
          </p>
        )}
        <ul className="md:grid md:grid-cols-2 xl:grid-cols-3">
          {props.foundClubs.map((club) => (
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
              />
            </li>
          ))}
        </ul>
      </section>
      <div className="text-center py-5">
        <button
          type="button"
          className="h-12 w-64 text-white bg-blue-900 hover:bg-blue-500"
        >
          もっと見る
        </button>
      </div>
      <div className="text-center h-auto py-12 bg-gray-100">
        <p className="text-4xl font-bold">SCHEDULE</p>
        <p className="text-yellow-500">新歓情報</p>
      </div>
      <div className="text-center h-auto py-12">
        <p className="text-4xl font-bold">HISTORY</p>
        <p className="text-yellow-500">閲覧履歴</p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!s.is(context.query, queryType)) return { notFound: true } as never;
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
  const selectedCategorySlug = context.query.category;
  const selectedTagSlugs = Array.isArray(context.query.tag)
    ? context.query.tag
    : [context.query.tag];
  const selectedCategory =
    selectedCategorySlug &&
    metaQueryResult.data.allClubCategories.find(
      (category) => category.slug === selectedCategorySlug
    );
  const selectedTags = metaQueryResult.data.allClubTags.filter((tag) =>
    selectedTagSlugs.some((slug) => slug === tag.slug)
  );

  if (
    selectedCategorySlug &&
    !selectedCategory &&
    selectedTags.every((tag) =>
      selectedTagSlugs.some((slug) => tag.slug === slug)
    )
  )
    return { notFound: true } as never;
  const nameFilter: ClubModelFilter = context.query.q
    ? { name: { matches: { pattern: context.query.q || "" } } }
    : {};
  const categoryFilter: ClubModelFilter = selectedCategory
    ? { category: { eq: selectedCategory.id } }
    : {};
  const tagFilter: ClubModelFilter = selectedTags.length
    ? { tags: { allIn: selectedTags.map((tag) => tag.id) } }
    : {};
  const variables: ClubIndexQueryVariables = {
    filter: { ...nameFilter, ...categoryFilter, ...tagFilter },
    randomClubIndex: Math.floor(
      Math.random() * metaQueryResult.data._allClubsMeta.count
    ),
  };
  const queryResult = await apolloClient.query<
    ClubIndexQuery,
    ClubIndexQueryVariables
  >({
    query: gql`
      query ClubIndexQuery(
        $filter: ClubModelFilter
        $randomClubIndex: IntType!
      ) {
        randomClub: allClubs(skip: $randomClubIndex) {
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
        foundClubs: allClubs(filter: $filter) {
          id
          name
          images {
            url(imgixParams: { maxW: 300 })
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
      }
    `,
    variables,
  });
  const randomClub = queryResult.data.randomClub[0];
  if (!randomClub) throw new Error("No clubs found.");
  return {
    props: {
      foundClubs: queryResult.data.foundClubs,
      randomClub,
      clubCategoryGroups: metaQueryResult.data.allClubCategoryGroups,
      clubCategories: metaQueryResult.data.allClubCategories,
      clubTags: metaQueryResult.data.allClubTags,
      clubTagCategories: metaQueryResult.data.allClubTagCategories,
      selectedTags,
    },
  };
}
