import { useNextStep } from 'nextstepjs';
import { useEffect } from 'react';
import { useSession } from '@/entities/auth';
import { useUser } from '@/entities/user';

const STORAGE_KEY = 'revox_onboarding_completed';
const PLAYER_TOUR_KEY = 'revox_player_onboarding_completed';

export const useOnboarding = () => {
	const { startNextStep } = useNextStep();
	const { session } = useSession();
	const { user, isFetching } = useUser();

	useEffect(() => {
		if (!session) return;
		// Не запускаем тур, пока профиль не заполнен — иначе юзера редиректит
		// на /meta (см. useUserEvent), а оверлей онбординга остаётся висеть поверх.
		if (isFetching || !user?.profileCompleted) return;

		const completed = localStorage.getItem(STORAGE_KEY);
		if (completed) return;

		const timer = setTimeout(() => {
			startNextStep('onboarding');
		}, 200);

		return () => clearTimeout(timer);
	}, [session, user?.profileCompleted, isFetching, startNextStep]);

	const restartTour = () => {
		localStorage.removeItem(STORAGE_KEY);
		startNextStep('onboarding');
	};

	const restartPlayerTour = () => {
		localStorage.removeItem(PLAYER_TOUR_KEY);
		startNextStep('player-onboarding');
	};

	return { restartTour, restartPlayerTour };
};
