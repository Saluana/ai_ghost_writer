import { Router } from "express";
import { search } from "../controllers/research/search";
const router = Router();

router.post("/", search);

export default router;
