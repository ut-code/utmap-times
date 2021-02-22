import Hero from "../../components/Hero";
import Layout from "../../components/Layout";

export default function NewsArticleIndexPage() {
  return (
    <Layout title="ニュース">
      <Hero image="https://picsum.photos/800/600" className="p-40">
        <h1 className="text-3xl">ニュース</h1>
      </Hero>
    </Layout>
  );
}
