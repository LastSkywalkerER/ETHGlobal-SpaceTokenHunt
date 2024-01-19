import { CurrentUser } from '@space-token-hunt/auth';

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser;
    }
  }
}
