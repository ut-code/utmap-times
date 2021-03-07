import sanitize, { IOptions, defaults } from "sanitize-html";
import marked from "marked";
import styled from "styled-components";

const sanitizeOptions: IOptions = {
  allowedTags: [...defaults.allowedTags, "img"],
};

const Container = styled.div`
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  p {
    padding: 1rem 0;
    line-height: 1.9rem;
  }
  table {
    width: 100%;
  }
  td {
    padding: 0.5rem;
    border: 1px solid #555;
  }
  img {
    max-height: 500px;
    margin: auto;
  }
`;

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
    <Container
      className={props.className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
