import { gql } from "@apollo/client";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { FaTwitter, FaLine, FaLink } from "react-icons/fa";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import ArticleLink from "../../components/ArticleLink";
import Hero from "../../components/Hero";
import RichTextRenderer from "../../components/RichTextRenderer";
import Layout from "../../components/Layout";
import apolloClient from "../../utils/apollo";
import {
  GetClubBySlugQuery,
  GetClubBySlugQueryVariables,
} from "../../__generated__/GetClubBySlugQuery";
import SnsShareLinks from "../../components/SnsShareLinks";
import ClubQuestionOrAnswer from "../../components/ClubQuestionOrAnswer";

export default function ClubsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.club.name}>
      <Hero image={props.club.images[0]?.url ?? "/images/utmap.png"}>
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
        <div className="pb-10 border-b-2">
          {props.club.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-block mr-2 mb-2 px-2 py-1 bg-gray-200"
            >
              # {tag.name}
            </span>
          ))}
        </div>

        <SnsShareLinks />

        <img
          className="mx-auto max-h-96 object-contain border-8 border-secondary-main"
          src={props.club.images[0]?.url ?? "/images/utmap.png"}
          alt="画像"
        />

        <h1 className="mt-24 mb-6 px-6 py-3 bg-gray-200">基本情報</h1>

        <div className="border-l-4 pl-2 border-secondary-main font-bold">
          団体名
        </div>
        <h1 className="text-bold p-3 text-3xl">{props.club.name}</h1>
        <div className="my-4 px-6 py-2 bg-yellow-50">
          <RichTextRenderer markdown={props.club.description ?? ""} />
        </div>
        <table className="my-3 w-full" cellPadding="10">
          <tr className="border-b-2">
            <td className="font-bold w-1/4">普段の活動予定</td>
            <td className="w-3/4">
              <RichTextRenderer markdown={props.club.usualActivity ?? ""} />
            </td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">月ごとの特別な予定</td>
            <td>
              <RichTextRenderer markdown={props.club.eventSchedule ?? ""} />
            </td>
          </tr>
          <tr className="border-b-2">
            <td className="font-bold">入会選考の有無</td>
            <td>{props.club.requiresExamination}</td>
          </tr>
        </table>
        <div className="container mx-auto px-1 md:px-24 p-3 bg-secondary-main border-t-8 border-white text-white">
          <div className="text-center">新歓日程</div>
        </div>
        <div className="px-6 py-2 border-2 border-secondary-main bg-yellow-50">
          <RichTextRenderer markdown={props.club.welcomeEvent ?? ""} />
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
            <a
              href={props.club.line}
              target="_blank"
              rel="noreferrer"
              className="inline-block p-3 m-1 bg-green-400 hover:bg-green-900 rounded-full"
            >
              <FaLine className="w-16 h-16 inline-block text-white" />
            </a>
          )}
          {props.club.twitter && (
            <a
              href={props.club.twitter}
              target="_blank"
              rel="noreferrer"
              className="inline-block p-3 m-1 bg-blue-400 hover:bg-blue-600 rounded-full"
            >
              <FaTwitter className="w-16 h-16 inline-block text-white" />
            </a>
          )}
          {props.club.instagram && (
            <a
              href={props.club.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-block p-3 m-1 bg-pink-500 hover:bg-pink-600 rounded-full"
            >
              <AiOutlineInstagram className="w-16 h-16 inline-block text-white" />
            </a>
          )}
          {props.club.facebook && (
            <a
              href={props.club.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-block p-3 m-1 bg-blue-500 hover:bg-blue-700 rounded-full"
            >
              <AiOutlineFacebook className="w-16 h-16 inline-block text-white" />
            </a>
          )}
          {props.club.website && (
            <a
              href={props.club.website}
              target="_blank"
              rel="noreferrer"
              className="inline-block p-3 m-1 bg-blue-800 hover:bg-blue-900 rounded-full"
            >
              <FaLink className="w-16 h-16 inline-block text-white" />
            </a>
          )}
        </div>
      </div>

      <div className="text-center h-auto py-12 bg-gray-100">
        <p className="text-4xl font-bold">Q &amp; A</p>
        <p className="text-secondary-main mb-8">質問コーナー</p>
        <ul className="container mx-auto px-8 md:px-24">
          {props.club.qA?.map((questionAndAnswerPair) => (
            <li key={questionAndAnswerPair?.id}>
              <ClubQuestionOrAnswer
                type="question"
                isOnGrayBackground
                className="my-8"
              >
                {questionAndAnswerPair?.question}
              </ClubQuestionOrAnswer>
              <ClubQuestionOrAnswer
                type="answer"
                isOnGrayBackground
                className="my-8"
              >
                {questionAndAnswerPair?.answer}
              </ClubQuestionOrAnswer>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center py-12">
        <p className="text-4xl font-bold">INTERVIEW</p>
        <p className="text-secondary-main mb-8">インタビューコーナー</p>
        <ul className="container mx-auto px-8 md:px-24">
          {[
            {
              question: "このサークルならではの魅力はなんですか？",
              answer: props.club.interviewAttraction,
            },
            {
              question: "このサークルに入って良かったと思うことはなんですか？",
              answer: props.club.interviewBestThing,
            },
            {
              question:
                "本音ベースでお聞きします。どんなタイプの学生が所属していますか？",
              answer: props.club.interviewMembersPersonality,
            },
          ].map((questionAndAnswerPair) => (
            <li key={questionAndAnswerPair.question}>
              <ClubQuestionOrAnswer type="question" className="my-8">
                {questionAndAnswerPair.question}
              </ClubQuestionOrAnswer>
              <ClubQuestionOrAnswer type="answer" className="my-8">
                {questionAndAnswerPair.answer}
              </ClubQuestionOrAnswer>
            </li>
          ))}
        </ul>
      </div>

      <div className="container mx-auto px-8 md:px-24">
        <SnsShareLinks />
      </div>

      {/* <div className="text-center h-96 py-12 bg-gray-100">
        <p className="text-4xl font-bold">SCHEDULE</p>
        <p className="text-secondary-main">新歓情報</p>
      </div> */}

      <div className="container mx-auto py-12">
        <p className="text-4xl text-center font-bold">RELATED</p>
        <p className="text-secondary-main mb-8 text-center">関連サークル</p>
        {props.club.relatedclubs.length ? (
          <ul className="md:grid md:grid-cols-2 xl:grid-cols-3">
            {props.club.relatedclubs.map((related) => (
              <li key={related.id}>
                <ArticleLink
                  title={related.name ?? ""}
                  category={related.category?.name ?? ""}
                  url={`/clubs/${related.id}`}
                  imageUrl={related.images[0]?.url ?? "/images/utmap.png"}
                  tags={related.tags.map((tag) => ({
                    id: tag.id,
                    name: tag.name ?? "",
                  }))}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>関連サークルが見つかりませんでした。</p>
        )}
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
  return { props: { club }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
