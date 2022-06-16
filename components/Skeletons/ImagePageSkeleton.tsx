import React from 'react';

export default function ImageSkeleton() {
	return (
		<div className='relative h-screen w-screen flex justify-center items-center px-64 py-12'>
			<div className='flex relative h-full w-full flex-col space-y-4'>
				<div className='h-9 w-20 rounded-md bg-gray-400 animate-pulse' />
				<div className='flex items-center space-x-2'>
					<div className='h-8 w-8 animate-pulse bg-gray-400 rounded-full' />
					<div className='px-4 w-48 h-full py-2 rounded-md animate-pulse bg-gray-400' />
				</div>
				<div className='relative h-full w-full animate-pulse bg-gray-300' />
			</div>
		</div>
	);
}
