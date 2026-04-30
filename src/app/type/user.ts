export interface MinimalUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: MinimalUser;
    }
  }
}
