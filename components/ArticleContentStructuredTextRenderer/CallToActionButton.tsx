import { gql } from "@apollo/client";
import { ArticleContentStructuredTextCallToActionButtonFragment } from "../../__generated__/ArticleContentStructuredTextCallToActionButtonFragment";

export const articleContentStructuredTextCallToActionButtonFragment = gql`
  fragment ArticleContentStructuredTextCallToActionButtonFragment on CallToActionButtonRecord {
    id
    title
    url
  }
`;

export default function ArticleContentStructuredTextCallToActionButton({
  fragment,
}: {
  fragment: ArticleContentStructuredTextCallToActionButtonFragment;
}) {
  return (
    <a
      href={fragment.url ?? undefined}
      target="_blank"
      rel="noreferrer"
      className="block max-w-sm mx-auto p-3 bg-primary-main hover:bg-primary-400 text-white text-center"
    >
      {fragment.title}
    </a>
  );
}
