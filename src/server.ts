import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ---- Health ----
app.get("/health", (_: Request, res: Response) => {
  res.json({ status: "ok" });
});

const INTERNAL_SECRET = process.env.INTERNAL_SECRET;

if (!INTERNAL_SECRET) {
  throw new Error("INTERNAL_SECRET not configured");
}

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path === "/health") return next();

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${INTERNAL_SECRET}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
});

app.post("/check", async (req: Request, res: Response) => {
  res.json({ message: "not implemented yet" });
});

// ---- Error Handler ----
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  return res.status(500).json({ message: "Something went wrong" });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
