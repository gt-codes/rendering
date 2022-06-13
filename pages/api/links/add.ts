import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { url, email } = req.body;

	const post = await prisma.post.create({
		data: {
			url,
			userEmail: email,
		},
	});

	res.status(200).json({ postId: post.id });
}
