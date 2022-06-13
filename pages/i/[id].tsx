import { Post, PrismaClient } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import NextImage from '../../components/NextImage';

const prisma = new PrismaClient();

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await prisma.post.findMany();
	const paths = posts.map((post) => ({
		params: { id: post.id },
	}));
	return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const post = await prisma.post.findUnique({
		where: { id: params?.id as string },
		select: {
			id: true,
			url: true,
			user: {
				select: {
					image: true,
					name: true,
				},
			},
		},
	});

	return { props: { post } };
};

type PostWithUser = Post & {
	user: {
		name: string;
		image: string;
	};
};

export default function ImagePage({ post }: { post: PostWithUser }) {
	return (
		<div className='relative h-screen w-screen flex justify-center items-center p-64'>
			<div className='m-64 flex relative h-full w-full flex-col space-y-4'>
				<Link className='' href='/'>
					All Posts
				</Link>
				<div className='flex items-center space-x-2'>
					<div className='relative h-8 w-8 overflow-hidden z-20 cursor-pointer rounded-full'>
						<NextImage src={post.user.image} alt='avi' layout='fill' />
					</div>
					<p className='text-gray-700'>
						Posted by <span className='font-bold'>{post.user.name}</span>
					</p>
				</div>
				<div className='relative h-full'>
					<NextImage layout='fill' src={post.url} />
				</div>
			</div>
		</div>
	);
}
