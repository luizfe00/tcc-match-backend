import { NextFunction, Request, Response } from 'express';

export function cors(req: Request, res: Response, next: NextFunction): void {
  res.set('Access-Control-Allow-Origin', 'https://tcc-frontend-virid.vercel.app');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  // res.set('Access-Control-Allow-Credentials', 'true');

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
}
