import { gql } from "@apollo/client";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import ArticleContentStructuredTextRenderer from "../../components/ArticleContentStructuredTextRenderer";
import { articleContentStructuredTextArticleGalleryFragment } from "../../components/ArticleContentStructuredTextRenderer/ArticleGallery";
import { articleContentStructuredTextEmbeddedVideoFragment } from "../../components/ArticleContentStructuredTextRenderer/EmbeddedVideo";
import { articleContentPersonAndStatementFragment } from "../../components/ArticleContentStructuredTextRenderer/PersonAndStatement";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import Layout, { layoutSeoFragment } from "../../components/Layout";
import SnsShareLinks from "../../components/SnsShareLinks";
import apolloClient from "../../utils/apollo";
import {
  GetCompanyBySlugQuery,
  GetCompanyBySlugQueryVariables,
} from "../../__generated__/GetCompanyBySlugQuery";

export default function CompanyPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.company.name}>
      <Hero image={props.company.image?.url ?? "/images/utmap.png"}>
        <div className="container mx-auto px-8 md:px-24 py-48">
          <h1 className="text-3xl">{props.company.name}</h1>
        </div>
      </Hero>
      <Banners />
      <div className="container mx-auto px-8 md:px-24">
        <img
          className="w-24 h-24 lg:w-48 lg:h-48 xl:w-64 xl:h-64 mt-20 float-right object-cover"
          alt={props.company.logo?.alt ?? ""}
          src={props.company.logo?.url}
        />
        <h1 className="pt-24 pb-16 text-3xl font-bold">{props.company.name}</h1>
        <SnsShareLinks />
        <ArticleContentStructuredTextRenderer
          structuredText={props.company.description}
        />
        <SnsShareLinks />
      </div>
    </Layout>
  );
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params?.slug;
  if (!slug) return { notFound: true } as never;

  const queryResult = await apolloClient.query<
    GetCompanyBySlugQuery,
    GetCompanyBySlugQueryVariables
  >({
    query: gql`
      ${layoutSeoFragment}
      ${articleContentStructuredTextArticleGalleryFragment}
      ${articleContentStructuredTextEmbeddedVideoFragment}
      ${articleContentPersonAndStatementFragment}
      query GetCompanyBySlugQuery($slug: String!) {
        company(filter: { slug: { eq: $slug } }) {
          id
          name
          image {
            url(imgixParams: { maxW: 600 })
          }
          logo {
            id
            alt
            url(imgixParams: { maxW: 400 })
          }
          leader
          location
          industry {
            id
            name
          }
          seo {
            ...LayoutSeoFragment
          }
          description {
            blocks {
              ... on ArticleGalleryRecord {
                ...ArticleContentStructuredTextArticleGalleryFragment
              }
              ... on EmbeddedVideoRecord {
                ...ArticleContentStructuredTextEmbeddedVideoFragment
              }
              ... on PersonAndStatementRecord {
                ...ArticleContentPersonAndStatementFragment
              }
            }
            value
          }
        }
      }
    `,
    variables: { slug },
  });

  const { company } = queryResult.data;
  if (!company) return { notFound: true } as never;
  return { props: { company }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
