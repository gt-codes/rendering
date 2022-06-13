import type { NextPage } from 'next';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

const Home: NextPage = () => {
	const { data } = useSession();
	const [link, setLink] = useState(true);

	console.log({ data });

	return (
		<div className='w-screen h-screen flex flex-col relative'>
			<div className='p-16 flex justify-center items-center z-20 bg-white/25 backdrop-blur-md sticky top-0'>
				<div className='w-1/4'>
					{!data ? (
						<button className='bg-black text-white rounded-md p-3 w-full' onClick={() => signIn('github')}>
							Signin with Github
						</button>
					) : (
						<>
							<label htmlFor='unsplashUrl' className='sr-only'>
								Enter Unsplash link
							</label>
							<div className='mt-1 flex rounded-md shadow-sm'>
								<div className='relative flex items-stretch flex-grow focus-within:z-10'>
									<input
										type='email'
										name='email'
										id='email'
										className='focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-3 sm:text-sm border-gray-300'
										placeholder='Add Unsplash link'
									/>
								</div>
								<button
									type='button'
									className='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
									Add
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
