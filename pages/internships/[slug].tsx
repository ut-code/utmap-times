import { gql } from "@apollo/client";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import ArticleContentContainer from "../../components/ArticleContentContainer";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import ImageOrLogo from "../../components/ImageOrLogo";
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
      <Hero
        image={
          props.internship.heroImage?.url ??
          props.internship.images[0]?.url ??
          "../../images/article.jpg"
        }
      >
        <div className="container mx-auto px-8 md:px-24 py-40">
          <h1 className="text-3xl">{props.internship.title}</h1>
        </div>
      </Hero>
      <Banners />
      <ArticleContentContainer>
        <div className="mt-24 relative">
          <img
            src={props.internship.company?.logo?.url ?? "/images/utmap.png"}
            alt="会社ロゴ"
            className="absolute w-20 md:w-28 right-0 top-0"
          />
          <div className="flex">
            {props.internship.isRecruiting ? (
              <p className="bg-secondary-main py-1 px-6 text-white">募集中</p>
            ) : (
              <p className="bg-secondary-main py-1 px-6 text-white">募集締切</p>
            )}
            <p className="px-5 py-1">
              {props.internship.updatedAt.substr(0, 10).replace(/-/g, "/")}
            </p>
          </div>
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
        <img
          src={props.internship.images[0]?.url ?? "../../images/article.jpg"}
          alt="インターン画像"
          className="w-full max-w-3xl mx-auto mb-12"
        />
        <div className="p-4 bg-gray-100 text-xl font-bold">
          インターンシップの内容
        </div>
        <RichTextRenderer
          markdown={props.internship.description ?? ""}
          className="pt-4 pb-10"
        />
        <div className="p-4 bg-gray-100 text-xl font-bold">企業情報</div>
        <ul className="pb-10">
          {[
            { title: "社名", component: props.internship.company?.name },
            {
              title: "業界",
              component: props.internship.company?.industry?.name,
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
        <div className="py-8 space-y-8 md:space-y-0 md:grid md:grid-cols-2 xl:grid-cols-3">
          <ImageOrLogo
            alt={props.internship?.title ?? ""}
            src={props.internship?.images[0]?.url ?? "/images/utmap.png"}
            className="h-96 object-cover mx-4"
          />
          <ImageOrLogo
            alt={props.internship?.title ?? ""}
            src={props.internship?.images[1]?.url ?? "/images/utmap.png"}
            className="h-96 object-cover mx-4"
          />
          <ImageOrLogo
            alt={props.internship?.title ?? ""}
            src={props.internship?.images[2]?.url ?? "/images/utmap.png"}
            className="h-96 object-cover mx-4"
          />
        </div>
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
      </ArticleContentContainer>
      <div className="bg-primary-main">
        <div className="container mx-auto py-16 text-center">
          <p className="pb-8 bg-primary-main text-2xl text-white">
            このインターンに応募する
          </p>
          <Link href={props.internship.applicationlink ?? ""}>
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
    GetInternshipBySlugQuery,
    GetInternshipBySlugQueryVariables
  >({
    query: gql`
      query GetInternshipBySlugQuery($slug: String!) {
        internship(filter: { slug: { eq: $slug } }) {
          title
          description
          updatedAt
          applicationlink
          company {
            name
            logo {
              url
            }
            industry {
              name
              slug
            }
            location
            url
          }
          images {
            url
          }
          heroImage {
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
