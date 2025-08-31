// config/elastic.js
import { Client } from '@elastic/elasticsearch';

export const INDEX_NAME = "real_estate_properties";
const ES_HOST = process.env.ES_HOST || 'http://elasticsearch:9200';

let es; // singleton client

export async function createClient() {
  if (es) return es;

  let retries = 10;
  while (retries) {
    try {
      es = new Client({ node: ES_HOST });
      await es.ping();
      console.log("✅ Connected to Elasticsearch");
      return es;
    } catch (err) {
      console.error("❌ Elasticsearch not ready, retrying in 5s...");
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  throw new Error("Elasticsearch not reachable after retries");
}

es = await createClient();

export { es }; 
