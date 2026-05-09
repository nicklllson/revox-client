import { ThemeToggle } from '@/features/toggle-theme';

export const AppTab = () => {
	return (
		<div className='flex min-h-90 flex-col space-y-5'>
			<div className='flex w-full items-center justify-between'>
				<span>Appearance</span>
				<ThemeToggle />
			</div>
		</div>
	);
};
