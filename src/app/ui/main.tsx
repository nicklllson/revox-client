import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { queryClient } from '@/shared/lib/api';
import { ErrorBound } from '@/shared/model/error';
import { router } from '../lib/router';
import { ThemeProvider } from '../providers/theme-provider';

import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Root element not found');
}

createRoot(rootElement).render(
	<ErrorBound>
		<Suspense fallback={<div>Loading...</div>}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
					<RouterProvider router={router} />
				</ThemeProvider>
			</QueryClientProvider>
		</Suspense>
	</ErrorBound>,
);
