import { ollama } from "../config/ollama.js";
import { es, INDEX_NAME } from "../config/elastic.js";

export async function semanticSearch(query, top_k = 5) {
  const response = await ollama.embeddings({
    model: "nomic-embed-text",
    prompt: query,
  });

  const queryVector = response.embedding;

  const results = await es.search({
    index: INDEX_NAME,
    size: top_k,
    query: {
      script_score: {
        query: { match_all: {} },
        script: {
          source: "cosineSimilarity(params.query_vector, 'embedding') + 1.0",
          params: { query_vector: queryVector },
        },
      },
    },
  });

  return results.hits.hits.map((hit) => hit._source);
}

export async function getPropertyById(propertyId) {
  const result = await es.search({
    index: INDEX_NAME,
    size: 1,
    query: {
      term: { propertyId: propertyId },
    },
  });

  if (result.hits.hits.length > 0) {
    const { embedding, ...sanitizedSource } = result.hits.hits[0]._source;
    return sanitizedSource;
  }
  return null;
}
