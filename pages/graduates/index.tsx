import { gql } from "@apollo/client";
import clsx from "clsx";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import * as s from "superstruct";
import Banners from "../../components/Banners";
import HighlightedArticleLink from "../../components/HighlightedArticleLink";
import IndexHeroContent from "../../components/IndexHeroContent";
import Layout from "../../components/Layout";
import Paginator from "../../components/Paginator";
import apolloClient from "../../utils/apollo";
import { responsiveImageFragment } from "../../utils/datocms";
import { GraduateArticleModelFilter } from "../../__generated__/globalTypes";
import { GraduateArticleIndexMetaQuery } from "../../__generated__/GraduateArticleIndexMetaQuery";
import {
  GraduateArticleIndexQuery,
  GraduateArticleIndexQueryVariables,
} from "../../__generated__/GraduateArticleIndexQuery";
import SectionHeader from "../../components/SectionHeader";
import { SearchGrid, SearchGridItem } from "../../components/SearchGrid";
import ArticleLink from "../../components/ArticleLink";
import ResponsiveImageWithFallback from "../../components/ResponsiveImageWithFallback";

const ARTICLES_PER_PAGE = 12;

const queryType = s.type({
  q: s.optional(s.string()),
  category: s.optional(s.string()),
  tag: s.optional(s.union([s.string(), s.array(s.string())])),
  page: s.optional(s.string()),
});
export type Query = s.Infer<typeof queryType>;

