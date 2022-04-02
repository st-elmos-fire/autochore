import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@helpers/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.chores.findMany();
  res.json(result);
}
