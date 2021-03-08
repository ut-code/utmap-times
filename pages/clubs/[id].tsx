import { gql } from "@apollo/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { FaTwitter, FaLine, FaLink } from "react-icons/fa";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { IoMdPerson, IoMdPeople } from "react-icons/io";
import ArticleLink from "../../components/ArticleLink";
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

        <img
          className="mx-auto"
          src={props.club.images[0]?.url ?? "/images/no-image.svg"}
          alt="画像"
        />

        <div className="pt-24">
          <h1 className="bg-gray-200 py-3 px-6">基本情報</h1>
        </div>
        <div>団体名</div>
        <h1 className="text-bold p-3 text-3xl">{props.club.name}</h1>
        <div className="container mx-auto px-1 md:px-24 p-5 bg-yellow-50">
          <RichTextRenderer html={props.club.description ?? ""} />
        </div>
        <table className="my-3 w-full" cellPadding="10">
          <tr className="border-b-2">
            <td className="font-bold w-1/4">普段の活動予定</td>
            <td className="w-3/4">{props.club.usualActivity}</td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">月ごとの特別な予定</td>
            <td>{props.club.eventSchedule}</td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">入会選考の有無</td>
            <td>{props.club.requiresExamination}</td>
          </tr>
        </table>
        <div className="container mx-auto px-1 md:px-24 p-3 bg-secondary-main border-t-8 border-white text-white">
          <div className="text-center">新歓日程</div>
        </div>
        <div className="container mx-auto px-1 md:px-24 p-5 bg-yellow-50 border-solid border-2 border-secondary-main">
          <div>{props.club.welcomeEvent}</div>
        </div>
        <div className="pt-24">
          <h1 className="bg-gray-200 py-3 px-6">詳細情報</h1>
        </div>
        <table className="my-3 w-full" cellPadding="10">
          <tr className="border-b-2">
            <td className="font-bold w-1/4">代表者</td>
            <td className="w-3/4">{props.club.leader}</td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">設立年</td>
            <td>{props.club.establishedYear}</td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">男女比</td>
            <td>{props.club.genderRatio}</td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">大学</td>
            <td>{props.club.membersUniversityComposition}</td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">東大生の割合</td>
            <td>{props.club.utStudentRatio}</td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">入会費</td>
            <td>{props.club.participationCost}</td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">年会費</td>
            <td>{props.club.annualCost}</td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">連絡先</td>
            <td>{props.club.contact}</td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">備考</td>
            <td>{props.club.remarks}</td>
          </tr>
        </table>
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
              <FaLink className="w-16 h-16 inline-block text-white" />
            </button>
          )}
        </div>
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
                  <p className="inline-block bg-white py-1 max-w-2xl px-6 mb-6">
                    {questionAndAnswerPair?.question}
                  </p>
                </div>
                <div className="text-right">
                  <p className="inline-block bg-secondary-main py-1 px-6 mb-6 max-w-5xl text-left text-white">
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
        <ul>
          <li>
            <div className="text-left">
              <IoMdPerson className="w-20 h-20 inline-block text-black" />
              <p className="inline-block bg-gray-100 py-1 max-w-2xl px-6 mb-6">
                このサークルならではの魅力はなんですか？
              </p>
            </div>
            <div className="text-left">
              <IoMdPeople className="inline-block text-black w-20 h-20" />
              <p className="inline-block bg-secondary-main py-1 px-6 mb-6 max-w-5xl text-left text-white">
                {props.club.interviewAttraction}
              </p>
            </div>
            <div className="text-left">
              <IoMdPerson className="w-20 h-20 inline-block text-black" />
              <p className="inline-block bg-gray-100 py-1 max-w-2xl px-6 mb-6">
                このサークルに入って良かったと思うことはなんですか？
              </p>
            </div>
            <div className="text-left">
              <IoMdPeople className="inline-block text-black w-20 h-20" />
              <p className="inline-block bg-secondary-main py-1 px-6 mb-6 max-w-5xl text-left text-white">
                {props.club.interviewBestThing}
              </p>
            </div>
            <div className="text-left">
              <IoMdPerson className="w-20 h-20 inline-block text-black" />
              <p className="inline-block bg-gray-100 py-1 max-w-2xl px-6 mb-6">
                本音ベースでお聞きします。どんなタイプの学生が所属していますか？
              </p>
            </div>
            <div className="text-left">
              <IoMdPeople className="inline-block text-black w-20 h-20" />
              <p className="inline-block bg-secondary-main py-1 px-6 mb-6 max-w-5xl text-left text-white">
                {props.club.interviewMembersPersonality}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="container mx-auto px-8 md:px-24 py-48">
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
      <div className="text-center h-auto py-12">
        <p className="text-4xl font-bold">RELATED</p>
        <p className="text-secondary-main">関連サークル</p>
        <ul className="md:grid md:grid-cols-2 xl:grid-cols-3">
          {props.club.relatedclubs.map((related) => (
            <li key={related.id}>
              <ArticleLink
                title={related.name ?? ""}
                category={related.category?.name ?? ""}
                url={`/clubs/${related.id}`}
                imageUrl={related.images[0]?.url}
                tags={related.tags.map((tag) => ({
                  id: tag.id,
                  name: tag.name ?? "",
                }))}
              />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string }>) {
  const id = params?.id;
  if (!id) return { notFound: true } as never;

  const queryResult = await apolloClient.query<
    GetClubBySlugQuery,
    GetClubBySlugQueryVariables
  >({
    query: gql`
      query GetClubBySlugQuery($id: ItemId!) {
        club(filter: { id: { eq: $id } }) {
          id
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
          interviewAttraction
          interviewBestThing
          interviewMembersPersonality
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
          relatedclubs {
            id
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
            interviewAttraction
            interviewBestThing
            interviewMembersPersonality
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
      }
    `,
    variables: { id },
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
      params: { id: club.id },
    })),
    fallback: false,
  };
}
