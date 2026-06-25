import "server-only";

import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "palentrix";

declare global {
  // eslint-disable-next-line no-var
  var __palentrixMongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured() {
  return Boolean(uri);
}

export async function getMongoDb(): Promise<Db> {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!globalThis.__palentrixMongoClientPromise) {
    const client = new MongoClient(uri);
    globalThis.__palentrixMongoClientPromise = client.connect();
  }

  const client = await globalThis.__palentrixMongoClientPromise;
  return client.db(dbName);
}
