import React from 'react';
import NextImage from './NextImage';

type Post = {
	id: string;
	userEmail: string;
	url: string;
	createdAt: Date;
};

export default function PostCard({ post }: { post: Post }) {
	return (
		<div className='relative h-64' key={post.id}>
			<NextImage layout='fill' src={post.url} />
		</div>
	);
}
