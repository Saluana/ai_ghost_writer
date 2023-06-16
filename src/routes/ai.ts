import { generateIdeas } from "../controllers/ai/idea_gen";
import { generateOutline } from "../controllers/ai/outline_gen";
import { createArticleSections } from "../controllers/ai/section_writer";
import { Router } from "express";

const router = Router();

router.post("/article_ideas", generateIdeas);
router.post("/article_outline", generateOutline);
router.post("/article_sections", createArticleSections);

export default router;
