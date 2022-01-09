import { AiOutlineDown } from "react-icons/ai";
import Image from "next/image";
import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Banners from "../../components/Banners";
import IndexHeroContent from "../../components/IndexHeroContent";
import Layout from "../../components/Layout";
/* import Logo from "../../components/Logo"; */
import CareersPageFeatureLink from "../../components/CareersPageFeatureLink";
import CareersPageLinkButton from "../../components/CareersPageLinkButton";
import apolloClient from "../../utils/apollo";
import { CareerIndexQuery } from "../../__generated__/CareerIndexQuery";
import ArticleLinkCareer from "../../components/ArticleLinkCareer";
import SectionHeader from "../../components/SectionHeader";
import Carousel from "../../components/Carousel";
import ResponsiveImageWithFallback from "../../components/ResponsiveImageWithFallback";
import GradientImageOverlay from "../../components/GradientImageOverlay";
import CategoryChip from "../../components/CategoryChip";
import { responsiveImageFragment } from "../../utils/datocms";

export default function CareerIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout title="キャリアホーム">
      <IndexHeroContent
        imageUrl="/images/top-careers.jpg"
        title="Career"
        subtitle="就職 / キャリア選択のサポート"
      />
      <Banners />
      <div className="pt-24 py-72 sm:py-56">
        <div className="relative">
          <Image
            height={680}
            width={1200}
            objectFit="contain"
            src="/images/careers-top.jpg"
          />
          <div className="absolute -bottom-64 sm:-bottom-48 lg:-bottom-36 right-0 max-w-4xl px-8 md:px-24 py-12 ml-6 bg-gray-50">
            <p className="leading-loose">
              ここに説明が入ります。これはダミーテキストです。ここに説明が入ります。これはダミーテキ
              ストです。ここに説明が入ります。ここに説明が入ります。これはダミーテキストです。ここに
              説明が入ります。
              <br />
              ここに説明が入ります。これはダミーテキストです。ここに説明が入ります。これはダミーテキ
              ストです。ここに説明が入ります。ここに説明が入ります。これはダミーテキストです。ここに
              説明が入ります。
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-2 lg:flex px-8 pb-24">
        {[
          { title: "キャリア戦略", linkTo: "#career-strategies" },
          { title: "企業分析", linkTo: "#companies" },
          { title: "業界分析", linkTo: "#companies" },
          { title: "職種分析", linkTo: "#companies" },
          { title: "キャリア特集", linkTo: "#graduates" },
          { title: "卒業生", title2: "インタビュー", linkTo: "#graduates" },
          { title: "就活用語", linkTo: "#careers" },
        ].map((component) =>
          component.title === "キャリア戦略" ? (
            <a
              key={component.linkTo}
              href={component.linkTo}
              className="col-span-2 lg:flex-grow block py-4 border border-black bg-gray-50"
            >
              <div className="h-12 w-24 mx-auto flex flex-wrap items-center justify-center">
                <p>{component.title}</p>
                {component.title2 && <p>{component.title2}</p>}
              </div>
              <AiOutlineDown className="mx-auto text-center text-secondary-main" />
            </a>
          ) : (
            <a
              key={component.linkTo}
              href={component.linkTo}
              className="lg:flex-grow block py-4 border border-black bg-gray-50"
            >
              <div className="h-12 w-24 mx-auto flex flex-wrap items-center justify-center">
                <p>{component.title}</p>
                {component.title2 && <p>{component.title2}</p>}
              </div>
              <AiOutlineDown className="mx-auto text-center text-secondary-main" />
            </a>
          )
        )}
      </div>
      <div className="bg-gray-100 w-full">
        <Image
          height={640}
          width={1440}
          src="/images/careers-career-strategies.jpg"
        />
        <div className="-mt-12 lg:-mt-24 w-full bg-gray-50">
          <div className="relative w-5/6 mr-0 ml-auto lg:mx-auto bg-white">
            <div
              id="career-strategies"
              className="py-16 lg:py-24 px-14 lg:grid lg:grid-cols-7"
            >
              <div className="lg:col-span-3">
                <p className="text-2xl lg:text-4xl pb-10">キャリア戦略</p>
                <CareersPageLinkButton
                  linkTo="/career-strategies"
                  className="hidden lg:block"
                />
              </div>
              <p className="lg:col-span-4 leading-loose">
                ここに説明が入ります。これはダミーテキストです。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。
                <br />
                ここに説明が入ります。これはダミーテキストです。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。
              </p>
              <CareersPageLinkButton
                linkTo="/career-strategies"
                className="mt-12 block lg:hidden"
              />
            </div>
            {/* <div className="absolute -top-24 -right-40 w-4/5 h-full overflow-hidden">
              <Logo disableText className="hidden lg:block w-full opacity-10" />
          </div> */}
          </div>
        </div>
      </div>
      <div className="bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-3xl pt-20 pb-4">キャリア設計を支える3つの柱</p>
          <p className="text-secondary-main pb-16">
            Three points to support career planning
          </p>
          <div
            id="companies"
            className="px-20 pb-28 grid lg:grid-cols-3 w-full justify-center"
          >
            <CareersPageFeatureLink
              title="企業分析"
              subTitle="Corporate Analysis"
              imageUrl="/images/companies.jpg"
              linkTo="/career-strategies"
              className="max-w-sm"
            />
            <CareersPageFeatureLink
              title="職歴分析"
              subTitle="Work History Analysis"
              imageUrl="/images/careers-work-history-analysis.jpg"
              linkTo="/graduates"
              className="max-w-sm"
            />
            <CareersPageFeatureLink
              title="業界分析"
              subTitle="Industry Analysis"
              imageUrl="/images/careers-industry-analysis.jpg"
              linkTo="/industries"
              className="max-w-sm"
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 py-24">
        <div className="lg:relative">
          <div className="relative lg:absolute lg:top-0 lg:-left-20 w-11/12 lg:w-1/2 h-96 lg:h-full lg:pr-28">
            <Image
              layout="fill"
              src="/images/careers-graduates.jpg"
              objectFit="cover"
            />
          </div>
          <div className="container mx-auto">
            <div
              id="graduates"
              className="lg:w-1/2 mr-0 ml-auto py-16 px-8 lg:pr-10"
            >
              <p className="py-12 border-t-2 border-secondary-main text-2xl lg:text-4xl">
                卒業生インタビュー
              </p>
              <p className="leading-loose pb-20">
                ここに説明が入ります。これはダミーテキストです。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。
                <br />
                ここに説明が入ります。これはダミーテキストです。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。
              </p>
              <CareersPageLinkButton linkTo="/graduates" />
            </div>
          </div>
        </div>
        <div className="container mx-auto pt-16">
          <ul className="md:grid md:grid-cols-2 xl:grid-cols-3">
            {props.allGraduateArticles.map((graduateArticle) => (
              <li key={graduateArticle.id}>
                <ArticleLinkCareer
                  slug={graduateArticle.slug ?? ""}
                  title={graduateArticle.title ?? ""}
                  imageUrl={graduateArticle.image?.url}
                  categoryName={graduateArticle.category?.name ?? ""}
                  date={graduateArticle.date}
                  tags={graduateArticle.tags.map((tag) => ({
                    id: tag.id,
                    name: tag.name ?? "",
                  }))}
                  className="hover:bg-gray-200"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-white py-24">
        <SectionHeader
          className="mb-12"
          title="INTERNSHIP"
          subtitle="インターンシップ情報"
        />
        <Carousel
          aspectRatio={9 / 16}
          cards={props.allInternships.map((internship) => ({
            key: internship.id,
            content: (
              <Link href={`/internships/${internship.slug}`}>
                <a className="block relative w-full h-full">
                  <ResponsiveImageWithFallback
                    aspectRatio={16 / 9}
                    data={internship.thumbnailImage?.responsiveImage}
                  />
                  <GradientImageOverlay />
                  <div className="absolute bottom-0 left-0 w-full px-20 py-6 md:py-12 md:px-12 text-white">
                    <CategoryChip type="secondary" className="mb-4 md:mb-6">
                      {internship.isRecruiting ? "募集中" : "募集終了"}
                    </CategoryChip>
                    <p className="text-xl md:text-2xl">{internship.title}</p>
                  </div>
                </a>
              </Link>
            ),
          }))}
        />
      </div>
      <div className="bg-gray-50 py-24">
        <SectionHeader
          className="mb-12"
          title="RECRUIT EVENT"
          subtitle="就活イベント情報"
        />
        <Carousel
          aspectRatio={9 / 16}
          cards={props.allEvents.map((event) => ({
            key: event.id,
            content: (
              <Link href={`/events/${event.slug}`}>
                <a className="block relative w-full h-full">
                  <ResponsiveImageWithFallback
                    aspectRatio={16 / 9}
                    data={event.thumbnailImage?.responsiveImage}
                  />
                  <GradientImageOverlay />
                  <div className="absolute bottom-0 left-0 w-full px-20 py-6 md:py-12 md:px-12 text-white">
                    <CategoryChip type="secondary" className="mb-4 md:mb-6">
                      {event.isRecruiting ? "募集中" : "募集終了"}
                    </CategoryChip>
                    <p className="text-xl md:text-2xl">{event.title}</p>
                  </div>
                </a>
              </Link>
            ),
          }))}
        />
      </div>
      <div className="py-24">
        <div className="lg:relative">
          <div className="relative lg:absolute lg:top-0 lg:right-0 w-11/12 lg:w-1/2 h-96 lg:h-full lg:pl-28">
            <Image
              layout="fill"
              src="/images/careers-job-hunting-term.jpg"
              objectFit="cover"
              className="hidden lg:block"
            />
          </div>
          <div className="container mx-auto">
            <div id="careers" className="lg:w-1/2 py-16 px-8 lg:pr-12">
              <p className="py-12 border-t-2 border-secondary-main text-2xl lg:text-4xl">
                就活用語
              </p>
              <p className="leading-loose pb-20">
                ここに説明が入ります。これはダミーテキストです。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。
                <br />
                ここに説明が入ります。これはダミーテキストです。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。ここに説明が入ります。
                これはダミーテキストです。ここに説明が入ります。
              </p>
              <CareersPageLinkButton linkTo="" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const queryResult = await apolloClient.query<CareerIndexQuery>({
    query: gql`
      ${responsiveImageFragment}
      query CareerIndexQuery {
        allGraduateArticles(first: 3) {
          id
          slug
          title
          date
          image {
            id
            url(imgixParams: { maxW: 300 })
          }
          category {
            name
          }
          tags {
            id
            name
          }
        }
        allInternships(filter: { isRecruiting: { eq: true } }, first: 5) {
          id
          slug
          title
          isLongTermInternship
          isRecruiting
          features {
            id
            name
          }
          thumbnailImage {
            responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
              ...ResponsiveImageFragment
            }
          }
        }
        allEvents(filter: { isRecruiting: { eq: true } }, first: 5) {
          id
          slug
          title
          isRecruiting
          features {
            id
            name
          }
          thumbnailImage {
            responsiveImage(imgixParams: { ar: "16:9", fit: crop }) {
              ...ResponsiveImageFragment
            }
          }
        }
      }
    `,
  });
  return {
    props: queryResult.data,
    revalidate: 60,
  };
}
