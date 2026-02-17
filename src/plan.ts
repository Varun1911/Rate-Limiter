import { getRedis } from "./redis.js";

export interface Plan {
  limit: number;
  windowSeconds: number;
}

export const getPlan = async (apiKey: string): Promise<Plan | null> => {
  const redis = getRedis();
  const raw = await redis.get(`plan:${apiKey}`);
  if (!raw) return null;

  return JSON.parse(raw) as Plan;
};
