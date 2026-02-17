import Redis from "ioredis";

let redis: Redis | null = null;

export const getRedis = (): Redis => {
  if (!redis) {
    const url = process.env.REDIS_URL;
    if (!url) {
      throw new Error("REDIS_URL not configured");
    }

    redis = new Redis(url);

    redis.on("connect", () => console.log("Redis connected"));
    redis.on("ready", () => console.log("Redis ready"));
    redis.on("error", (err) =>
      console.error("Redis connection error:", err)
    );
  }

  return redis;
};