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
      <div>{props.club.category?.name}</div>
      <div>{props.club.name}</div>
      <h1>基本情報</h1>
      <div>団体名{props.club.name}</div>
      <div>普段の活動予定{props.club.usualActivity}</div>
      <div>月ごとの特別な活動予定{props.club.eventSchedule}</div>
      <div>新歓日程{props.club.welcomeEvent}</div>
      <div>入会選考の有無{props.club.requiresExamination}</div>
      <div>代表者{props.club.leader}</div>
      <div>設立年{props.club.establishedYear}</div>
      <div>男女比{props.club.genderRatio}</div>
      <div>大学{props.club.membersUniversityComposition}</div>
      <div>東大生の割合{props.club.utStudentRatio}</div>
      <div>初年度費用{props.club.participationCost}</div>
      <div>年会費{props.club.annualCost}</div>
      <div>連絡先{props.club.contact}</div>
      <div>備考{props.club.remarks}</div>
      <div>line{props.club.line}</div>
      <div>twitter{props.club.twitter}</div>
      <div>instagram{props.club.instagram}</div>
      <div>facebook{props.club.facebook}</div>
      <div>website{props.club.website}</div>
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
          leader
          establishedYear
          description
          place
          schedule
          usualActivity
          eventSchedule
          welcomeEvent
          genderRatio
          membersUniversityComposition
          numberOfMembers
          utStudentRatio
          requiresExamination
          participationCost
          annualCost
          contact
          remarks
          line
          twitter
          instagram
          facebook
          website
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
          activityWithCorona
          qA {
            id
          }
          image {
            url
          }
          description
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
