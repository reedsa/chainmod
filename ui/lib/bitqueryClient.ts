import { GraphQLClient } from "graphql-request";

const API_ENDPOINT = "https://streaming.bitquery.io/graphql";
const API_KEY = process.env.BITQUERY_API_KEY;

export const bitqueryClient = new GraphQLClient(API_ENDPOINT, {
  headers: {
    authorization: `Bearer ${API_KEY}`,
  },
});
