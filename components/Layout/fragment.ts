import { gql } from "@apollo/client";

const layoutSeoFragment = gql`
  fragment LayoutSeoFragment on SeoField {
    description
    image {
      url
    }
    title
    twitterCard
  }
`;

export default layoutSeoFragment;
