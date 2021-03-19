import { gql } from "@apollo/client";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import RichTextRenderer from "../../components/RichTextRenderer";
import SnsShareLinks from "../../components/SnsShareLinks";
import apolloClient from "../../utils/apollo";
import {
  GetStaticPageBySlugQuery,
  GetStaticPageBySlugQueryVariables,
} from "../../__generated__/GetStaticPageBySlugQuery";

export default function StaticPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.staticPage.title}>
      <Hero image="/images/graduates-article.jpg">
        <h1 className="container mx-auto px-8 md:px-24 py-40 text-3xl">
          {props.staticPage.title}
        </h1>
      </Hero>
      <div className="w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto px-8 md:px-24">
        <h2 className="pt-24 pb-16 text-3xl font-bold border-b-2">
          {props.staticPage.title}
        </h2>
        <SnsShareLinks />
        <RichTextRenderer
          markdown={props.staticPage.content ?? ""}
          className="pt-8 pb-20 border-b-2"
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
    GetStaticPageBySlugQuery,
    GetStaticPageBySlugQueryVariables
  >({
    query: gql`
      query GetStaticPageBySlugQuery($slug: String!) {
        staticPage(filter: { slug: { eq: $slug } }) {
          title
          date
          slug
          image {
            url
          }
          content
        }
      }
    `,
    variables: { slug },
  });

  const { staticPage } = queryResult.data;
  if (!staticPage) return { notFound: true } as never;
  return { props: { staticPage }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
