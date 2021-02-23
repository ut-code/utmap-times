import { gql } from "@apollo/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
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
      <Hero image="https://picsum.photos/800/600">
        <div className="container mx-auto px-8 md:px-24 py-48">
          <p className="inline-block bg-yellow-700 py-1 px-6 mb-6 text-white">
            {props.club.category?.name}
          </p>
          <h1 className="text-3xl">{props.club.name}</h1>
        </div>
      </Hero>
      <div className="container mx-auto px-8 md:px-24">
        <div className="pt-24 flex">
          <p className="bg-yellow-700 py-1 px-6 text-white">
            {props.club.category?.name}
          </p>
        </div>
        <h2 className="py-8 text-3xl font-bold">{props.club.name}</h2>
        <div className="pb-10 flex border-b-2">
          <p className="px-4 py-1 bg-gray-200"># {props.club.tags[0].name}</p>
        </div>
        <div className="pt-8 pb-12 flex">
          <button
            type="button"
            className="py-1 w-40 mr-2 bg-blue-400 hover:bg-blue-900"
          >
            <FaTwitter className="inline-block text-white" />
            <p className="inline-block pl-1 text-white">ツイート</p>
          </button>
          <button
            type="button"
            className="py-1 w-40 mr-2 bg-blue-600 hover:bg-blue-900"
          >
            <FaFacebookF className="inline-block text-white" />
            <p className="inline-block pl-1 text-white">シェア</p>
          </button>
          <button
            type="button"
            className="py-1 w-40 bg-blue-800 hover:bg-blue-900"
          >
            <p className="inline-block pl-1 text-white">リンクをコピー</p>
          </button>
        </div>
        <img src={props.club.image[0].url} alt="画像" />
        <div>ああ</div>
        <h1>基本情報</h1>
        <div>団体名{props.club.name}</div>
        <div>普段の活動予定{props.club.usualActivity}</div>
        <div>月ごとの特別な活動予定{props.club.eventSchedule}</div>
        <div>新歓日程{props.club.welcomeEvent}</div>
        <div>入会選考の有無{props.club.requiresExamination}</div>
        <h2>詳細情報</h2>
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
        <div className="pt-8 pb-32 flex">
          <button
            type="button"
            className="py-1 w-40 mr-2 bg-blue-400 hover:bg-blue-900"
          >
            <FaTwitter className="inline-block text-white" />
            <p className="inline-block pl-1 text-white">ツイート</p>
          </button>
          <button
            type="button"
            className="py-1 w-40 mr-2 bg-blue-600 hover:bg-blue-900"
          >
            <FaFacebookF className="inline-block text-white" />
            <p className="inline-block pl-1 text-white">シェア</p>
          </button>
          <button
            type="button"
            className="py-1 w-40 bg-blue-800 hover:bg-blue-900"
          >
            <p className="inline-block pl-1 text-white">リンクをコピー</p>
          </button>
        </div>
      </div>
      <div className="text-center h-96 py-12">
        <p className="text-4xl font-bold">RELATED</p>
        <p className="text-yellow-500">関連記事</p>
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
