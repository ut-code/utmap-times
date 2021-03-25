const path = require("path");
require("dotenv").config({ path: ".env.local" });

/** @type {import('apollo').ApolloConfig} */
module.exports = {
  client: {
    includes: ["./pages/**/*"],
    service: {
      name: "CMS",
      url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`,
      },
    },
  },
};