export default function GraduatArticleIndexPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const query = router.query as s.Infer<typeof queryType>;
  const [search, setSearch] = useState(query.q ?? "");
  const selectedCategory =
    props.graduateArticleCategories.find(
      (category) => category.slug === query.category
    ) ?? null;

  return (
    <Layout title="卒業生">
      <IndexHeroContent
        imageUrl="/images/top-careers.jpg"
        title="Career"
        subtitle="就職 / キャリア選択のサポート"
      />
      <Banners />
      <section className="container mx-auto py-24 lg:py-32">
        <SectionHeader className="mb-12" title="PICKUP" subtitle="注目の記事" />
        <HighlightedArticleLink
          title={props.graduatePickUpArticle?.graduateArticle?.title ?? ""}
          aspectRatio={4 / 3}
          responsiveImage={
            props.graduatePickUpArticle?.graduateArticle?.image?.responsiveImage
          }
          category={
            props.graduatePickUpArticle?.graduateArticle?.category?.name ?? ""
          }
          url={`/graduates/${props.graduatePickUpArticle?.graduateArticle?.slug}`}
        />
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
                className="w-16 text-center bg-primary-400 text-white"
              >
                <AiOutlineSearch className="inline text-xl" />
              </button>
            </div>
          </form>
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2">
            <div className="md:pr-8 md:border-r md:border-gray-500">
              <h3 className="text-2xl mb-6">カテゴリで検索</h3>
              <ul className="border-t border-gray-200">
                {props.graduateArticleCategories.map((category, i) => {
                  const newQuery: Query = {
                    category:
                      selectedCategory?.id === category.id
                        ? undefined
                        : category.slug ?? undefined,
                  };
                  return (
                    <li key={category.id}>
                      <Link
                        href={{
                          query: { ...query, ...newQuery },
                        }}
                        scroll={false}
                      >
                        <a
                          className={clsx(
                            "block py-4 px-6",
                            i > 0 && "border-t",
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
            </div>
            <div className="md:pl-8">
              <h3 className="text-2xl">タグで検索</h3>
              {props.graduateArticleTagCategories.map((tagCategory) => (
                <div key={tagCategory.id} className="my-4">
                  <header className="flex items-center mb-2">
                    <h4 className="text-lg mr-2">{tagCategory.name}</h4>
                    <div
                      aria-hidden
                      className="flex-grow border-b border-gray-400"
                    />
                  </header>
                  <ul>
                    {props.graduateArticleTags
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
        <p className="px-8">
          {props.graduateArticleCount
            ? `${props.graduateArticleCount}件の記事が見つかりました。`
            : `記事が見つかりませんでした。キーワードを変えてお試しください。`}
        </p>
        <SearchGrid>
          {props.graduateArticles.map((article) => (
            <SearchGridItem key={article.id}>
              <ArticleLink
                title={article.title ?? ""}
                category={article.category?.name ?? undefined}
                url={`/graduates/${article.slug}`}
                media={
                  <ResponsiveImageWithFallback
                    data={article.image?.responsiveImage}
                    aspectRatio={4 / 3}
                  />
                }
                tags={article.tags.map((tag) => ({
                  id: tag.id,
                  name: tag.name ?? "",
                }))}
                className="h-full"
              />
            </SearchGridItem>
          ))}
        </SearchGrid>
        <Paginator
          className="py-4"
          pageCount={Math.ceil(props.graduateArticleCount / ARTICLES_PER_PAGE)}
          currentPage={(query.page && parseInt(query.page, 10)) || 0}
          getLink={(page) => {
            const newQuery: Query = {
              ...query,
              page: page.toString(),
            };
            return { query: newQuery };
          }}
        />
      </section>
      <section className="bg-gray-100">
        <div className="container mx-auto py-20 xl:px-24">
          <SectionHeader
            className="mb-12"
            title="RANKING"
            subtitle="ランキング"
          />
          <div className="lg:grid lg:grid-cols-2 items-start">
            <div key={props.topRatedGraduateArticles[0].graduateArticle?.id}>
              <Link
                href={`/graduates/${props.topRatedGraduateArticles[0].graduateArticle?.slug}`}
              >
                <a className="block w-full h-full p-8 cursor-pointer hover:bg-gray-200">
                  <div className="relative mb-8">
                    <div>
                      <ResponsiveImageWithFallback
                        data={
                          props.topRatedGraduateArticles[0].graduateArticle
                            ?.image?.responsiveImage
                        }
                        aspectRatio={4 / 3}
                      />
                    </div>
                    <p className="absolute top-0 left-0 w-16 h-16 flex justify-center items-center bg-primary-400 text-white font-sans font-bold">
                      1
                    </p>
                    <div className="absolute -bottom-4 py-2 px-6 bg-secondary-main text-white">
                      {
                        props.topRatedGraduateArticles[0].graduateArticle
                          ?.category?.name
                      }
                    </div>
                  </div>
                  <p className="pb-4 text-sm">
                    {props.topRatedGraduateArticles[0].graduateArticle?.date.replace(
                      /-/g,
                      "/"
                    )}
                  </p>
                  <p className="pb-4 text-2xl">
                    {props.topRatedGraduateArticles[0].graduateArticle?.title}
                  </p>
                  <ul>
                    {props.topRatedGraduateArticles[0].graduateArticle?.tags.map(
                      (tag) => (
                        <li
                          key={tag.id}
                          className="inline-block mr-2 my-2 p-1 border bg-white"
                        >{`#${tag.name}`}</li>
                      )
                    )}
                  </ul>
                </a>
              </Link>
            </div>
            <div>
              <ul>
                {props.topRatedGraduateArticles.slice(1).map((rated, index) => (
                  <li key={rated.graduateArticle?.id}>
                    <Link href={`graduates/${rated.graduateArticle?.slug}`}>
                      <a className="flex p-8 cursor-pointer hover:bg-gray-200 relative">
                        <div className="w-32 h-full inline-block mr-6 flex-shrink-0">
                          <ResponsiveImageWithFallback
                            data={rated.graduateArticle?.image?.responsiveImage}
                            aspectRatio={4 / 3}
                          />
                        </div>
                        <p className="absolute w-8 h-8 flex justify-center items-center bg-primary-400 text-sm text-white font-sans">
                          {index + 2}
                        </p>
                        <div className="flex-grow">
                          <div className="flex items-center pb-4">
                            <p className="pr-4 text-sm">
                              {rated.graduateArticle?.date.replace(/-/g, "/")}
                            </p>
                            <p className="bg-secondary-main py-1 px-2 text-white text-sm">
                              {rated.graduateArticle?.category?.name}
                            </p>
                          </div>
                          <div>{rated.graduateArticle?.title}</div>
                          <ul>
                            {rated.graduateArticle?.tags.map((tag) => (
                              <li
                                key={tag.id}
                                className="inline-block mr-2 mt-2 p-1 border bg-white text-xs"
                              >
                                {`#${tag.name}`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!s.is(context.query, queryType)) return { notFound: true } as never;
  const metaQueryResult =
    await apolloClient.query<GraduateArticleIndexMetaQuery>({
      query: gql`
        ${responsiveImageFragment}
        query GraduateArticleIndexMetaQuery {
          graduatePickUpArticle {
            graduateArticle {
              id
              slug
              title
              date
              image {
                id
                responsiveImage(
                  imgixParams: { ar: "4:3", fit: crop, w: 1000 }
                ) {
                  ...ResponsiveImageFragment
                }
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
          allGraduateArticleCategories {
            id
            name
            slug
          }
          allGraduateArticleTags {
            id
            name
            slug
            category {
              id
            }
          }
          allGraduateArticleTagCategories {
            id
            name
          }
          _allGraduateArticlesMeta {
            count
          }
          allTopRatedGraduateArticles {
            graduateArticle {
              id
              slug
              title
              date
              image {
                id
                largeResponsiveImage: responsiveImage(
                  imgixParams: { ar: "4:3", fit: crop, w: 1000 }
                ) {
                  ...ResponsiveImageFragment
                }
                responsiveImage(imgixParams: { ar: "4:3", fit: crop, w: 300 }) {
                  ...ResponsiveImageFragment
                }
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
        }
      `,
    });
  const selectedCategorySlug = context.query.category;
  const selectedTagSlugs = Array.isArray(context.query.tag)
    ? context.query.tag
    : [context.query.tag];
  const selectedCategory =
    selectedCategorySlug &&
    metaQueryResult.data.allGraduateArticleCategories.find(
      (category) => category.slug === selectedCategorySlug
    );
  const selectedTags = metaQueryResult.data.allGraduateArticleTags.filter(
    (tag) => selectedTagSlugs.some((slug) => slug === tag.slug)
  );

  if (
    selectedCategorySlug &&
    !selectedCategory &&
    selectedTags.every((tag) =>
      selectedTagSlugs.some((slug) => tag.slug === slug)
    )
  )
    return { notFound: true } as never;
  const nameFilter: GraduateArticleModelFilter = context.query.q
    ? { title: { matches: { pattern: context.query.q || "" } } }
    : {};
  const categoryFilter: GraduateArticleModelFilter = selectedCategory
    ? { category: { eq: selectedCategory.id } }
    : {};
  const tagFilter: GraduateArticleModelFilter = selectedTags.length
    ? { tags: { allIn: selectedTags.map((tag) => tag.id) } }
    : {};
  const variables: GraduateArticleIndexQueryVariables = {
    filter: { ...nameFilter, ...categoryFilter, ...tagFilter },
    first: ARTICLES_PER_PAGE,
    skip:
      (context.query.page &&
        parseInt(context.query.page, 10) * ARTICLES_PER_PAGE) ||
      0,
  };
  const queryResult = await apolloClient.query<
    GraduateArticleIndexQuery,
    GraduateArticleIndexQueryVariables
  >({
    query: gql`
      ${responsiveImageFragment}
      query GraduateArticleIndexQuery(
        $filter: GraduateArticleModelFilter
        $first: IntType!
        $skip: IntType!
      ) {
        _allGraduateArticlesMeta(filter: $filter) {
          count
        }
        graduatePickUpArticle {
          graduateArticle {
            id
            slug
            title
            date
            image {
              id
              responsiveImage(imgixParams: { ar: "4:3", fit: crop, w: 1000 }) {
                ...ResponsiveImageFragment
              }
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
        allGraduateArticles(filter: $filter, first: $first, skip: $skip) {
          id
          slug
          title
          date
          image {
            id
            responsiveImage(imgixParams: { ar: "4:3", fit: crop, w: 300 }) {
              ...ResponsiveImageFragment
            }
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
      graduateArticleCount: queryResult.data._allGraduateArticlesMeta.count,
      graduateArticles: queryResult.data.allGraduateArticles,
      graduatePickUpArticle: queryResult.data.graduatePickUpArticle,
      graduateArticleCategories:
        metaQueryResult.data.allGraduateArticleCategories,
      graduateArticleTags: metaQueryResult.data.allGraduateArticleTags,
      graduateArticleTagCategories:
        metaQueryResult.data.allGraduateArticleTagCategories,
      selectedTags,
      topRatedGraduateArticles:
        metaQueryResult.data.allTopRatedGraduateArticles,
    },
  };
}
