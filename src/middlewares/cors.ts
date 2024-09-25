import { NextFunction, Request, Response } from 'express';

const allowedOrigins = [
  'https://tcc-frontend-virid.vercel.app', // Vercel production
  'http://localhost:5173', // Local development
  'https://2ddb-192-241-141-182.ngrok-free.app' // Update this with your current ngrok URL
];

export function cors(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin as string;
  
  if (allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }

  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, ngrok-skip-browser-warning', 
  );
  res.set('Access-Control-Allow-Credentials', 'true');

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
}
