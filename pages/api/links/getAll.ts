import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const posts = await prisma.post.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});
	res.status(200).json(posts);
}
