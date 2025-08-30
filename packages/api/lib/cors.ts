import { VercelRequest, VercelResponse } from '@vercel/node';
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  origin: [
    'http://localhost:3000',
    'https://pentara-app-web-optimaldev.vercel.app',
    'https://pentara-*-app-web-optimaldev.vercel.app',
    // Add mobile app origins when deployed
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

// Helper method to wait for middleware to execute
function runMiddleware(req: VercelRequest, res: VercelResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function corsMiddleware(req: VercelRequest, res: VercelResponse) {
  await runMiddleware(req, res, cors);
}
