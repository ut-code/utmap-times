import { gql } from "@apollo/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import {
  GetClubBySlugQuery,
  GetClubBySlugQueryVariables,
} from "../../__generated__/GetClubBySlugQuery";
import { GetClubPathsQuery } from "../../__generated__/GetClubPathsQuery";

export default function ClubsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.club.name}>
      <Hero image="https://picsum.photos/800/600" className="p-40">
        <h1 className="text-3xl">{props.club.name}</h1>
      </Hero>
    </Layout>
  );
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params?.slug;
  if (!slug) return { notFound: true } as never;

  const queryResult = await apolloClient.query<
    GetClubBySlugQuery,
    GetClubBySlugQueryVariables
  >({
    query: gql`
      query GetClubBySlugQuery($slug: String!) {
        club(filter: { slug: { eq: $slug } }) {
          name
          category {
            id
            name
            slug
          }
          tags {
            id
            name
            slug
          }
          image {
            url
          }
        }
      }
    `,
    variables: { slug },
  });

  const { club } = queryResult.data;
  if (!club) return { notFound: true } as never;
  return { props: { club } };
}

export async function getStaticPaths() {
  const queryResult = await apolloClient.query<GetClubPathsQuery>({
    query: gql`
      query GetClubPathsQuery {
        allClubs {
          slug
        }
      }
    `,
  });
  return {
    paths: queryResult.data.allClubs.map((club) => ({
      params: { slug: club.slug },
    })),
    fallback: false,
  };
}
