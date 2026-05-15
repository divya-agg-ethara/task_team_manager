import "dotenv/config";
import { createApp } from "./app";
import { env } from "./config";
import {
  connectDatabase,
  disconnectDatabase,
} from "./prisma/client";

async function bootstrap(): Promise<void> {
  await connectDatabase();

  const app = createApp();
  const server = app.listen(env.PORT, () => {
    console.log(
      `[server] ${env.NODE_ENV} — listening on http://localhost:${env.PORT}`,
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
