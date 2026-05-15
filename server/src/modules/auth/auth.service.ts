import bcrypt from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "../../config";
import type { User } from "../../generated/prisma/client";
import { signAccessToken } from "../../lib/jwt";
import { prisma } from "../../prisma/client";
import { ApiError } from "../../utils";
import type { AuthResponse, PublicUser } from "./auth.types";
import type { LoginInput, SignupInput } from "./auth.validation";

function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function buildAuthResponse(user: User): AuthResponse {
  const publicUser = toPublicUser(user);
  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
  });

  return {
    user: publicUser,
    tokens: { accessToken },
  };
}

export class AuthService {
  async signup(input: SignupInput): Promise<AuthResponse> {
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      throw ApiError.conflict("An account with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(input.password, BCRYPT_SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        name: input.name,
      },
    });

    return buildAuthResponse(user);
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    return buildAuthResponse(user);
  }

  async getUserById(id: string): Promise<PublicUser | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return toPublicUser(user);
  }
}

export const authService = new AuthService();
