import Redis from "ioredis";

const url = process.env.REDIS_URL;
if(!url)
{
    throw new Error("Environment variables not configured");
}

export const redis = new Redis(url);
