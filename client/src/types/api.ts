/** Generic API envelope from Express backend */

export type AuthUserDto = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthPayload = {
  user: AuthUserDto;
  tokens: { accessToken: string };
};

export type AuthSuccessBody = {
  success: true;
  data: AuthPayload;
};
