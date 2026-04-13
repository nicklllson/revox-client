import { Outlet } from 'react-router';
import { useSession } from '@/entities/auth';
import { History } from '@/widgets/history';

export const HistoryLayout = () => {
	const { session } = useSession();
	return (
		<>
			{!!session && <History />}
			<Outlet />
		</>
	);
};
