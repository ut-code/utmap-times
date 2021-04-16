import { gql } from "@apollo/client";
import clsx from "clsx";
import { StructuredText } from "react-datocms";
import styled from "styled-components";
import { ArticleContentPersonAndStatementFragment } from "../../__generated__/ArticleContentPersonAndStatementFragment";
import RichTextStyleProvider from "../RichTextStyleProvider";

export const articleContentPersonAndStatementFragment = gql`
  fragment ArticleContentPersonAndStatementFragment on PersonAndStatementRecord {
    id
    team
    person {
      id
      name
      avatar {
        id
        alt
        url(imgixParams: { maxW: 100 })
      }
    }
    statement {
      value
    }
  }
`;

const Root = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
`;

const FullWidthRichTextStyleProvider = styled(RichTextStyleProvider)`
  grid-column: 1 / -1;
`;

export default function ArticleContentPersonAndStatement({
  fragment,
}: {
  fragment: ArticleContentPersonAndStatementFragment;
}) {
  return (
    <Root className="items-center md:items-start">
      <img
        alt={fragment.person?.avatar?.alt ?? ""}
        src={fragment.person?.avatar?.url}
        className={clsx(
          "inline-block w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mr-4 lg:mr-6 border-4 rounded-full object-cover",
          fragment.team === 1 ? "border-primary-main" : "border-secondary-main"
        )}
      />
      <div className="contents md:block">
        <p
          className={clsx(
            "inline-block font-sans font-bold text-xl lg:text-2xl",
            fragment.team === 1 ? "text-primary-main" : "text-secondary-main"
          )}
        >
          {fragment.person?.name}
        </p>
        <FullWidthRichTextStyleProvider>
          <StructuredText data={fragment.statement?.value} />
        </FullWidthRichTextStyleProvider>
      </div>
    </Root>
  );
}
