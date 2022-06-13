import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { classNames } from '../utils';

export default function NextImage(props: ImageProps) {
	const [loading, setLoading] = useState(true);

	return (
		<Image
			alt={props.alt || 'Image'}
			objectFit='cover'
			onLoadingComplete={() => setLoading(false)}
			{...props}
			className={classNames(
				'duration-300 ease-in-out',
				loading ? 'blur-2xl scale-110' : 'blur-0 scale-100',
				props.className || ''
			)}
		/>
	);
}
