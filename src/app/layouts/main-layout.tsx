import type { PropsWithChildren } from 'react';
import { Outlet } from 'react-router';
import { Aurora } from '@/shared/ui/aurora';
import { Header } from '@/widgets/header';
import { ModelProvider } from '../providers/model-provider';
import { useTheme } from '../providers/theme-provider';

const THEME_COLORS: Record<
	string,
	{
		colors: string[];
		blend: number;
	}
> = {
	dark: {
		colors: ['#0F2854', '#1C4D8D', '#4988C4', '#BDE8F5'],
		blend: 0.5,
	},
	light: {
		colors: ['#DDF0FA', '#9DC2E0', '#BDD8EC', '#DDF0FA'],
		blend: 1,
	},
};

export const MainLayout = ({ children }: PropsWithChildren) => {
	const { theme } = useTheme();
	return (
		<ModelProvider>
			<Header />
			<main className='mt-22.5 flex h-full flex-1 flex-col px-5'>
				<Outlet />
				<Aurora
					speed={1}
					amplitude={1.0}
					blend={THEME_COLORS[theme].blend}
					colorStops={THEME_COLORS[theme].colors}
				/>
				{children}
			</main>
		</ModelProvider>
	);
};
