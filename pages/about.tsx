import ArticleContentContainer from "../components/ArticleContentContainer";
import Banners from "../components/Banners";
import Hero from "../components/Hero";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout title="What is UTmap">
      <Hero image="/images/utmap.png">
        <h1 className="text-4xl p-32">What is UTmap</h1>
      </Hero>
      <Banners />
      <ArticleContentContainer className="py-16 leading-loose text-2xl">
        <p>
          東大生が、より良い人生を切り開き、より良い未来をつくるために、東大生活を歩む「地図」を授けたい。
        </p>
        <p>
          UTmap（ユー・ティー・マップ）は、東大生による東大生のためのキャリアプラットフォームとして、東大生のキャリアに大きな影響をもたらす「サークル」「進振り」「就活」という３つの意思決定をサポートします。
        </p>
        <p>UTmapが総力を挙げて取材・編集したコンテンツをご活用ください。</p>
      </ArticleContentContainer>
    </Layout>
  );
}
