import { gql } from "@apollo/client";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import LineBanners from "../../components/LineBanners";
import ArticleContentContainer from "../../components/ArticleContentContainer";
import { responsiveImageFragment } from "../../utils/datocms";
import Banners from "../../components/Banners";
import Hero from "../../components/Hero";
import Layout, { layoutSeoFragment } from "../../components/Layout";
import RichTextRenderer from "../../components/RichTextRenderer";
import SnsShareLinks from "../../components/SnsShareLinks";
import Carousel from "../../components/Carousel";
import apolloClient from "../../utils/apollo";
import {
  GetInternshipBySlugQuery,
  GetInternshipBySlugQueryVariables,
} from "../../__generated__/GetInternshipBySlugQuery";
import { articleContentStructuredTextArticleGalleryFragment } from "../../components/ArticleContentStructuredTextRenderer/ArticleGallery";
import { articleContentStructuredTextArticleLinkFragment } from "../../components/ArticleContentStructuredTextRenderer/ArticleLink";
import { articleContentStructuredTextCallToActionButtonFragment } from "../../components/ArticleContentStructuredTextRenderer/CallToActionButton";
import { articleContentStructuredTextEmbeddedImageFragment } from "../../components/ArticleContentStructuredTextRenderer/EmbeddedImage";
import { articleContentStructuredTextEmbeddedVideoFragment } from "../../components/ArticleContentStructuredTextRenderer/EmbeddedVideo";
import { articleStructuredTextContentPersonAndStatementFragment } from "../../components/ArticleContentStructuredTextRenderer/PersonAndStatement";
import ArticleContentStructuredTextRenderer from "../../components/ArticleContentStructuredTextRenderer";
import ResponsiveImageWithFallback from "../../components/ResponsiveImageWithFallback";

