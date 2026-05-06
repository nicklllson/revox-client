import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/app/providers/theme-provider';
import { Button } from '@/shared/ui/button';

export const ThemeToggle = () => {
	const { setTheme, theme } = useTheme();

	return (
		<div className='flex gap-2'>
			<Button
				variant={theme === 'light' ? 'default' : 'outline'}
				size='icon'
				onClick={() => setTheme('light')}>
				<Sun className='h-[1.2rem] w-[1.2rem]' />
			</Button>

			<Button
				variant={theme === 'dark' ? 'default' : 'outline'}
				size='icon'
				onClick={() => setTheme('dark')}>
				<Moon className='h-[1.2rem] w-[1.2rem]' />
			</Button>

			<Button
				variant={theme === 'system' ? 'default' : 'outline'}
				size='icon'
				onClick={() => setTheme('system')}>
				<Laptop className='h-[1.2rem] w-[1.2rem]' />
			</Button>
		</div>
	);
};
