import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { getPlan } from "../plan.js";

export const checkLimit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { apiKey } = req.body;

    if (!apiKey) {
      throw new ApiError(400, "apiKey is required");
    }

    const plan = await getPlan(apiKey);

    if (!plan) {
      throw new ApiError(404, "Plan not found");
    }

    return res.json(new ApiResponse(true, plan));
  } catch (err) {
    next(err);
  }
};
