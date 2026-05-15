"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
const utils_1 = require("../utils");
function notFoundHandler(req, _res, next) {
    next(utils_1.ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}
//# sourceMappingURL=notFound.js.map