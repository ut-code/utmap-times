import { gql } from "@apollo/client";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import ArticleContentContainer from "../../components/ArticleContentContainer";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import RichTextRenderer from "../../components/RichTextRenderer";
import SnsShareLinks from "../../components/SnsShareLinks";
import apolloClient from "../../utils/apollo";
import {
  GetEventBySlugQuery,
  GetEventBySlugQueryVariables,
} from "../../__generated__/GetEventBySlugQuery";

export default function EventPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  dayjs.locale(ja);
  const day = dayjs(props.event.applicationDeadline);
  const applicationDeadlineString = day.format("YYYY/MM/DD(dd) HH:mm");
  return (
    <Layout title={props.event.title}>
      <Hero image={props.event.image?.url ?? "../../images/article.jpg"}>
        <div className="container mx-auto px-8 md:px-24 py-40">
          <h1 className="text-3xl">{props.event.title}</h1>
        </div>
      </Hero>
      <Banners />
      <ArticleContentContainer>
        <div className="pt-24 flex">
          {props.event.isRecruiting ? (
            <p className="bg-secondary-main py-1 px-6 text-white">募集中</p>
          ) : (
            <p className="bg-secondary-main py-1 px-6 text-white">募集締切</p>
          )}
          <p className="px-5 py-1">
            {props.event.updatedAt.substr(0, 10).replace(/-/g, "/")}
          </p>
        </div>
        <h3 className="pt-8 text-xl font-bold">{props.event.company?.name}</h3>
        <h2 className="py-8 text-3xl font-bold">{props.event.title}</h2>
        <div className="pb-10 border-b-2">
          {props.event.targets.map((target) => (
            <p className="px-4 py-1 mr-2 mb-2 bg-gray-200 inline-block">
              # {target.name}
            </p>
          ))}
          {props.event.features.map((feature) => (
            <p className="px-4 py-1 mr-2 mb-2 bg-gray-200 inline-block">
              # {feature.name}
            </p>
          ))}
        </div>
        <SnsShareLinks />
        <div className="p-4 bg-gray-100 text-xl font-bold">イベントの内容</div>
        <RichTextRenderer
          markdown={props.event.description ?? ""}
          className="pt-4 pb-10"
        />
        <div className="p-4 bg-gray-100 text-xl font-bold">企業情報</div>
        <ul className="pb-10">
          {[
            { title: "社名", component: props.event.company?.name },
            { title: "代表者", component: props.event.company?.leader },
            { title: "業界", component: props.event.company?.industry?.name },
            { title: "設立", component: props.event.company?.establishedAt },
            { title: "所在地", component: props.event.company?.location },
            { title: "URL", component: props.event.company?.url },
          ].map((information) => (
            <li key={information.title} className="relative p-4 border-b">
              <p className="inline-block font-bold">{information.title}</p>
              <p className="absolute left-44 inline-block">
                {information.component}
              </p>
            </li>
          ))}
        </ul>
        <div className="p-4 bg-gray-100 text-xl font-bold">開催要項</div>
        <ul className="pb-10">
          {[
            { title: "日時", component: props.event.schedule },
            { title: "場所", component: props.event.location },
            {
              title: "申し込み締切",
              component: applicationDeadlineString,
            },
          ].map((information) => (
            <li key={information.title} className="relative p-4 border-b">
              <p className="inline-block font-bold">{information.title}</p>
              <p className="absolute left-44 inline-block">
                {information.component}
              </p>
            </li>
          ))}
        </ul>
        <div className="p-4 bg-gray-100 text-xl font-bold">参加要項</div>
        <ul className="pb-20">
          {[
            { title: "募集対象", list: props.event.targets },
            { title: "定員", component: props.event.capacity },
            { title: "参加費", component: props.event.participationFee },
            { title: "持ち物", component: props.event.thingsToBring },
          ].map((information) => (
            <li key={information.title} className="relative p-4 border-b">
              <p className="inline-block font-bold">{information.title}</p>
              {information.title === "募集対象" ? (
                <div className="absolute left-44 inline-block">
                  {information.list?.map((target, index) =>
                    index === 0 ? (
                      <p className="inline-block">{target.name}</p>
                    ) : (
                      <p className="inline-block">、{target.name}</p>
                    )
                  )}
                </div>
              ) : (
                <p className="absolute left-44 inline-block">
                  {information.component}
                </p>
              )}
            </li>
          ))}
        </ul>
      </ArticleContentContainer>
      <div className="bg-primary-main">
        <div className="container mx-auto py-16 text-center">
          <p className="pb-8 bg-primary-main text-2xl text-white">
            このイベントに応募する
          </p>
          <Link href={props.event.applicationLink ?? ""}>
            <a className="inline-block px-12 py-3 text-sm font-bold bg-white text-primary-main">
              応募する
            </a>
          </Link>
        </div>
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
    GetEventBySlugQuery,
    GetEventBySlugQueryVariables
  >({
    query: gql`
      query GetEventBySlugQuery($slug: String!) {
        event(filter: { slug: { eq: $slug } }) {
          title
          image {
            url
          }
          updatedAt
          company {
            name
            leader
            industry {
              name
              slug
            }
            establishedAt
            location
            url
          }
          category {
            name
          }
          isRecruiting
          targets {
            name
          }
          features {
            name
          }
          description
          schedule
          startsAt
          location
          applicationDeadline
          participationFee
          capacity
          thingsToBring
          remarks
          applicationLink
        }
      }
    `,
    variables: { slug },
  });

  const { event } = queryResult.data;
  if (!event) return { notFound: true } as never;
  return { props: { event }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
