import Link from "next/link";
import { staticData } from "../__generated_data__/static";

export default function Banners() {
  return (
    <>
      {staticData.allBanners.length > 0 && (
        <div className="w-full overflow-x-auto bg-black">
          <div className="flex mx-auto w-max p-4 space-x-6 md:p-6 md:space-x-10">
            {staticData.allBanners.map((banner) => (
              <>
                <Link href={banner.link ?? ""}>
                  <a className="flex-none">
                    <img
                      src={banner.image?.url ?? ""}
                      alt={banner.image.alt ?? ""}
                      className="h-16 md:h-20"
                    />
                  </a>
                </Link>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
