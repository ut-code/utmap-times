import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { BsDownload } from "react-icons/bs";
import { gql } from "@apollo/client";
import QRCode from "qrcode.react";
import { InferGetStaticPropsType } from "next";
import { LineIcon } from "../../../components/Icons";
import clubsImage from "./clubs.jpg";
import seminarWeekImage from "./seminar-week.jpg";
import coursesImage from "./courses.jpg";
import coursesLineAppImage from "./courses-app.png";
import partTimeJobsImage from "./part-time-jobs.jpg";
import certificationsImage from "./certifications.jpg";
import restaurantsImage from "./restaurants.jpg";
import lineCouponImage from "./line-coupon.png";
import foodCouponImage from "./food-coupon.png";
import lineBannerPcImage from "./line-banner-pc.png";
import lineBannerSpImage from "./line-banner-sp.png";
import Footer from "../../../components/Footer";
import apolloClient from "../../../utils/apollo";
import { responsiveImageFragment } from "../../../utils/datocms";
import { layoutSeoFragment } from "../../../components/Layout";
import { NewComers2022PageQuery } from "../../../__generated__/NewComers2022PageQuery";
import { ResponsiveImageFragment } from "../../../__generated__/ResponsiveImageFragment";
import ResponsiveImageWithFallback from "../../../components/ResponsiveImageWithFallback";
import Header from "../../../components/Header";

function LinkButton(
  props: PropsWithChildren<{ href: string; className?: string }>
) {
  return (
    <Link href={props.href}>
      <a
        className={clsx(
          "inline-flex justify-center items-center p-2 rounded-xl bg-red-50 hover:bg-red-100 shadow-md shadow-rose-300 text-xs md:text-lg",
          props.className
        )}
      >
        {props.children}
      </a>
    </Link>
  );
}

