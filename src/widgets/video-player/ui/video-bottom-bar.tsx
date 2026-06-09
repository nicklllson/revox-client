import type { PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/utils';

export const VideoBottomBar = ({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<div className={cn('flex flex-wrap justify-between gap-3', className)}>
			{children}
		</div>
	);
};
