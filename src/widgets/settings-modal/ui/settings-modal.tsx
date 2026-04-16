import { Suspense } from 'react';
import { useMatch, useNavigate } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { Spinner } from '@/shared/ui/spinner';
import { SettingsContent } from './settings-content';

export const SettingsModal = () => {
	const settingsMatch = useMatch(ROUTES.PRIVATE.SETTINGS);
	const navigate = useNavigate();

	return (
		<Dialog open={!!settingsMatch} onOpenChange={open => !open && navigate(-1)}>
			<DialogContent>
				<Suspense fallback={<Spinner />}>
					{settingsMatch && <SettingsContent />}
				</Suspense>
			</DialogContent>
		</Dialog>
	);
};
