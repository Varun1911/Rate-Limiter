import { Router } from "express";
import { checkLimit } from "../controllers/limiter.controller.js";

const router = Router();

router.post("/check", checkLimit);

export default router;