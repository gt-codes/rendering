import { Post } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import NextImage from './NextImage';

interface ShortPost {
	id: string;
	url: string;
}

export default function PostCard({ post }: { post: Post | ShortPost }) {
	return (
		<Link href={`/i/${post.id}`}>
			<a className='relative h-96 w-full' key={post.id}>
				<NextImage layout='fill' src={post.url} />
			</a>
		</Link>
	);
}
