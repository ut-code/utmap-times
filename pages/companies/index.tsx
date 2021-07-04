import { gql, useQuery } from "@apollo/client";
import clsx from "clsx";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import * as s from "superstruct";
import Link from "next/link";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import { CompanyIndexMetaQuery } from "../../__generated__/CompanyIndexMetaQuery";
import {
  CompanySearchQuery,
  CompanySearchQueryVariables,
} from "../../__generated__/CompanySearchQuery";
import { CompanyModelFilter } from "../../__generated__/globalTypes";
import AritcleLinkCompany from "../../components/ArticleLinkCompany";

const queryOrderByType = s.union([
  s.literal("createdAt"),
  s.literal("startsAt"),
  s.literal("applicationDeadline"),
]);
const queryType = s.type({
  q: s.optional(s.string()),
  industry: s.optional(s.string()),
  orderBy: s.optional(queryOrderByType),
  page: s.optional(s.string()),
});
export type Query = s.Infer<typeof queryType>;

const companySearchFragment = gql`
  fragment CompanySearchFragment on CompanyRecord {
    id
    slug
    name
    image {
      id
      url
    }
    logo {
      url
    }
    industry {
      id
      slug
      name
    }
  }
`;

export default function CompanyIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const query = router.query as s.Infer<typeof queryType>;
  const ARTICLES_PER_PAGE = 9;

  const selectedIndustrySlug = query.industry;
  const selectedIndustry =
    props.companyIndustries.find(
      (industry) => industry.slug === selectedIndustrySlug
    ) ?? null;

  const nameFilter: CompanyModelFilter = query.q
    ? { name: { matches: { pattern: query.q || "" } } }
    : {};
  const industryFilter: CompanyModelFilter = selectedIndustry
    ? { industry: { eq: selectedIndustry.id } }
    : {};

  const selectedPage = query.page ? parseInt(query.page, 10) : 0;
  const searchQuery = useQuery<CompanySearchQuery, CompanySearchQueryVariables>(
    gql`
      ${companySearchFragment}
      query CompanySearchQuery(
        $filter: CompanyModelFilter
        $orderBy: [CompanyModelOrderBy]
        $first: IntType
        $skip: IntType
      ) {
        allCompanies(
          filter: $filter
          orderBy: $orderBy
          first: $first
          skip: $skip
        ) {
          ...CompanySearchFragment
        }
        _allCompaniesMeta(filter: $filter) {
          count
        }
      }
    `,
    {
      variables: {
        filter: {
          ...nameFilter,
          ...industryFilter,
        },
        first: ARTICLES_PER_PAGE,
        skip: ARTICLES_PER_PAGE * selectedPage ?? 0,
      },
      ssr: false,
    }
  );

  const searchQueryData = searchQuery.data;

  const totalPages =
    searchQueryData &&
    searchQueryData._allCompaniesMeta.count > ARTICLES_PER_PAGE
      ? Math.floor(
          searchQueryData._allCompaniesMeta.count / ARTICLES_PER_PAGE
        ) + 1
      : undefined;
  const pageIndex = totalPages && [...Array(totalPages)].map((_, i) => i);
  return (
    <Layout title="企業分析">
      <Hero image="/images/article.jpg">
        <div className="pt-40 pb-24 px-20 md:px-56 md:pt-56 md:pb-32">
          <h1 className="text-6xl">企業分析</h1>
          <h2>Corporate Analysis</h2>
        </div>
      </Hero>
      <Banners />
      <section className="container mx-auto py-24">
        <header className="text-center">
          <p className="text-secondary-main">
            このページは企業分析です。ぜひ使ってね。このページは企業分析です。ぜひ使ってね。このページは企業分析です。ぜひ使ってね。このページは企業分析です。ぜひ使ってね。このページは企業分析です。ぜひ使ってね。このページは企業分析です。ぜひ使ってね。
          </p>
        </header>
      </section>
      <section className="bg-gray-200">
        <div className="container mx-auto py-16 px-8 md:px-24">
          <h3 className="pb-6 text-2xl text-white">カテゴリで絞り込み</h3>
          <ul className="md:grid md:grid-cols-3 xl:grid-cols-6">
            {props.companyIndustries.map((industry) => {
              const newQuery: Query = {
                industry:
                  selectedIndustry?.id === industry.id
                    ? undefined
                    : industry.slug ?? undefined,
              };
              return (
                <li key={industry.id}>
                  <Link
                    href={{ query: { ...query, ...newQuery } }}
                    scroll={false}
                  >
                    <a className="flex items-center">
                      <span
                        className={clsx(
                          "inline-block p-1 w-7 h-7 rounded-full bg-white",
                          query.industry === industry.slug
                            ? "border-white border-2 rounded-full bg-primary-400"
                            : "bg-white"
                        )}
                      />
                      <span className="inline p-2 text-white">
                        {industry.name}
                      </span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="container mx-auto my-12">
        {searchQueryData ? (
          <>
            {searchQueryData._allCompaniesMeta.count === 0 ? (
              <p className="px-8">
                企業が見つかりませんでした。キーワードを変えてお試しください。
              </p>
            ) : (
              <>
                <p className="px-8">{`${searchQueryData._allCompaniesMeta.count}件の企業が見つかりました。`}</p>
                <div className="py-12 text-center items-center">
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
                  {searchQueryData?.allCompanies.map((company) => (
                    <li key={company.id}>
                      <AritcleLinkCompany
                        name={company.name ?? ""}
                        url={`companies/${company.slug}`}
                        imageUrl={company.image?.url ?? "/images/utmap.png"}
                        LogoUrl={company?.logo?.url ?? "/images/utmap.png"}
                        industry={company?.industry?.name ?? ""}
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
  const metaQueryResult = await apolloClient.query<CompanyIndexMetaQuery>({
    query: gql`
      query CompanyIndexMetaQuery {
        allIndustries(first: 100) {
          id
          name
          slug
        }

        _allCompaniesMeta {
          count
        }
      }
    `,
  });
  return {
    props: {
      companyIndustries: metaQueryResult.data.allIndustries,

      totalCompanyCount: metaQueryResult.data._allCompaniesMeta.count,
    },
  };
}
