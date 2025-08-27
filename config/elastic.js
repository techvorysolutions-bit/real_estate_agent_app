import { Client } from "@elastic/elasticsearch";

export const ES_HOST = process.env.ES_HOST;
export const INDEX_NAME = "real_estate_properties";

export const es = new Client({ node: ES_HOST });
