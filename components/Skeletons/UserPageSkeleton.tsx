import React from 'react';
import { classNames } from '../../utils';

export default function UserSkeleton() {
	return (
		<div className='w-screen h-screen flex flex-col relative'>
			<div className='p-16 px-6 md:p-16 flex justify-center items-center z-20 bg-white/25 backdrop-blur-md sticky top-0'>
				<div className='w-full md:w-1/2 flex justify-center '>
					<div className='flex items-center space-x-2'>
						<div className='h-8 w-8 animate-pulse bg-gray-400 rounded-full' />
						<div className='px-4 w-48 h-full py-2 rounded-md animate-pulse bg-gray-400' />
						<div className='px-4 w-20 h-full py-2 rounded-md animate-pulse bg-gray-400' />
					</div>
				</div>
			</div>
			<div className='grow'>
				<div className='grid grid-cols-2 md:grid-cols-4'>
					{[...Array(4).keys()].map((id) => (
						<div
							key={id}
							className={classNames(
								id % 2 == 0 ? 'bg-gray-300' : 'bg-gray-200',
								'h-96 w-full animate-pulse'
							)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
