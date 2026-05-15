"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema, property = "body") => (req, _res, next) => {
    const result = schema.safeParse(req[property]);
    if (!result.success) {
        next(result.error);
        return;
    }
    req[property] = result.data;
    next();
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map