import express from "express";
import { answerQuery } from "../services/qaService.js";

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

export default router;
