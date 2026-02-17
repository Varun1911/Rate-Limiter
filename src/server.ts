import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import limiterRoutes from "./routes/limiter.routes.js";
import { ApiError } from "./utils/ApiError";
import { ApiResponse } from "./utils/ApiResponse";

dotenv.config();

const app = express();
app.use(express.json());

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

app.use("/api/v1/limiter", limiterRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(new ApiResponse(false, undefined, undefined, err.message));
  }

  return res
    .status(500)
    .json(new ApiResponse(false, undefined, "Internal Server Error"));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
