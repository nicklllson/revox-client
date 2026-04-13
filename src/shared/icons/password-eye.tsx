import type { ComponentProps } from 'react';

export const IconPasswordEye = ({
	isVisible,
	...restProps
}: { isVisible: boolean } & ComponentProps<'svg'>) => {
	if (isVisible) {
		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='16'
				height='16'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				{...restProps}>
				<path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94' />
				<path d='M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19' />
				<path d='m14.12 14.12a3 3 0 1 1-4.24-4.24' />
				<line x1='1' x2='23' y1='1' y2='23' />
			</svg>
		);
	}
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='16'
			height='16'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			{...restProps}>
			<path d='M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0' />
			<circle cx='12' cy='12' r='3' />
		</svg>
	);
};
