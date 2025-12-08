import { Role } from '@repo/db';

export interface IJwtPayload {
  sub: string;
  username: string | null;
  avatarURL: string | null;
  role: Role;
  sessionId: string;
}
