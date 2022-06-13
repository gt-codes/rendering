import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import NextImage from '../components/NextImage';
import PostCard from '../components/PostCard';
import { Post } from '@prisma/client';

const Home: NextPage = () => {
	const { data: session } = useSession();
	const [url, setUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState<Post[]>([]);

	const handleAdd = async () => {
		if (!url.startsWith('https://images.unsplash.com')) return;
		const res = await fetch('/api/links/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ url, email: session?.user?.email }),
		});
		await res.json();
		setUrl('');
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const res = await fetch('/api/links/getAll');
			const data = await res.json();
			setPosts(data);
			setLoading(false);
		};
		fetchData();
	}, []);

	return (
		<div className='w-screen h-screen flex flex-col relative'>
			<div className='p-16 px-6 md:p-16 flex justify-center items-center z-20 bg-white/25 backdrop-blur-md sticky top-0'>
				<div className='w-full md:w-1/2 flex justify-center'>
					{!session ? (
						<button className='bg-black text-white rounded-md p-3 w-full' onClick={() => signIn('github')}>
							Signin with Github
						</button>
					) : (
						<div className='flex justify-center w-full mx-auto items-center space-x-2'>
							<div
								className='relative h-8 w-8 overflow-hidden cursor-pointer rounded-full'
								onClick={() => signOut()}>
								<NextImage src={session.user?.image as string} alt='avi' layout='fill' />
							</div>
							<label htmlFor='unsplashUrl' className='sr-only'>
								Enter Unsplash link
							</label>
							<div className='flex rounded-md shadow-sm w-full'>
								<div className='relative flex items-stretch w-full focus-within:z-10'>
									<input
										type='email'
										name='email'
										id='email'
										value={url}
										onChange={(e) => setUrl(e.target.value)}
										onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
										className='border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-3 sm:text-sm'
										placeholder='Add Unsplash link'
									/>
								</div>
								<button
									type='button'
									onClick={handleAdd}
									className='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
									Add
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className='grow'>
				{loading ? (
					<p>Loading...</p>
				) : (
					<div className='grid grid-cols-2 md:grid-cols-4'>
						{posts.map((el: Post) => (
							<PostCard key={el.id} post={el} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
