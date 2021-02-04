const path = require("path");
require("dotenv").config({ path: ".env.local" });

/** @type {import('apollo').ApolloConfig} */
module.exports = {
  client: {
    includes: ["./pages/**/*"],
    service: {
      name: "CMS",
      url: process.env.GRAPHQL_ENDPOINT,
      headers: {
        Authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
      },
    },
  },
};
