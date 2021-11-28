import Link from "next/link";
import { useRouter } from "next/router";
import { staticData } from "../__generated_data__/static";
import Carousel from "./Carousel";

export default function Banners() {
  const router = useRouter();
  if (staticData.allBanners.length === 0) return null;

  return (
    <div className="w-full py-4 bg-black">
      <Carousel
        cardMaxWidthClassName="max-w-xs lg:max-w-md"
        disableArrowButton
        disableIndicator
        disableBrightnessControl
        aspectRatio={5 / 1}
        cards={staticData.allBanners
          .filter((banner) => {
            const pattern = new RegExp(banner.pathPattern);
            return router.pathname.match(pattern);
          })
          .map((banner) => ({
            key: banner.id,
            content: (
              <Link href={banner.link ?? ""}>
                <a className="block w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    alt={banner.image.alt ?? ""}
                    src={banner.image.url ?? ""}
                  />
                </a>
              </Link>
            ),
          }))}
      />
    </div>
  );
}
