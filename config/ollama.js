import ollama from "ollama";

ollama.host = process.env.OLLAMA_HOST || "http://localhost:11434";

export { ollama };