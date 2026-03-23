import type { PropsWithChildren } from 'react';

export const VideoBottomBar = ({ children }: PropsWithChildren) => {
	return (
		<div className='flex items-center justify-between gap-2'>{children}</div>
	);
};
