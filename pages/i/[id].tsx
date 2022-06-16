import { Post, PrismaClient } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NextImage from '../../components/NextImage';
import NextLink from '../../components/NextLink';

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
					id: true,
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
		id: string;
		name: string;
		image: string;
	};
};

export default function ImagePage({ post }: { post: PostWithUser }) {
	const router = useRouter();

	if (router.isFallback) {
		return <div className='w-screen h-screen flex flex-col relative'>Loading...</div>;
	}

	return (
		<div className='relative h-screen w-screen flex justify-center items-center px-64 py-12'>
			<div className='flex relative h-full w-full flex-col space-y-4'>
				<NextLink href='/' className='text-white w-max bg-black px-4 text-sm py-2 rounded-md'>
					All Posts
				</NextLink>
				<div className='flex items-center space-x-2'>
					<div className='relative h-8 w-8 overflow-hidden z-20 cursor-pointer rounded-full'>
						<NextImage src={post.user.image} alt='avi' layout='fill' />
					</div>
					<p className='text-gray-700'>
						Posted by{' '}
						<span className='font-bold cursor-pointer'>
							<Link href={`/u/${post.user.id}`}>{post.user.name}</Link>
						</span>
					</p>
				</div>
				<div className='relative h-full w-full'>
					<NextImage layout='fill' objectFit='contain' src={post.url} />
				</div>
			</div>
		</div>
	);
}
