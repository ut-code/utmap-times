/* eslint-disable react/no-array-index-key */
import { StructuredText, StructuredTextDocument } from "react-datocms";
import { ArticleContentPersonAndStatementFragment } from "../../__generated__/ArticleContentPersonAndStatementFragment";
import { ArticleContentStructuredTextArticleGalleryFragment } from "../../__generated__/ArticleContentStructuredTextArticleGalleryFragment";
import { ArticleContentStructuredTextEmbeddedImageFragment } from "../../__generated__/ArticleContentStructuredTextEmbeddedImageFragment";
import { ArticleContentStructuredTextEmbeddedVideoFragment } from "../../__generated__/ArticleContentStructuredTextEmbeddedVideoFragment";
import RichTextStyleProvider from "../RichTextStyleProvider";
import ArticleContentStructuredTextArticleGallery from "./ArticleGallery";
import ArticleContentStructuredTextEmbeddedVideo from "./EmbeddedVideo";
import ArticleContentStructuredTextEmbeddedImage from "./EmbeddedImage";
import ArticleContentPersonAndStatement from "./PersonAndStatement";

// TypeScriptの制限でinterfaceで定義された値はindex signatureを持つ型として使用できない
// https://github.com/microsoft/TypeScript/issues/15300#issuecomment-816859086
type IndexSignatureHack<T> = { [P in keyof T]: T[P] };

export type ArticleContentStructuredTextBlockFragment = IndexSignatureHack<
  | ArticleContentStructuredTextArticleGalleryFragment
  | ArticleContentStructuredTextEmbeddedVideoFragment
  | ArticleContentStructuredTextEmbeddedImageFragment
  | ArticleContentPersonAndStatementFragment
>;

export type ArticleContentStructuredText = {
  value: StructuredTextDocument;
  blocks: ArticleContentStructuredTextBlockFragment[];
};

type StructuredTextRootCustomBlockFragment = {
  type: "CUSTOM_BLOCK";
  renderedElement: JSX.Element;
};
type StructuredTextRootTextFragment = {
  type: "TEXT";
  dastDocument: StructuredTextDocument;
};
type StructuredTextRootFragment =
  | StructuredTextRootCustomBlockFragment
  | StructuredTextRootTextFragment;

export default function ArticleContentStructuredTextRenderer(props: {
  structuredText: ArticleContentStructuredText | null | undefined;
}) {
  const { structuredText } = props;
  if (!structuredText) return <></>;

  const rootFragments: StructuredTextRootFragment[] = [];
  const appendTextFragmentIfNecessaryAndGetLastOne = () => {
    const lastFragment: StructuredTextRootFragment | undefined =
      rootFragments[rootFragments.length - 1];
    if (lastFragment && lastFragment.type === "TEXT") return lastFragment;
    const newFragment: StructuredTextRootFragment = {
      type: "TEXT",
      dastDocument: {
        schema: "dast",
        document: { type: "root", children: [] },
      },
    };
    rootFragments.push(newFragment);
    return newFragment;
  };
  structuredText.value.document.children.forEach((rootNode) => {
    if (rootNode.type !== "block") {
      const lastTextFragment = appendTextFragmentIfNecessaryAndGetLastOne();
      lastTextFragment.dastDocument.document.children.push(rootNode);
      return;
    }
    const blockDefinition = structuredText.blocks.find(
      (block) => block.id === rootNode.item
    );
    if (!blockDefinition)
      throw new Error("Missing structured text block definition.");
    switch (blockDefinition.__typename) {
      case "ArticleGalleryRecord":
        rootFragments.push({
          type: "CUSTOM_BLOCK",
          renderedElement: (
            <ArticleContentStructuredTextArticleGallery
              fragment={blockDefinition}
            />
          ),
        });
        return;
      case "EmbeddedVideoRecord":
        rootFragments.push({
          type: "CUSTOM_BLOCK",
          renderedElement: (
            <ArticleContentStructuredTextEmbeddedVideo
              fragment={blockDefinition}
            />
          ),
        });
        return;
      case "EmbeddedImageRecord":
        rootFragments.push({
          type: "CUSTOM_BLOCK",
          renderedElement: (
            <ArticleContentStructuredTextEmbeddedImage
              fragment={blockDefinition}
            />
          ),
        });
        return;
      case "PersonAndStatementRecord":
        rootFragments.push({
          type: "CUSTOM_BLOCK",
          renderedElement: (
            <ArticleContentPersonAndStatement fragment={blockDefinition} />
          ),
        });
        return;
      default:
        throw new Error(
          // @ts-expect-error Unexpected block type
          `Unexpected block type: ${blockDefinition.__typename}`
        );
    }
  });

  return (
    <>
      {rootFragments.map((fragment, i) =>
        fragment.type === "TEXT" ? (
          <RichTextStyleProvider key={i}>
            <StructuredText data={fragment.dastDocument} />
          </RichTextStyleProvider>
        ) : (
          <div className="my-8" key={i}>
            {fragment.renderedElement}
          </div>
        )
      )}
    </>
  );
}
