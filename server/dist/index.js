"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const config_1 = require("./config");
const client_1 = require("./prisma/client");
async function bootstrap() {
    await (0, client_1.connectDatabase)();
    const app = (0, app_1.createApp)();
    const server = app.listen(config_1.env.PORT, () => {
        console.log(`[server] ${config_1.env.NODE_ENV} — listening on http://localhost:${config_1.env.PORT}`);
    });
    const shutdown = async (signal) => {
        console.log(`[server] ${signal} received — shutting down`);
        server.close(async () => {
            await (0, client_1.disconnectDatabase)();
            process.exit(0);
        });
    };
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
    process.on("SIGINT", () => void shutdown("SIGINT"));
}
bootstrap().catch((error) => {
    console.error("[server] Failed to start:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map