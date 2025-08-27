import express from "express";
import bodyParser from "body-parser";
import queryRoutes from "./routes/queryRoutes.js";
import { createIndex, indexData } from "./services/elasticService.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api", queryRoutes);

// Startup
(async () => {
  const exists = await createIndex();
  if (!exists) {
    await indexData();
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
