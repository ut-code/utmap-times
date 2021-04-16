import sanitize, { IOptions, defaults } from "sanitize-html";
import marked from "marked";
import RichTextStyleProvider from "./RichTextStyleProvider";

const sanitizeOptions: IOptions = {
  allowedTags: [...defaults.allowedTags, "img"],
};

export default function RichTextRenderer(props: {
  html?: string;
  markdown?: string;
  className?: string;
}) {
  const sanitizedHtml = sanitize(
    props.html ??
      (props.markdown && marked(props.markdown, { breaks: true })) ??
      "",
    sanitizeOptions
  );
  // eslint-disable-next-line react/no-danger
  return (
    <RichTextStyleProvider
      className={props.className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
