import { gql } from "@apollo/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import * as s from "superstruct";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Layout from "../components/Layout";
import apolloClient from "../utils/apollo";
import { responsiveImageFragment } from "../utils/datocms";
import {
  SearchQuery,
  SearchQueryVariables,
} from "../__generated__/SearchQuery";
import ArticleContentContainer from "../components/ArticleContentContainer";
import SectionHeader from "../components/SectionHeader";
import { H1 } from "../components/Heading";
import ArticleLink from "../components/ArticleLink";
import { SearchGrid, SearchGridItem } from "../components/SearchGrid";
import SearchResultContainer from "../components/SearchResultContainer";
import ResponsiveImageWithFallback from "../components/ResponsiveImageWithFallback";

const queryType = s.type({
  q: s.optional(s.string()),
});
type Query = s.Infer<typeof queryType>;

export default function SearchPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const query = router.query as Query;
  const [searchText, setSearchText] = useState(query.q ?? "");

  const resultSections = props.data && [
    {
      title: "サークル",
      count: props.data._allClubsMeta.count,
      results: props.data.allClubs.map((club) => ({
        id: club.id,
        title: club.name,
        url: `/clubs/${club.id}`,
        image: club.images[0],
        category: club.category?.name,
      })),
    },
    {
      title: "卒業生インタビュー",
      count: props.data._allGraduateArticlesMeta.count,
      results: props.data.allGraduateArticles.map((article) => ({
        id: article.id,
        title: article.title,
        url: `/graduates/${article.slug}`,
        image: article.image,
        category: article.category?.name,
      })),
    },
    {
      title: "インターンシップ",
      count: props.data._allInternshipsMeta.count,
      results: props.data.allInternships.map((internship) => ({
        id: internship.id,
        title: internship.title,
        url: `/internships/${internship.slug}`,
        image: internship.thumbnailImage,
        category: internship.isRecruiting ? "募集中" : "募集終了",
      })),
    },
    {
      title: "イベント",
      count: props.data._allEventsMeta.count,
      results: props.data.allEvents.map((event) => ({
        id: event.id,
        title: event.title,
        url: `/events/${event.slug}`,
        image: event.thumbnailImage,
        category: event.isRecruiting ? "募集中" : "募集終了",
      })),
    },
  ];

  return (
    <Layout title={query.q ? `${query.q} の検索結果` : "検索"}>
      <ArticleContentContainer className={query.q ? "py-16" : "py-48"}>
        <SectionHeader className="mb-8" title="Search" subtitle="検索" />
        <form
          onSubmit={(e) => {
            const newQuery: Query = {
              ...query,
              q: searchText,
            };
            router.push({ query: newQuery });
            e.preventDefault();
          }}
          className="flex"
        >
          <input
            className="w-full p-2 border border-gray-300 appearance-none rounded-none outline-none"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
          />
          <button
            type="submit"
            className="flex justify-center items-center w-16 h-16 bg-primary-main hover:bg-primary-300"
          >
            <AiOutlineSearch className="text-white text-xl" />
          </button>
        </form>
      </ArticleContentContainer>
      {resultSections && (
        <SearchResultContainer>
          {resultSections.map((section) => (
            <div className="mb-16" key={section.title}>
              <H1 className="mb-6">{section.title}</H1>
              {section.results.length > 0 ? (
                <>
                  <p className="mb-2">
                    {[
                      "全",
                      section.count,
                      "件中",
                      section.results.length,
                      "件を表示しています。",
                    ].join(" ")}
                  </p>
                  <SearchGrid>
                    {section.results.map((result) => (
                      <SearchGridItem key={result.id}>
                        <ArticleLink
                          key={result.id}
                          title={result.title ?? ""}
                          category={result.category ?? ""}
                          isFramed
                          url={result.url}
                          media={
                            <ResponsiveImageWithFallback
                              data={result.image?.responsiveImage}
                              aspectRatio={4 / 3}
                            />
                          }
                        />
                      </SearchGridItem>
                    ))}
                  </SearchGrid>
                </>
              ) : (
                <p>結果が見つかりませんでした。</p>
              )}
            </div>
          ))}
        </SearchResultContainer>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!s.is(context.query, queryType)) return { notFound: true } as never;

  if (!context.query.q) return { props: { data: null } };

  const queryResult = await apolloClient.query<
    SearchQuery,
    SearchQueryVariables
  >({
    variables: { q: context.query.q },
    query: gql`
      ${responsiveImageFragment}
      fragment SearchPageThumbnailImageFragment on FileField {
        id
        responsiveImage(imgixParams: { w: 320, h: 240, fit: crop }) {
          ...ResponsiveImageFragment
        }
      }
      query SearchQuery($q: String!) {
        _allClubsMeta(
          filter: {
            OR: [
              { name: { matches: { pattern: $q } } }
              { description: { matches: { pattern: $q } } }
            ]
          }
        ) {
          count
        }
        allClubs(
          filter: {
            OR: [
              { name: { matches: { pattern: $q } } }
              { description: { matches: { pattern: $q } } }
            ]
          }
          first: 12
        ) {
          id
          images {
            ...SearchPageThumbnailImageFragment
          }
          name
          category {
            name
          }
        }
        _allGraduateArticlesMeta(
          filter: {
            OR: [
              { title: { matches: { pattern: $q } } }
              { content: { matches: { pattern: $q } } }
              { structuredContent: { matches: { pattern: $q } } }
            ]
          }
        ) {
          count
        }
        allGraduateArticles(
          filter: {
            OR: [
              { title: { matches: { pattern: $q } } }
              { content: { matches: { pattern: $q } } }
              { structuredContent: { matches: { pattern: $q } } }
            ]
          }
          first: 12
        ) {
          id
          title
          image {
            ...SearchPageThumbnailImageFragment
          }
          slug
          category {
            name
          }
        }
        _allInternshipsMeta(
          filter: {
            OR: [
              { title: { matches: { pattern: $q } } }
              { description: { matches: { pattern: $q } } }
            ]
          }
        ) {
          count
        }
        allInternships(
          filter: {
            OR: [
              { title: { matches: { pattern: $q } } }
              { description: { matches: { pattern: $q } } }
            ]
          }
          first: 12
        ) {
          id
          title
          thumbnailImage {
            ...SearchPageThumbnailImageFragment
          }
          slug
          isRecruiting
        }
        _allEventsMeta(
          filter: {
            OR: [
              { title: { matches: { pattern: $q } } }
              { description: { matches: { pattern: $q } } }
            ]
          }
        ) {
          count
        }
        allEvents(
          filter: {
            OR: [
              { title: { matches: { pattern: $q } } }
              { description: { matches: { pattern: $q } } }
            ]
          }
          first: 12
        ) {
          id
          title
          thumbnailImage {
            ...SearchPageThumbnailImageFragment
          }
          slug
          isRecruiting
        }
      }
    `,
  });
  return { props: { data: queryResult.data } };
}
