import fs from "node:fs";
import path from "node:path";
import app from "./app";
import { logger } from "./lib/logger";

// Automatically load .env if present
const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(import.meta.dirname, "..", ".env"),
  path.resolve(import.meta.dirname, "..", "..", "..", ".env"),
];
for (const p of envCandidates) {
  if (fs.existsSync(p)) {
    try {
      if (typeof process.loadEnvFile === "function") {
        process.loadEnvFile(p);
      }
      break;
    } catch (e) {
      logger.warn({ err: e }, `Could not load env file from ${p}`);
    }
  }
}

const rawPort = process.env["PORT"] || "3000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
