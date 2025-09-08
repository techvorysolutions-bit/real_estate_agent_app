import fs from "fs";
import csv from "csv-parser";
import { ollama } from "../config/ollama.js";
import { es, INDEX_NAME } from "../config/elastic.js";

const CSV_PATH = "real_estate_main.csv";

export async function createIndex() {
  const exists = await es.indices.exists({ index: INDEX_NAME });

  console.log("Index exists check:", exists);

  if (!exists) {
    await es.indices.create({
      index: INDEX_NAME,
      body: {
        mappings: {
          properties: {
            propertyId: { type: "long" },
            name: { type: "text" },
            summary: { type: "text" },
            price: { type: "float" },
            city: { type: "keyword" },
            location: { type: "keyword" },
            embedding: {
              type: "dense_vector",
              dims: 768,
            },
          },
        },
      },
    });
    console.log(`Index ${INDEX_NAME} created`);
  } else {
    console.log(`Index ${INDEX_NAME} already exists`);
  }

  return exists;
}

export async function indexData() {
  return new Promise((resolve) => {
    const rows = [];
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", async () => {
        for (const row of rows) {
          const summaryText = `${row.Name}, Price: ${row.Price}, Location: ${row.location}, City: ${row.city}, Area: ${row.carpet_area_sqft} sqft, Bedrooms: ${row.bedroom}, Status: ${row.status}`;

          const response = await ollama.embeddings({
            model: "nomic-embed-text",
            prompt: summaryText,
          });

          const vector = response.embedding;

          const doc = {
            propertyId: row.PropId,
            name: row.Name,
            summary: summaryText,
            price: parseFloat(row.Price),
            city: row.city,
            location: row.location,
            embedding: vector,
          };

          await es.index({ index: INDEX_NAME, document: doc });
        }
        console.log("CSV data indexed successfully!");
        resolve();
      });
  });
}