export default function InternshipPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title={props.internship.title} seo={props.internship.seo}>
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
            <p
              key={feature.id}
              className="px-4 py-1 mr-2 mb-2 bg-gray-200 inline-block"
            >
              # {feature.name}
            </p>
          ))}
        </div>
        <SnsShareLinks />
        {props.internship.topImage && (
          <img
            src={props.internship.topImage?.url}
            alt="インターン画像"
            className="w-full max-w-3xl mx-auto mb-12"
          />
        )}
        <div className="pb-10">
          <div className="p-4 bg-gray-100 text-xl font-bold">
            インターンシップの内容
          </div>
          <div className="px-4">
            <ArticleContentStructuredTextRenderer
              structuredText={props.internship.description}
            />
          </div>
        </div>
        <div className="pb-10">
          <div className="p-4 bg-gray-100 text-xl font-bold">
            {props.internship.company?.name}の詳細
          </div>
          <div className="px-4 my-4">
            <ArticleContentStructuredTextRenderer
              structuredText={props.internship.company?.companyDescription}
            />
          </div>
        </div>
        <div className="p-4 bg-gray-100 text-xl font-bold">企業情報</div>
        <ul className="pb-10">
          {[
            { title: "社名", component: props.internship.company?.name },
            {
              title: "業界",
              component: props.internship.company?.industry?.name,
            },
            { title: "所在地", component: props.internship.company?.location },
            { title: "URL", component: props.internship.company?.companyHpUrl },
          ].map(
            (information) =>
              information.component && (
                <li
                  key={information.title}
                  className="flex px-4 border-b items-center"
                >
                  <p className="w-32 lg:w-44 flex-none font-bold">
                    {information.title}
                  </p>
                  <RichTextRenderer
                    markdown={information.component}
                    className="my-4"
                  />
                </li>
              )
          )}
        </ul>
      </ArticleContentContainer>

      <Carousel
        aspectRatio={16 / 9}
        cards={props.internship.images.map((image) => ({
          key: image.id,
          content: (
            <ResponsiveImageWithFallback
              lazyLoad={false}
              aspectRatio={16 / 9}
              data={image.responsiveImage}
            />
          ),
        }))}
      />

      <ArticleContentContainer>
        {props.internship.internshipSkill && (
          <div className="pt-10">
            <div className="p-4 bg-gray-100 text-xl font-bold">
              得られるスキル
            </div>
            <RichTextRenderer
              markdown={props.internship.internshipSkill}
              className="px-4 my-4"
            />
          </div>
        )}
        <div className="mt-10 p-4 bg-gray-100 text-xl font-bold">募集要項</div>
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
              title: "締切日程",
              component: props.internship.deadline,
            },
            {
              title: "お問い合わせ",
              component: props.internship.contact,
            },
          ].map(
            (information) =>
              information.component && (
                <li
                  key={information.title}
                  className="flex px-4 border-b items-center"
                >
                  <p className="w-32 lg:w-44 flex-none font-bold">
                    {information.title}
                  </p>
                  <RichTextRenderer
                    markdown={information.component}
                    className="my-4"
                  />
                </li>
              )
          )}
        </ul>
        <div className="p-4 bg-gray-100 text-xl font-bold">待遇</div>
        <ul className="pb-10">
          {[
            { title: "給与", component: props.internship.salary },
            { title: "その他の補助", component: props.internship.extraWelfare },
          ].map(
            (information) =>
              information.component && (
                <li
                  key={information.title}
                  className="flex px-4 border-b items-center"
                >
                  <p className="w-32 lg:w-44 flex-none font-bold">
                    {information.title}
                  </p>
                  <RichTextRenderer
                    markdown={information.component}
                    className="my-4"
                  />
                </li>
              )
          )}
        </ul>
        <LineBanners />
      </ArticleContentContainer>
      <div className="bg-primary-main">
        <div className="container mx-auto py-16 text-center">
          <p className="pb-8 bg-primary-main text-2xl text-white">
            このインターンに応募する
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            className="inline-block px-12 py-3 text-sm font-bold bg-white text-primary-main"
            href={props.internship.applicationLink ?? ""}
          >
            応募する
          </a>
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
      ${layoutSeoFragment}
      ${responsiveImageFragment}
      ${articleContentStructuredTextArticleGalleryFragment}
      ${articleContentStructuredTextArticleLinkFragment}
      ${articleContentStructuredTextCallToActionButtonFragment}
      ${articleContentStructuredTextEmbeddedVideoFragment}
      ${articleContentStructuredTextEmbeddedImageFragment}
      ${articleStructuredTextContentPersonAndStatementFragment}
      query GetInternshipBySlugQuery($slug: String!) {
        internship(filter: { slug: { eq: $slug } }) {
          title
          seo {
            ...LayoutSeoFragment
          }
          description {
            blocks {
              ... on ArticleGalleryRecord {
                ...ArticleContentStructuredTextArticleGalleryFragment
              }
              ... on ArticleLinkRecord {
                ...ArticleContentStructuredTextArticleLinkFragment
              }
              ... on CallToActionButtonRecord {
                ...ArticleContentStructuredTextCallToActionButtonFragment
              }
              ... on EmbeddedVideoRecord {
                ...ArticleContentStructuredTextEmbeddedVideoFragment
              }
              ... on EmbeddedImageRecord {
                ...ArticleContentStructuredTextEmbeddedImageFragment
              }
              ... on PersonAndStatementRecord {
                ...ArticleContentStructuredTextPersonAndStatementFragment
              }
            }
            value
          }
          updatedAt
          applicationLink
          company {
            name
            companyDescription {
              blocks {
                ... on ArticleGalleryRecord {
                  ...ArticleContentStructuredTextArticleGalleryFragment
                }
                ... on ArticleLinkRecord {
                  ...ArticleContentStructuredTextArticleLinkFragment
                }
                ... on CallToActionButtonRecord {
                  ...ArticleContentStructuredTextCallToActionButtonFragment
                }
                ... on EmbeddedVideoRecord {
                  ...ArticleContentStructuredTextEmbeddedVideoFragment
                }
                ... on EmbeddedImageRecord {
                  ...ArticleContentStructuredTextEmbeddedImageFragment
                }
                ... on PersonAndStatementRecord {
                  ...ArticleContentStructuredTextPersonAndStatementFragment
                }
              }
              value
            }
            logo {
              url
            }
            industry {
              name
              slug
            }
            location
            companyHpUrl
          }
          topImage {
            url
          }
          images {
            url
            id
            responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
              ...ResponsiveImageFragment
            }
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
          deadline
          contact
          salary
          extraWelfare
          isRecruiting
          isLongTermInternship
          features {
            id
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
