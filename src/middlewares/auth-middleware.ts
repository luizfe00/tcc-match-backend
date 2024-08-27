import { StatusCodes } from '@/constants/SatusCode';
import { UserSignIn } from '@/interfaces/user';
import { PUBLIC_ROUTES } from '@/routes/public-routest';
import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: UserSignIn;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (PUBLIC_ROUTES.includes(req.path)) {
    next();
    return;
  }
  const token = req.headers.authorization;
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token is required' });
  const tokenValue = token.split(' ')[1];
  try {
    verify(tokenValue, 'secret');
    const user = decode(tokenValue as string);
    req.user = user as UserSignIn;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};
