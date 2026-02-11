import Redis from "ioredis";

const url = process.env.REDIS_URL;

if (!url) {
  throw new Error("REDIS_URL not configured");
}

export const redis = new Redis(url);

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});
