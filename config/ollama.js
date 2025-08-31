import { Ollama } from "ollama";

const ollama = new Ollama({
  host: process.env.OLLAMA_API_BASE || "http://ollama:11434"
});

console.log("Ollama client connecting to:", ollama.host);

export { ollama };