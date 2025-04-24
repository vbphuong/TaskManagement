import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse): void {
  res.status(200).json({ tasks: ['Task 1', 'Task 2'] });
}