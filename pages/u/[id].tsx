import { PrismaClient, User } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import NextImage from '../../components/NextImage';
import NextLink from '../../components/NextLink';
import PostCard from '../../components/PostCard';

const prisma = new PrismaClient();

export const getStaticPaths: GetStaticPaths = async () => {
	const users = await prisma.user.findMany();
	const paths = users.map((user) => ({
		params: { id: user.id },
	}));
	return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const user = await prisma.user.findUnique({
		where: { id: params?.id as string },
		include: {
			posts: {
				select: {
					id: true,
					url: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});

	return { props: { user } };
};

type UserWithPosts = User & {
	posts: {
		id: string;
		url: string;
	}[];
};

export default function ImagePage({ user }: { user: UserWithPosts }) {
	return (
		<div className='w-screen h-screen flex flex-col relative'>
			<div className='p-16 px-6 md:p-16 flex justify-center items-center z-20 bg-white/25 backdrop-blur-md sticky top-0'>
				<div className='w-full md:w-1/2 flex justify-center '>
					<div className='flex items-center space-x-2'>
						<div className='relative h-8 w-8 overflow-hidden z-20 cursor-pointer rounded-full'>
							<NextImage src={user.image as string} alt='avi' layout='fill' />
						</div>
						<p className='text-white bg-black px-4 text-sm py-2 rounded-md'>
							Posted by{' '}
							<span className='font-bold cursor-pointer'>
								<NextLink href={`/u/${user.id}`}>{user.name}</NextLink>
							</span>
						</p>
						<NextLink href='/' className='text-white bg-black px-4 text-sm py-2 rounded-md'>
							All Posts
						</NextLink>
					</div>
				</div>
			</div>
			<div className='grow'>
				<div className='grid grid-cols-2 md:grid-cols-4'>
					{user.posts.map((el: typeof user['posts'][0]) => (
						<PostCard key={el.id} post={el} />
					))}
				</div>
			</div>
		</div>
	);
}
