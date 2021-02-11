import { gql } from "@apollo/client";
import clsx from "clsx";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import * as s from "superstruct";
import Hero from "../../components/Hero";
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

  return (
    <Layout title="サークル">
      <Hero image="https://picsum.photos/800/600">
        <h1 className="text-4xl p-32">サークル</h1>
      </Hero>
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
                className="w-16 text-center bg-blue-800 text-white"
              >
                <AiOutlineSearch className="inline text-xl" />
              </button>
            </div>
          </form>
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2">
            <div className="md:pr-8 md:border-r md:border-gray-500">
              <h3 className="text-2xl mb-6">カテゴリで検索</h3>
              <ul className="space-y-2">
                {props.clubCategories.map((category) => {
                  const isSelected = query.category === category.slug;
                  const newQuery: Query = {
                    category: isSelected
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
                            "flex items-center py-4 px-6",
                            query.category === category.slug
                              ? "bg-yellow-300"
                              : "bg-white"
                          )}
                        >
                          <p className="flex-grow">{category.name}</p>
                          <AiOutlineDown />
                        </a>
                      </Link>
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
        {!props.clubs.length && (
          <p>
            サークルが見つかりませんでした。キーワードを変えてお試しください。
          </p>
        )}
        <ul className="md:grid md:grid-cols-2 xl:grid-cols-3">
          {props.clubs.map((club) => (
            <li key={club.id}>
              <Link href={`/clubs/${club.slug}`}>
                <a className="block w-full h-full p-8 cursor-pointer hover:bg-gray-100">
                  <div className="relative mb-8">
                    <img
                      src={club.image[0]?.url}
                      alt={club.name ?? ""}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute -bottom-4 bg-yellow-700 py-2 px-6 text-white">
                      {club.category?.name}
                    </div>
                  </div>
                  <p className="text-2xl">{club.name}</p>
                  <ul>
                    {club.tags.map((tag) => (
                      <li
                        key={tag.id}
                        className="inline-block mr-2 my-2 p-1 border bg-gray-200 text-sm"
                      >
                        {`#${tag.name}`}
                      </li>
                    ))}
                  </ul>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!s.is(context.query, queryType)) return { notFound: true } as never;
  const metaQueryResult = await apolloClient.query<ClubIndexMetaQuery>({
    query: gql`
      query ClubIndexMetaQuery {
        allClubCategories {
          id
          name
          slug
        }
        allClubTags {
          id
          name
          slug
          category {
            id
          }
        }
        allClubTagCategories {
          id
          name
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
  };
  const queryResult = await apolloClient.query<
    ClubIndexQuery,
    ClubIndexQueryVariables
  >({
    query: gql`
      query ClubIndexQuery($filter: ClubModelFilter) {
        allClubs(filter: $filter) {
          id
          slug
          name
          image {
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
  return {
    props: {
      clubs: queryResult.data.allClubs,
      clubCategories: metaQueryResult.data.allClubCategories,
      clubTags: metaQueryResult.data.allClubTags,
      clubTagCategories: metaQueryResult.data.allClubTagCategories,
      selectedTags,
    },
  };
}
