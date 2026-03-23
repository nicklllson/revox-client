import { cn } from '../lib/utils';

export const Separator = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(className, 'mx-auto my-3 h-1 w-5 rounded-full bg-muted')}
		/>
	);
};
