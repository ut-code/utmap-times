import styled, { css } from "styled-components";

export const h1Css = css`
  padding: 0.2rem 0.5rem;
  border-bottom: 0.2rem solid var(--color-secondary-main);
  font-size: 2rem;
  font-weight: bold;
`;

export const H1 = styled.h1`
  ${h1Css}
`;

export const h2Css = css`
  padding: 0.6rem 1rem;
  background-color: #eee;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const H2 = styled.h2`
  ${h2Css}
`;

export const h3Css = css`
  border-left: 0.3rem solid var(--color-secondary-main);
  padding: 0.2rem 0.6rem;
  font-weight: bold;
`;

export const H3 = styled.h3`
  ${h2Css}
`;
