import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@helpers/prisma';
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const newChore = JSON.parse(req.body);
  await prisma.chores.create({
    data: newChore
  });
  res.json({
    success: true,
    message: `'${newChore.content}' added successfully`
  });
}