function Section(props: {
  id?: string;
  title: string;
  description: string;
  image: StaticImageData;
  align: "left" | "right";
  linkTo?: string;
  nonPrimaryArticles?: {
    id?: string | null;
    linkTo?: string | null;
    title?: string | null;
    responsiveImage?: ResponsiveImageFragment | null;
  }[];
  afterTextBox?: JSX.Element;
  className?: string;
}) {
  return (
    <div id={props.id} className={props.className}>
      <div
        className={clsx(
          "relative lg:w-[34rem] mb-4 lg:mb-0",
          props.align === "right" && "lg:ml-auto"
        )}
      >
        <div
          aria-hidden
          className={clsx(
            "hidden lg:block absolute -top-3 w-24 h-24 bg-cyan-900",
            { left: "-right-3", right: "-left-3" }[props.align]
          )}
        />
        <div
          className="contents md:block lg:contents"
          style={{ clipPath: "inset(10rem 0)", margin: "-10rem 0" }}
        >
          <Image layout="responsive" src={props.image} />
        </div>
      </div>
      <div
        className={clsx(
          "lg:flex lg:items-start lg:gap-16",
          props.align === "left" && "lg:flex-row-reverse"
        )}
      >
        <div className="relative lg:flex-none lg:w-[34rem] lg:-mt-48">
          <div
            className={clsx(
              "lg:hidden absolute -top-2 w-24 h-24 bg-cyan-900",
              { left: "-left-2", right: "-right-2" }[props.align]
            )}
          />
          <div className="relative p-6 lg:p-8 bg-red-200">
            <h2
              className={clsx(
                "mb-4 lg:text-right text-lg md:text-4xl font-bold underline decoration-rose-100",
                { left: "text-left", right: "text-right" }[props.align]
              )}
              style={{ textDecorationThickness: "0.4rem" }}
            >
              {props.title}
            </h2>
            <p className="mb-4 text-sm leading-loose md:text-xl">
              {props.description}
            </p>
            {props.linkTo && (
              <LinkButton
                className="block absolute lg:static -bottom-5 right-4 h-10 lg:h-14"
                href={props.linkTo}
              >
                詳細はこちら
              </LinkButton>
            )}
          </div>
          {props.afterTextBox}
        </div>
        <ul className="mt-8 lg:mt-4 lg:grid lg:grid-cols-2 lg:gap-4">
          {props.nonPrimaryArticles?.map((article) => (
            <li
              key={article.id}
              className={clsx(
                props.align === "right" && "lg:last:[grid-column:2]"
              )}
            >
              <Link href={article.linkTo ?? ""}>
                <a className="flex lg:block items-center gap-6 relative p-2 lg:p-0 hover:bg-gray-300 hover:bg-opacity-30 content group">
                  <div className="flex-none w-28 lg:contents">
                    <ResponsiveImageWithFallback
                      aspectRatio={3 / 2}
                      data={article.responsiveImage}
                    />
                  </div>
                  <p className="lg:flex lg:invisible lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100 lg:transition-opacity items-center lg:absolute lg:top-0 lg:left-0 lg:w-full lg:h-full lg:bg-black lg:bg-opacity-70 lg:p-2 lg:text-white">
                    {article.title}
                  </p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Attachment(props: {
  title: string;
  description: string;
  image: StaticImageData;
  anchorText: string;
  anchorLinkTo: string;
  align: "left" | "right";
  className?: string;
}) {
  return (
    <div className={props.className}>
      <svg
        viewBox="0 0 2 1"
        preserveAspectRatio="none"
        className={clsx(
          "w-8 h-10 text-red",
          props.align === "right" && "ml-auto"
        )}
      >
        <path fill="currentColor" d="M1,0L0,1L2,1" />
      </svg>
      <div className="p-4 bg-orange-100">
        <p className="mb-2 text-md md:text-xl font-bold">{props.title}</p>
        <div className="flex gap-3 mb-2">
          <div className="flex-none w-28 md:w-40">
            <Image src={props.image} />
          </div>
          <p className="text-sm md:text-lg">{props.description}</p>
        </div>
        <a className="block text-center font-bold" href={props.anchorLinkTo}>
          {props.anchorText}
        </a>
      </div>
    </div>
  );
}

function CherryBlossom(props: { className?: string }) {
  return (
    <svg
      width="28"
      height="31"
      viewBox="0 0 28 31"
      fill="currentColor"
      className={clsx("fill-rose-300", props.className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.9604 0C13.8841 1.99802 10.554 7.94507 13.8449 15.7491C17.1357 13.5944 23.2003 8.08611 21.1318 3.29086C20.5833 3.17333 19.2748 3.00878 18.4286 3.29086C18.3894 2.42897 17.8409 0.564147 15.9604 0Z" />
      <path d="M27.9724 13.9862C24.9166 12.6542 17.9118 11.283 14.3389 16.4544C17.3555 19.2359 24.3055 23.6473 27.9724 19.0401C27.9724 18.6091 27.7609 17.5827 26.9146 16.9245C27.3456 16.6111 28.1605 15.5847 27.9724 13.9862Z" />
      <path d="M18.9948 29.3826C20.366 27.1887 21.2749 21.6255 13.941 16.9243C12.2564 20.3719 10.1095 27.9017 14.9988 30.4403C15.4297 30.2836 16.3857 29.8057 16.7618 29.1475C17.1927 29.3042 18.2426 29.5706 18.9948 29.3826Z" />
      <path d="M2.82074 26.0057C4.62287 26.5934 9.23791 25.5826 13.281 16.8383C9.95092 15.5063 2.63269 14.7463 0 22.3623C0.509299 22.6365 1.73945 23.185 2.58568 23.185C2.46814 23.6551 2.35061 24.8774 2.82074 26.0057Z" />
      <path d="M1.26649 8.97222C0.718017 11.0094 2.37128 15.2954 13.3721 16.1416C12.3927 11.793 9.09404 3.5658 3.73464 5.44629C3.53875 5.75971 3.194 6.76264 3.38205 8.26704C2.9511 8.18868 1.92467 8.22002 1.26649 8.97222Z" />
    </svg>
  );
}

function CherryBlossomFrameEdge(props: {
  position: "topLeft" | "bottomRight";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={clsx(
        props.position === "bottomRight" && "rotate-180",
        props.className
      )}
    >
      <CherryBlossom className="inline-block align-top w-8 h-9 drop-shadow-md" />
      <CherryBlossom className="inline-block align-top w-5 h-4 drop-shadow-md" />
      <br />
      <CherryBlossom className="inline-block w-8 h-5 drop-shadow-md" />
    </div>
  );
}

function CtaActionButton(
  props: PropsWithChildren<{
    href: string;
    className?: string;
  }>
) {
  return (
    <a
      href={props.href}
      target="_blank"
      className={clsx(
        "flex justify-center items-center md:w-max mx-auto md:px-12 py-2 rounded-xl bg-cyan-800 text-white shadow-md shadow-gray-700",
        props.className
      )}
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
}

export default function SpecialsNewcomers2022Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <Header />
      <div className="font-sans bg-rose-100 text-cyan-700">
        <div className="max-w-screen-lg mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row">
            <div className="contents lg:block lg:flex-none lg:w-1/2 lg:pt-12 lg:pr-12">
              <div className="lg:contents w-max mx-auto my-8">
                <h1 className="mb-2 lg:hidden">UTmap 東大新入生特設ページ</h1>
                <p className="text-4xl lg:text-7xl leading-tight">
                  東大生活を、
                  <br />
                  これ一つで。
                </p>
              </div>
              <div className="my-6 lg:hidden">
                <div className="text-center text-sm mb-4">
                  ＼公式LINEで限定情報をもっと！／
                </div>
                <a
                  href={props.globalSetting?.utmapLineUrl ?? ""}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LineIcon square className="w-14 h-14 mx-auto rounded-full" />
                </a>
              </div>
              <div className="grid grid-cols-3 gap-4 my-6 lg:my-24">
                <LinkButton
                  href="#specials-newcomers-2022-clubs"
                  className="h-10 lg:h-14"
                >
                  サークル
                </LinkButton>
                <LinkButton
                  href="#specials-newcomers-2022-seminar-week"
                  className="h-10 lg:h-14"
                >
                  <div className="text-center">
                    セミナー
                    <br className="hidden lg:block" />
                    Week
                  </div>
                </LinkButton>
                <LinkButton
                  href="#specials-newcomers-2022-courses"
                  className="h-10 lg:h-14"
                >
                  履修情報
                </LinkButton>
                <LinkButton
                  href="#specials-newcomers-2022-parttime-jobs"
                  className="h-10 lg:h-14"
                >
                  <div className="text-center">
                    アルバイト
                    <br className="hidden lg:block" />
                    情報
                  </div>
                </LinkButton>
                <LinkButton
                  href="#specials-newcomers-2022-certifications"
                  className="h-10 lg:h-14"
                >
                  資格塾情報
                </LinkButton>
                <LinkButton
                  href="#specials-newcomers-2022-restaurants"
                  className="h-10 lg:h-14"
                >
                  ご飯情報
                </LinkButton>
                <LinkButton
                  href="#specials-newcomers-2022-magazine-utmap"
                  className="h-10 lg:h-14 col-span-full"
                >
                  新歓情報誌 “UTmap”
                </LinkButton>
              </div>
            </div>
            <section className="my-6">
              <h1 className="hidden lg:block mb-8 text-3xl">
                UTmap 東大新入生特設ページ
              </h1>
              <p className="text-center lg:text-left text-xl md:text-2xl mb-6">
                2022年東大合格者の皆様、
                <br />
                合格おめでとうございます！
              </p>
              <div className="my-4 lg:px-0 space-y-4 lg:space-y-0 leading-loose">
                <p>
                  UTmapでは、公式アカウントを起点として、東大生の生活をフルサポートするサービスを提供しています。
                </p>
                <p>
                  現役の東大生が運営しており、東大生の生活を豊かにするために日々取り組んでいます。
                </p>
                <p>
                  本ページでは、2022年東大合格者の皆様に向けて、厳選したお役立ち情報をまとめています。
                </p>
                <p>大学生活のはじめの一歩を全力サポートさせていただきます！</p>
                <p>
                  日々更新していくので、公式LINEとともに定期的にご確認ください。
                </p>
              </div>
              <div className="hidden lg:flex justify-end gap-8 text-center">
                <a
                  href={props.globalSetting?.utmapLineUrl ?? ""}
                  target="_blank"
                  rel="noreferrer"
                >
                  <QRCode
                    className="w-28 h-28 mb-2"
                    value={props.globalSetting?.utmapLineUrl ?? ""}
                    renderAs="svg"
                    fgColor="currentColor"
                    bgColor="none"
                  />
                  <p>公式LINE</p>
                </a>
                <a
                  href={props.globalSetting?.utmapTwitterUrl ?? ""}
                  target="_blank"
                  rel="noreferrer"
                >
                  <QRCode
                    className="w-28 h-28 mb-2"
                    value={props.globalSetting?.utmapTwitterUrl ?? ""}
                    renderAs="svg"
                    fgColor="currentColor"
                    bgColor="none"
                  />
                  <p>公式Twitter</p>
                </a>
              </div>
            </section>
          </div>
          <CherryBlossom className="mx-auto my-12 lg:hidden" />
          <Section
            id="specials-newcomers-2022-clubs"
            title="サークル"
            description="UTmapでは、東大の300以上のサークル・団体情報を掲載しています。先輩には聞きづらい会費のことや、内部の人の本音情報など詳細に書かれています。自分にぴったりなサークルに出会えること間違いなし。"
            image={clubsImage}
            linkTo="/clubs"
            nonPrimaryArticles={props.specialsNewcomers2022Config?.highlightedClubs.map(
              (club) => ({
                id: club.id,
                linkTo:
                  club.__typename === "ClubRecord"
                    ? `/clubs/${club.id}`
                    : `/static/${club.slug}`,
                title: club.name,
                responsiveImage:
                  club.__typename === "ClubRecord"
                    ? club.images[0].responsiveImage
                    : club.image?.responsiveImage,
              })
            )}
            align="left"
          />
          <CherryBlossom className="mx-auto my-12 lg:hidden" />
          <Section
            id="specials-newcomers-2022-seminar-week"
            title="セミナーWeek"
            description="履修・留学・プログラミング入門・ゼミやサークル立ち上げなど、サークル以外の諸活動に関して経験者の先輩から実用的なアドバイスを受けることが可能です。最高の大学生活を送りたい方は是非！"
            image={seminarWeekImage}
            align="right"
            linkTo={`/static/${props.specialsNewcomers2022Config?.seminarWeekStaticPage?.slug}`}
            nonPrimaryArticles={props.specialsNewcomers2022Config?.seminarWeekNonPrimaryStaticPages.map(
              (article) => ({
                id: article.id,
                linkTo: `/static/${article.slug}`,
                title: article.title,
                responsiveImage: article.image?.responsiveImage,
              })
            )}
          />
          <CherryBlossom className="mx-auto my-12 lg:hidden" />
          <Section
            id="specials-newcomers-2022-courses"
            title="履修情報"
            description="日本最高峰の東大の授業に関係する履修情報を詳細に掲載しています。科類ごとにまとめた履修の組み方やLINEでの時間割管理など、これを閲覧すれば皆さんは履修に関する情報戦は勝利出来ます。"
            image={coursesImage}
            align="left"
            linkTo={`/static/${props.specialsNewcomers2022Config?.coursesStaticPage?.slug}`}
            nonPrimaryArticles={props.specialsNewcomers2022Config?.coursesNonPrimaryStaticPages.map(
              (article) => ({
                id: article.id,
                linkTo: `/static/${article.slug}`,
                title: article.title,
                responsiveImage: article.image?.responsiveImage,
              })
            )}
            afterTextBox={
              <Attachment
                title="時間割情報"
                description="毎日利用するLINEで授業情報を管理できる便利なサービスです。UTmap限定のクラス時間割コードを入力するだけで時間割共有ができます。また、東大の公式シラバスから授業情報を読み込むことで、授業登録も簡単です！"
                image={coursesLineAppImage}
                anchorText="→ 公式LINE登録はこちら！"
                anchorLinkTo={props.globalSetting?.utmapLineUrl ?? ""}
                align="left"
                className="mt-4 max-w-screen-md lg:w-[32rem] lg:ml-auto"
              />
            }
          />
          <CherryBlossom className="mx-auto my-12 lg:hidden" />
          <Section
            id="specials-newcomers-2022-parttime-jobs"
            title="アルバイト情報"
            description="大学生活の中で誰しも経験するであろうアルバイト。ここでは「東大生のバイト」という観点から、塾講師といったおすすめのアルバイト情報を掲載しています。"
            image={partTimeJobsImage}
            align="right"
            linkTo={`/static/${props.specialsNewcomers2022Config?.parttimeJobsStaticPage?.slug}`}
            nonPrimaryArticles={props.specialsNewcomers2022Config?.parttimeJobsNonPrimaryStaticPages.map(
              (article) => ({
                id: article.id,
                linkTo: `/static/${article.slug}`,
                title: article.title,
                responsiveImage: article.image?.responsiveImage,
              })
            )}
            className="lg:mt-8"
          />
          <CherryBlossom className="mx-auto my-12 lg:hidden" />
          <Section
            id="specials-newcomers-2022-certifications"
            title="資格塾情報"
            description="司法試験や公認会計士など、難関資格取得を目指す東大生をサポートする資格塾に関する情報を掲載しています。こういった資格に興味がある、受ける予定の新入生におすすめしたい資格塾の記事です！"
            image={certificationsImage}
            align="left"
            linkTo={`/static/${props.specialsNewcomers2022Config?.certificationsStaticPage?.slug}`}
            nonPrimaryArticles={props.specialsNewcomers2022Config?.certificationsNonPrimaryStaticPages.map(
              (article) => ({
                id: article.id,
                linkTo: `/static/${article.slug}`,
                title: article.title,
                responsiveImage: article.image?.responsiveImage,
              })
            )}
          />
          <CherryBlossom className="mx-auto my-12 lg:hidden" />
          <Section
            id="specials-newcomers-2022-restaurants"
            title="東大ご飯"
            description="主に駒場キャンパスの周辺の飲食店を特集した記事です。これで駒場近くの飲食店通になれること間違いなし！UTmap限定のクーポンや食べ放題も要チェックです！"
            image={restaurantsImage}
            align="right"
            linkTo={`/static/${props.specialsNewcomers2022Config?.restaurantsStaticPage?.slug}`}
            nonPrimaryArticles={props.specialsNewcomers2022Config?.restaurantsNonPrimaryStaticPages.map(
              (article) => ({
                id: article.id,
                linkTo: `/static/${article.slug}`,
                title: article.title,
                responsiveImage: article.image?.responsiveImage,
              })
            )}
          />
          <div className="contents lg:flex lg:justify-start">
            <Attachment
              title="LINEクーポン"
              description="駒場・下北沢・渋谷周辺の飲食店のクーポンをLINEで月に一回配信しています。LINE登録後クーポン獲得で美味しいお店のメニューをお得に食べることが出来ます！クーポンを受け取りたい方はLINEへ！"
              image={lineCouponImage}
              anchorText="→ 公式LINE登録はこちら！"
              anchorLinkTo={props.globalSetting?.utmapLineUrl ?? ""}
              align="right"
              className="mt-4 max-w-screen-md lg:w-[28rem] lg:flex-none"
            />
            <Attachment
              title="100食限定！食べ放題"
              description="「100食限定で食べ放題」という非常にお得な企画をやっています。売り切れる前に、LINEクーポンと合わせて是非ご利用ください！"
              image={foodCouponImage}
              anchorText="→ 応募はこちら！"
              anchorLinkTo={`/static/${props.specialsNewcomers2022Config?.allYouCanEatStaticPage?.slug}`}
              align="left"
              className="mt-4 max-w-screen-md ml-auto lg:w-[28rem] lg:mt-12 lg:ml-8 lg:flex-none"
            />
          </div>
        </div>
        <div className="bg-yellow-50 px-4">
          <div className="relative max-w-screen-lg mx-auto">
            <CherryBlossomFrameEdge
              className="absolute top-5 left-0"
              position="topLeft"
            />
            <CherryBlossomFrameEdge
              className="absolute bottom-5 right-0"
              position="bottomRight"
            />
            <div className="relative flex gap-6 md:gap-12 px-4 md:py-0 sm:px-16">
              <div className="md:hidden flex-none self-center w-24">
                <Image layout="responsive" src={lineBannerSpImage} />
              </div>
              <div className="hidden md:block flex-none self-end w-5/12 mt-8">
                <Image layout="responsive" src={lineBannerPcImage} />
              </div>
              <div className="self-center py-8">
                <p className="text-md md:text-2xl mb-2">
                  公式LINE登録で限定情報にアクセス
                </p>
                <div className="mb-2 text-sm md:text-md leading-relaxed">
                  <p>
                    UTmapでは、公式LINEアカウントを通して東大生向けの限定情報を配信しております。
                  </p>
                  <p>
                    また、時間割やクーポン、おすすめインタビュー記事の紹介など東大生の生活を彩る様々な機能を提供しております。
                  </p>
                  <p className="hidden lg:block">
                    より快適で充実した学生生活に向けてぜひご登録ください。
                  </p>
                </div>
                <CtaActionButton
                  href={props.globalSetting?.utmapLineUrl ?? ""}
                  className="text-sm"
                >
                  <span className="hidden lg:inline">公式</span>LINE登録はこちら
                </CtaActionButton>
              </div>
            </div>
          </div>
        </div>
        <div id="specials-newcomers-2022-magazine-utmap" className="bg-red-200">
          <div className="flex flex-col md:flex-row md:items-center md:gap-8 py-12 px-8 max-w-screen-lg mx-auto">
            <div className="flex-none w-56 h-80 mx-auto mb-8 md:mb-0 bg-gray-200" />
            <div className="contents md:block">
              <p className="order-first mb-8 text-center text-xl md:text-3xl md:text-left">
                新歓情報誌 “UTmap”
              </p>
              <div className="mb-8 text-sm md:text-lg leading-relaxed">
                <p>
                  サークル・駒場周辺の飲食店特集・東大に関するコラムなどをまとめた一冊の冊子です。
                </p>
                <p>
                  「東大生活をこれ一つで」を体現した、豊富なコンテンツで構成されています。紙媒体での配布も行っている他、LINE登録でデータ版のダウンロードも実施しております。
                </p>
              </div>
              <div>
                <CtaActionButton
                  href={props.globalSetting?.utmapLineUrl ?? ""}
                  className="mb-4"
                >
                  <div className="flex items-center gap-4">
                    <BsDownload className="w-8 h-8" />
                    データ版をダウンロード
                  </div>
                </CtaActionButton>
                <p className="text-center text-xs">
                  LINE登録でダウンロード可能になります
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const queryResult = await apolloClient.query<NewComers2022PageQuery>({
    query: gql`
      ${responsiveImageFragment}
      ${layoutSeoFragment}
      fragment Newcomers2022PageQueryStaticPageFragment on StaticPageRecord {
        id
        slug
        title
        image {
          responsiveImage(imgixParams: { fit: crop, w: 300, h: 200 }) {
            ...ResponsiveImageFragment
          }
        }
      }
      query NewComers2022PageQuery {
        specialsNewcomers2022Config {
          seo {
            ...LayoutSeoFragment
          }
          highlightedClubs {
            ... on ClubRecord {
              id
              name
              images {
                responsiveImage(imgixParams: { fit: crop, w: 300, h: 200 }) {
                  ...ResponsiveImageFragment
                }
              }
            }
            ... on StaticPageRecord {
              id
              name: title
              slug
              image {
                responsiveImage(imgixParams: { fit: crop, w: 300, h: 200 }) {
                  ...ResponsiveImageFragment
                }
              }
            }
          }
          seminarWeekStaticPage {
            ...Newcomers2022PageQueryStaticPageFragment
          }
          seminarWeekNonPrimaryStaticPages {
            ...Newcomers2022PageQueryStaticPageFragment
          }
          coursesStaticPage {
            ...Newcomers2022PageQueryStaticPageFragment
          }
          coursesNonPrimaryStaticPages {
            ...Newcomers2022PageQueryStaticPageFragment
          }
          parttimeJobsStaticPage {
            ...Newcomers2022PageQueryStaticPageFragment
          }
          parttimeJobsNonPrimaryStaticPages {
            ...Newcomers2022PageQueryStaticPageFragment
          }
          certificationsStaticPage {
            ...Newcomers2022PageQueryStaticPageFragment
          }
          certificationsNonPrimaryStaticPages {
            ...Newcomers2022PageQueryStaticPageFragment
          }
          restaurantsStaticPage {
            ...Newcomers2022PageQueryStaticPageFragment
          }
          restaurantsNonPrimaryStaticPages {
            ...Newcomers2022PageQueryStaticPageFragment
          }
          allYouCanEatStaticPage {
            ...Newcomers2022PageQueryStaticPageFragment
          }
        }
        globalSetting {
          utmapTwitterUrl
          utmapLineUrl
        }
      }
    `,
  });
  return { props: queryResult.data, revalidate: 30 };
}
