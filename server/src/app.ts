import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config";
import { errorHandler, notFoundHandler } from "./middleware";
import { apiRouter, API_PREFIX } from "./routes";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  app.use(helmet());

  const corsOrigins =
    env.NODE_ENV === "development"
      ? Array.from(
          new Set([
            env.CLIENT_URL,
            "http://localhost:3000",
            "http://127.0.0.1:3000",
          ]),
        )
      : [env.CLIENT_URL];

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || corsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      },
      credentials: true,
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else {
    app.use(morgan("combined"));
  }

  app.use(API_PREFIX, apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
