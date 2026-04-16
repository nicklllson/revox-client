import { useNavigate } from 'react-router';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog';

export const SettingsPage = () => {
	const navigate = useNavigate();

	const handleClose = () => {
		navigate(-1); // или navigate(ROUTES.PRIVATE.VIDEO)
	};

	return (
		<Dialog open onOpenChange={open => !open && handleClose()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Настройки</DialogTitle>
				</DialogHeader>
				{/* контент */}
			</DialogContent>
		</Dialog>
	);
};

export const Component = SettingsPage;
