import type { PropsWithChildren } from 'react';

export const VideoBottomBar = ({ children }: PropsWithChildren) => {
	return <div className='flex flex-wrap justify-between gap-3'>{children}</div>;
};
