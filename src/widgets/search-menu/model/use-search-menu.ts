import { useEffect, useState } from 'react';

const OPEN_MENU_KEY = 'p';

export const useSearchMenu = () => {
	const [open, setOpen] = useState(false);
	const handleOpenMenu = () => setOpen(true);
	const handleCloseMenu = () => setOpen(false);

	const handleCloseMenuByEsc = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			handleCloseMenu();
		}
	};

	const handleOpenMenuByKey = (event: KeyboardEvent) => {
		if ((event.ctrlKey || event.metaKey) && event.key === OPEN_MENU_KEY) {
			event.preventDefault();
			handleOpenMenu();
		}
	};

	useEffect(() => {
		const abortCtl = new AbortController();
		document.addEventListener('keydown', handleCloseMenuByEsc, abortCtl);
		document.addEventListener('keydown', handleOpenMenuByKey, abortCtl);
		return () => {
			abortCtl.abort();
		};
	}, []);

	return { open, setOpen };
};
