import { gql } from "@apollo/client";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import RichTextRenderer from "../../components/RichTextRenderer";
import SnsShareLinks from "../../components/SnsShareLinks";
import apolloClient from "../../utils/apollo";
import {
  GetInternshipBySlugQuery,
  GetInternshipBySlugQueryVariables,
} from "../../__generated__/GetInternshipBySlugQuery";

export default function InternshipPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.internship.title}>
      <Hero image="../../images/article.jpg">
        <div className="container mx-auto px-8 md:px-24 py-40">
          <h1 className="text-3xl">{props.internship.title}</h1>
        </div>
      </Hero>
      <Banners />
      <div className="w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto px-8 md:px-24">
        <div className="pt-24 flex">
          {props.internship.isRecruiting ? (
            <p className="bg-secondary-main py-1 px-6 text-white">募集中</p>
          ) : (
            <p className="bg-secondary-main py-1 px-6 text-white">募集締切</p>
          )}
          <p className="px-5 py-1">
            {props.internship.updatedAt.substr(0, 10).replace(/-/g, "/")}
          </p>
        </div>
        <h3 className="pt-8 text-xl font-bold">
          {props.internship.company?.name}
        </h3>
        <h2 className="py-8 text-3xl font-bold">{props.internship.title}</h2>
        <div className="pb-10 border-b-2">
          {props.internship.features.map((feature) => (
            <p className="px-4 py-1 mr-2 mb-2 bg-gray-200 inline-block">
              # {feature.name}
            </p>
          ))}
        </div>
        <SnsShareLinks />
        <div className="p-4 bg-gray-100 text-xl font-bold">イベントの内容</div>
        <RichTextRenderer
          markdown={props.internship.description ?? ""}
          className="pt-4 pb-10"
        />
        <div className="p-4 bg-gray-100 text-xl font-bold">企業情報</div>
        <ul className="pb-10">
          {[
            { title: "社名", component: props.internship.company?.name },
            { title: "代表者", component: props.internship.company?.leader },
            {
              title: "業界",
              component: props.internship.company?.industry?.name,
            },
            {
              title: "設立",
              component: props.internship.company?.establishedAt,
            },
            { title: "所在地", component: props.internship.company?.location },
            { title: "URL", component: props.internship.company?.url },
          ].map((information) => (
            <li key={information.title} className="relative p-4 border-b">
              <p className="inline-block font-bold">{information.title}</p>
              <p className="absolute left-44 inline-block">
                {information.component}
              </p>
            </li>
          ))}
        </ul>
        <div className="p-4 bg-gray-100 text-xl font-bold">得られるスキル</div>
        <RichTextRenderer
          markdown={props.internship.internshipSkill ?? ""}
          className="pt-4 pb-10"
        />
        <div className="p-4 bg-gray-100 text-xl font-bold">募集要項</div>
        <ul className="pb-10">
          {[
            { title: "実施期間", component: props.internship.workingPeriod },
            { title: "応募条件", component: props.internship.requirement },
            {
              title: "求める人物像",
              component: props.internship.idealCandidateCharacter,
            },
            {
              title: "場所",
              component: props.internship.location,
            },
            {
              title: "アクセス",
              component: props.internship.access,
            },
            {
              title: "定員",
              component: props.internship.maximumApplicationsAllowed,
            },
            {
              title: "選考プロセス",
              component: props.internship.selectionProcess,
            },
            {
              title: "お問い合わせ",
              component: props.internship.contact,
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
        <div className="p-4 bg-gray-100 text-xl font-bold">待遇</div>
        <ul className="pb-10">
          {[
            { title: "給与", component: props.internship.salary },
            { title: "その他の補助", component: props.internship.extraWelfare },
          ].map((information) => (
            <li key={information.title} className="relative p-4 border-b">
              <p className="inline-block font-bold">{information.title}</p>
              <p className="absolute left-44 inline-block">
                {information.component}
              </p>
            </li>
          ))}
        </ul>
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
    GetInternshipBySlugQuery,
    GetInternshipBySlugQueryVariables
  >({
    query: gql`
      query GetInternshipBySlugQuery($slug: String!) {
        internship(filter: { slug: { eq: $slug } }) {
          title
          description
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
          images {
            url
          }
          internshipSkill
          workingPeriod
          requirement
          idealCandidateCharacter
          location
          access
          maximumApplicationsAllowed
          selectionProcess
          contact
          salary
          extraWelfare
          isRecruiting
          isLongTermInternship
          features {
            name
          }
          jobType {
            name
          }
          industry {
            name
          }
          url
        }
      }
    `,
    variables: { slug },
  });

  const { internship } = queryResult.data;
  if (!internship) return { notFound: true } as never;
  return { props: { internship }, revalidate: 60 };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}
