import { gql } from "@apollo/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { FaTwitter, FaLine } from "react-icons/fa";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { IoMdPerson, IoMdPeople } from "react-icons/io";
import Hero from "../../components/Hero";
import RichTextRenderer from "../../components/RichTextRenderer";
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
          <p className="inline-block bg-secondary-main py-1 px-6 mb-6 text-white">
            {props.club.category?.name}
          </p>
          <h1 className="text-3xl">{props.club.name}</h1>
        </div>
      </Hero>
      <div className="container mx-auto px-8 md:px-24">
        <div className="pt-24 flex">
          <p className="bg-secondary-main py-1 px-6 text-white">
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
            <AiOutlineFacebook className="inline-block text-white" />
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
        <div className="pt-24">
          <h1 className="bg-gray-200 py-3 px-6">基本情報</h1>
        </div>
        <div>団体名</div>
        <h1 className="text-bold p-3 text-3xl">{props.club.name}</h1>
        <div className="container mx-auto px-1 md:px-24 bg-secondary-100">
          <div>説明</div>
          <RichTextRenderer html={props.club.description ?? ""} />
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">普段の活動予定</span>
          <span className="absolute pr-28">{props.club.usualActivity}</span>
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">月ごとの特別な予定</span>
          <span className="absolute pr-28">{props.club.eventSchedule}</span>
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">入会選考の有無</span>
          <span className="absolute pr-28">
            {props.club.requiresExamination}
          </span>
        </div>
        <div className="container mx-auto px-1 md:px-24 bg-secondary-main border-t-8 border-white text-white">
          <div>新歓日程</div>
        </div>
        <div className="container mx-auto px-1 md:px-24 bg-secondary-100 border-solid border-2 border-secondary-main">
          <div>{props.club.welcomeEvent}</div>
        </div>
        <div className="pt-24">
          <h1 className="bg-gray-200 py-3 px-6">詳細情報</h1>
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">代表者</span>
          <span className="relative pr-28">{props.club.leader}</span>
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">設立年</span>
          <span className="absolute pr-28">{props.club.establishedYear}</span>
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">男女比</span>
          <span className="absolute pr-28">{props.club.genderRatio}</span>
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">大学</span>
          <span className="absolute pr-28">
            {props.club.membersUniversityComposition}
          </span>
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">東大生の割合</span>
          <span className="relative pr-50">{props.club.utStudentRatio}</span>
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">入会費</span>
          <span className="absolute pr-28">{props.club.participationCost}</span>
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">年会費</span>
          <span className="absolute pr-28">{props.club.annualCost}</span>
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">連絡先</span>
          <span className="absolute pr-28">{props.club.contact}</span>
        </div>
        <div className="py-4 border-b-2">
          <span className="font-bold pr-5">備考</span>
          <span className="absolute pr-28">{props.club.remarks}</span>
        </div>
        <div className="pt-24">
          <h1 className="bg-gray-200 py-3 px-6">SNS</h1>
        </div>
        <div className="py-5 text-center">
          {props.club.line && (
            <button
              type="button"
              className="p-3 mr-2 bg-green-400 hover:bg-green-900 rounded-full"
            >
              <FaLine className="w-16 h-16 inline-block text-white" />
            </button>
          )}
          {props.club.twitter && (
            <button
              type="button"
              className="p-3 mr-2 bg-blue-400 hover:bg-blue-600 rounded-full"
            >
              <FaTwitter className="w-16 h-16 inline-block text-white" />
            </button>
          )}
          {props.club.instagram && (
            <button
              type="button"
              className="p-3 mr-2 bg-pink-500 hover:bg-pink-600 rounded-full"
            >
              <AiOutlineInstagram className="w-16 h-16 inline-block text-white" />
            </button>
          )}
          {props.club.facebook && (
            <button
              type="button"
              className="p-3 mr-2 bg-blue-500 hover:bg-blue-700 rounded-full"
            >
              <AiOutlineFacebook className="w-16 h-16 inline-block text-white" />
            </button>
          )}
          {props.club.website && (
            <button
              type="button"
              className="p-3 mr-2 bg-blue-800 hover:bg-blue-900 rounded-full"
            >
              <FaTwitter className="w-16 h-16 inline-block text-white" />
            </button>
          )}
        </div>

        <div className="text-center h-auto py-12 bg-gray-100">
          <p className="text-4xl font-bold">Q＆A</p>
          <p className="text-secondary-main">質問コーナー</p>
          <ul>
            <li>
              {props.club.qA?.map((questionAndAnswerPair) => (
                <li key={questionAndAnswerPair?.id}>
                  <div className="text-left">
                    <IoMdPerson className="w-20 h-20 inline-block text-black" />
                    <p className="inline-block bg-white py-1 px-6 mb-6">
                      {questionAndAnswerPair?.question}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="inline-block bg-secondary-main py-1 px-6 mb-6 text-white">
                      {questionAndAnswerPair?.answer}
                    </p>
                    <IoMdPeople className="inline-block text-black w-20 h-20" />
                  </div>
                </li>
              ))}
            </li>
          </ul>
        </div>
        <div className="text-center h-96 py-12">
          <p className="text-4xl font-bold">INTERVIEW</p>
          <p className="text-secondary-main">インタビューコーナー</p>
        </div>
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
            <AiOutlineFacebook className="inline-block text-white" />
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
      <div className="text-center h-96 py-12 bg-gray-100">
        <p className="text-4xl font-bold">SCHEDULE</p>
        <p className="text-secondary-main">新歓情報</p>
      </div>
      <div className="text-center h-96 py-12">
        <p className="text-4xl font-bold">RELATED</p>
        <p className="text-secondary-main">関連記事</p>
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
      query GetClubBySlugQuery($id: ItemId!) {
        club(filter: { id: { eq: $id } }) {
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
            question
            answer
          }
          images {
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
          id
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
