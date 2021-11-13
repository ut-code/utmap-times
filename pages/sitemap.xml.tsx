import { gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import xmlbuilder from "xmlbuilder";
import apolloClient from "../utils/apollo";
import {
  SitemapQuery,
  SitemapQueryVariables,
} from "../__generated__/SitemapQuery";

function Sitemap() {
  return <></>;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  res.setHeader("Content-Type", "text/xml");

  const urls: string[] = [];
  let page = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const result = await apolloClient.query<
      SitemapQuery,
      SitemapQueryVariables
    >({
      query: gql`
        query SitemapQuery($skip: IntType!) {
          allCareerStrategyArticles(skip: $skip, first: 100) {
            slug
          }
          allClubs(skip: $skip, first: 100) {
            id
          }
          allCompanies(skip: $skip, first: 100) {
            slug
          }
          allEvents(skip: $skip, first: 100) {
            slug
          }
          allGraduateArticles(skip: $skip, first: 100) {
            slug
          }
          allInternships(skip: $skip, first: 100) {
            slug
          }
          allNewsArticles(skip: $skip, first: 100) {
            slug
          }
        }
      `,
      variables: { skip: 100 * page },
    });
    result.data.allCareerStrategyArticles.forEach(({ slug }) => {
      urls.push(`/career-strategies/${slug}`);
    });
    result.data.allClubs.forEach(({ id }) => {
      urls.push(`/clubs/${id}`);
    });
    result.data.allCompanies.forEach(({ slug }) => {
      urls.push(`/companies/${slug}`);
    });
    result.data.allEvents.forEach(({ slug }) => {
      urls.push(`/events/${slug}`);
    });
    result.data.allGraduateArticles.forEach(({ slug }) => {
      urls.push(`/graduates/${slug}`);
    });
    result.data.allInternships.forEach(({ slug }) => {
      urls.push(`/internships/${slug}`);
    });
    result.data.allNewsArticles.forEach(({ slug }) => {
      urls.push(`/news/${slug}`);
    });
    if (
      !result.data.allCareerStrategyArticles.length &&
      !result.data.allClubs.length &&
      !result.data.allCompanies.length &&
      !result.data.allEvents.length &&
      !result.data.allGraduateArticles.length &&
      !result.data.allInternships.length &&
      !result.data.allNewsArticles.length
    ) {
      break;
    }
    page += 1;
  }

  const urlset = xmlbuilder.create("urlset");
  urlset.attribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
  urls.sort().forEach((url) => {
    urlset.element("url").element("loc").text(`https://utmap.jp${url}`);
  });
  res.write(urlset.end());
  res.end();
  return { props: {} };
}

export default Sitemap;
