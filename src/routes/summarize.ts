import { Router } from "express";
import { summarizeUrl, summarizeText } from "../controllers/research/summarize";

const router = Router();

router.post("/url", summarizeUrl);
router.post("/", summarizeText);

export default router;
