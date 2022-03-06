import { gql } from "@apollo/client";
import { Image } from "react-datocms";
import {
  normalizeResponsiveImage,
  responsiveImageFragment,
} from "../../utils/datocms";
import { ArticleContentStructuredTextEmbeddedImageFragment } from "../../__generated__/ArticleContentStructuredTextEmbeddedImageFragment";

export const articleContentStructuredTextEmbeddedImageFragment = gql`
  ${responsiveImageFragment}
  fragment ArticleContentStructuredTextEmbeddedImageFragment on EmbeddedImageRecord {
    id
    image {
      id
      responsiveImage(imgixParams: { fit: max, w: 800, h: 400, auto: format }) {
        ...ResponsiveImageFragment
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
    <div className="text-center">
      {fragment.image?.responsiveImage && (
        <Image
          fadeInDuration={100}
          data={normalizeResponsiveImage(fragment.image.responsiveImage)}
          className="mx-auto"
        />
      )}
    </div>
  );
}
