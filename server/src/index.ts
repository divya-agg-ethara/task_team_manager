import "dotenv/config";
import { createApp } from "./app";
import { env, API_PREFIX } from "./config";
import {
  connectDatabase,
  disconnectDatabase,
} from "./prisma/client";

async function bootstrap(): Promise<void> {
  await connectDatabase();

  const app = createApp();
  const host = "0.0.0.0";

  const server = app.listen(env.PORT, host, () => {
    console.log(
      `[server] ${env.NODE_ENV} — listening on ${host}:${env.PORT} (API ${API_PREFIX})`,
    );
  });

  const shutdown = async (signal: string) => {
    console.log(`[server] ${signal} received — shutting down`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("SIGINT", () => void shutdown("SIGINT"));
}

bootstrap().catch((error: unknown) => {
  console.error("[server] Failed to start:", error);
  process.exit(1);
});
