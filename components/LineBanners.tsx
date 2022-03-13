import Image from "next/image";
import Link from "next/link";
import Line1Image from "../public/images/line-1.png";
import Line2Image from "../public/images/line-2.png";

export default function LineBanners() {
  return (
    <div className="bg-gray-100 px-2 md:px-12 grid xs:grid-cols-2 md:grid md:grid-cols-4 xl:grid-cols-4">
      <div>
        <Image height={894} width={460} src={Line2Image} />
      </div>
      <div>
        <Image height={894} width={460} src={Line1Image} />
      </div>
      <div className="col-span-2 pl-6 md:py-4">
        <p className="text-secondary-main font-bold pt-8 text-2xl">
          公式LINE登録で限定情報にアクセス
        </p>
        <div className="grid grid-cols-3 text-sm pb-4">
          <div className="col-span-2 pt-8">
            <p>UTmapでは、公式 LINEアカウントを通して</p>
            <p>東大生向けの限定情報を配信しております。</p>
            <p>時間割やクーポンなど、東大生の生活を彩る</p>
            <p>様々な機能を提供しております</p>
            <p>お見逃しなく!</p>
          </div>
          <Image height={1020} width={1800} src="/images/line-image.png" />
        </div>
        <Link href="https://lin.ee/oYnl12K">
          <a className="inline-block w-full text-center px-12 py-3 m-4 text-sm font-bold bg-primary-main text-white">
            公式LINE登録はこちら
          </a>
        </Link>
      </div>
    </div>
  );
}
