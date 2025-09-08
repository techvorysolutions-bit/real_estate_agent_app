import express from "express";
import { answerQuery } from "../services/qaService.js";
import { getPropertyById } from "../services/searchService.js";

const router = express.Router();

router.post("/query", async (req, res) => {
  const { query } = req.body;
  try {
    const result = await answerQuery(query);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/property/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const property = await getPropertyById(Number(id));
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
