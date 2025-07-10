import { User as AppUser } from '../../user/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: AppUser;
    }
  }
}

export {};
