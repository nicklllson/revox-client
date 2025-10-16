import '@/shared/i18next/config';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './router';

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Root element not found');
}

createRoot(rootElement).render(
	<Suspense fallback={null}>
		<RouterProvider router={router} />
	</Suspense>,
);
