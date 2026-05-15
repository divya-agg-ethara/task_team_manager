"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../../config");
const jwt_1 = require("../../lib/jwt");
const client_1 = require("../../prisma/client");
const utils_1 = require("../../utils");
function toPublicUser(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
function buildAuthResponse(user) {
    const publicUser = toPublicUser(user);
    const accessToken = (0, jwt_1.signAccessToken)({
        sub: user.id,
        email: user.email,
    });
    return {
        user: publicUser,
        tokens: { accessToken },
    };
}
class AuthService {
    async signup(input) {
        const existing = await client_1.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (existing) {
            throw utils_1.ApiError.conflict("An account with this email already exists");
        }
        const hashedPassword = await bcryptjs_1.default.hash(input.password, config_1.BCRYPT_SALT_ROUNDS);
        const user = await client_1.prisma.user.create({
            data: {
                email: input.email,
                password: hashedPassword,
                name: input.name,
            },
        });
        return buildAuthResponse(user);
    }
    async login(input) {
        const user = await client_1.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (!user) {
            throw utils_1.ApiError.unauthorized("Invalid email or password");
        }
        const isPasswordValid = await bcryptjs_1.default.compare(input.password, user.password);
        if (!isPasswordValid) {
            throw utils_1.ApiError.unauthorized("Invalid email or password");
        }
        return buildAuthResponse(user);
    }
    async getUserById(id) {
        const user = await client_1.prisma.user.findUnique({ where: { id } });
        if (!user) {
            return null;
        }
        return toPublicUser(user);
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map