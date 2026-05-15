import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncHandler, ApiError } from "../../utils";
import { authService } from "./auth.service";
import type { LoginInput, SignupInput } from "./auth.validation";

export const signup = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await authService.signup(req.body as SignupInput);

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: result,
    });
  },
);

export const login = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await authService.login(req.body as LoginInput);

    res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  },
);

export const getMe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.currentUser) {
      throw ApiError.unauthorized();
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: { user: req.currentUser },
    });
  },
);
