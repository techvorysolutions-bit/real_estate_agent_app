import ollama from "ollama";
import { semanticSearch } from "./searchService.js";

export async function answerQuery(query) {
  const docs = await semanticSearch(query, 5);
  const context = docs.map((d) => `- ${d.summary}`).join("\n");

  const prompt = `
  You are a real estate assistant. 
  User asked: "${query}"

  Here are the most relevant properties:
  ${context}

  Please give a helpful summarized answer to the user.
  `;

  const response = await ollama.chat({
    model: "gpt-oss:20b",
    messages: [{ role: "user", content: prompt }],
  });

  return {
    answer: response.message.content,
  };
}
