import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@helpers/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.users.findMany();
  res.json(result);
}
