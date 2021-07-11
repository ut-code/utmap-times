/* eslint-disable react/jsx-props-no-spreading */
import { memo } from "react";
import { compiler } from "markdown-to-jsx";
import Link from "next/link";
import RichTextStyleProvider from "./RichTextStyleProvider";
import { isExternalUrl } from "../utils/string";

function CustomAnchor(props: JSX.IntrinsicElements["a"]) {
  const { children, href, ...rest } = props;

  if (href && !isExternalUrl(href)) {
    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noreferrer" href={href} {...rest}>
      {children}
    </a>
  );
}

function RichTextRenderer(props: { markdown: string; className?: string }) {
  return (
    <RichTextStyleProvider className={props.className}>
      {compiler(props.markdown, {
        disableParsingRawHTML: true,
        overrides: { a: CustomAnchor },
      })}
    </RichTextStyleProvider>
  );
}

export default memo(RichTextRenderer);
