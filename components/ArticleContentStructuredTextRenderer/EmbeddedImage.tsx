import { gql } from "@apollo/client";
import { Image } from "react-datocms";
import { ArticleContentStructuredTextEmbeddedImageFragment } from "../../__generated__/ArticleContentStructuredTextEmbeddedImageFragment";

export const articleContentStructuredTextEmbeddedImageFragment = gql`
  fragment ArticleContentStructuredTextEmbeddedImageFragment on EmbeddedImageRecord {
    id
    image {
      id
      responsiveImage(imgixParams: { fit: max, h: 400, auto: format }) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        bgColor
        base64
      }
    }
  }
`;

export default function ArticleContentStructuredTextEmbeddedImage({
  fragment,
}: {
  fragment: ArticleContentStructuredTextEmbeddedImageFragment;
}) {
  return (
    <>
      {fragment.image?.responsiveImage && (
        <div className="text-center">
          <Image
            explicitWidth={fragment.image.responsiveImage.width}
            // Apolloが生成する型: string | null, 要求される型: string | undefined
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data={fragment.image.responsiveImage as any}
          />
        </div>
      )}
    </>
  );
}
