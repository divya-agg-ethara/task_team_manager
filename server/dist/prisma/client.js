"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const config_1 = require("../config");
const client_1 = require("../generated/prisma/client");
const globalForPrisma = globalThis;
function createPrismaClient() {
    const pool = new pg_1.Pool({ connectionString: config_1.env.DATABASE_URL });
    const adapter = new adapter_pg_1.PrismaPg(pool);
    return new client_1.PrismaClient({
        adapter,
        log: config_1.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
    });
}
exports.prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
async function connectDatabase() {
    await exports.prisma.$connect();
}
async function disconnectDatabase() {
    await exports.prisma.$disconnect();
}
//# sourceMappingURL=client.js.map