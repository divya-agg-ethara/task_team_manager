"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
function createApp() {
    const app = (0, express_1.default)();
    app.set("trust proxy", 1);
    app.use((0, helmet_1.default)());
    const corsOrigins = (0, config_1.getCorsOrigins)();
    app.use((0, cors_1.default)({
        origin(origin, callback) {
            if (!origin || corsOrigins.includes(origin)) {
                callback(null, true);
                return;
            }
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        },
        credentials: true,
    }));
    app.use((0, compression_1.default)());
    app.use(express_1.default.json({ limit: "10mb" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    if (config_1.env.NODE_ENV === "development") {
        app.use((0, morgan_1.default)("dev"));
    }
    else {
        app.use((0, morgan_1.default)("combined"));
    }
    app.use(config_1.API_PREFIX, routes_1.apiRouter);
    app.use(middleware_1.notFoundHandler);
    app.use(middleware_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map