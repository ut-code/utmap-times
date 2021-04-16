import { gql } from "@apollo/client";
import { ArticleContentStructuredTextEmbeddedVideoFragment } from "../../__generated__/ArticleContentStructuredTextEmbeddedVideoFragment";
import EmbeddedVideoPlayer from "../EmbeddedVideoPlayer";

export const articleContentStructuredTextEmbeddedVideoFragment = gql`
  fragment ArticleContentStructuredTextEmbeddedVideoFragment on EmbeddedVideoRecord {
    id
    title
    url
  }
`;

export default function ArticleContentStructuredTextEmbeddedVideo({
  fragment,
}: {
  fragment: ArticleContentStructuredTextEmbeddedVideoFragment;
}) {
  return (
    <EmbeddedVideoPlayer
      title={fragment.title ?? ""}
      src={fragment.url ?? ""}
    />
  );
}
