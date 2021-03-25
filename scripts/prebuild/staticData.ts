/* eslint-disable import/no-extraneous-dependencies */
import { gql } from "@apollo/client";
import { writeFileSync, mkdirSync } from "fs";
import apolloClient from "../../utils/apollo";
import { PrebuiltStaticDataQuery } from "../../__generated__/PrebuiltStaticDataQuery";

(async () => {
  const { data } = await apolloClient.query<PrebuiltStaticDataQuery>({
    query: gql`
      query PrebuiltStaticDataQuery {
        allBanners(first: 100) {
          id
          image {
            id
            alt
            url
          }
          link
        }
      }
    `,
  });
  mkdirSync("./__generated_data__", { recursive: true });
  writeFileSync(
    "./__generated_data__/static.ts",
    `export const staticData = ${JSON.stringify(data)}`
  );
})();
