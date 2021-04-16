import styled from "styled-components";

export default styled.div`
  h1 {
    margin: 2rem 0 1rem 0;
    padding: 0.2rem 0.5rem;
    border-bottom: 0.2rem solid var(--color-secondary-main);
    font-size: 2rem;
    font-weight: bold;
  }
  h2 {
    margin: 1rem 0;
    padding: 0.6rem 1rem;
    background-color: #eee;
    font-size: 1.2rem;
    font-weight: bold;
  }
  h3 {
    border-left: 0.3rem solid var(--color-secondary-main);
    padding: 0.2rem 0.6rem;
    font-weight: bold;
  }
  ul,
  ol {
    margin: 1rem 0;
    padding-left: 2rem;
    ul,
    ol,
    p {
      margin: 0;
    }
  }
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
  li {
    padding-left: 0.3rem;
  }
  table {
    width: 100%;
  }
  td {
    padding: 0.5rem;
    border: 1px solid #555;
  }
  blockquote {
    margin: 2rem 0;
    padding: 0.5rem 2rem;
    background-color: #f6f6f6;
    box-shadow: 0 0 0.2rem #aaa;
    font-style: italic;
  }
  pre {
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid #aaa;
  }
  hr {
    margin: 2rem 0;
  }
  p {
    margin: 1rem 0;
    line-height: 1.8rem;
  }
  img {
    max-height: 500px;
    margin: 2rem auto;
  }
  a {
    color: var(--color-secondary-main);
    text-decoration: underline;
  }
`;
