import { NextStepProvider, NextStepReact } from 'nextstepjs';
import { type PropsWithChildren, useState } from 'react';
import { OnboardingCard } from '@/features/onboarding';
import { steps } from '../model/constants';

export const OnboardingProviders = ({ children }: PropsWithChildren) => {
	const [activeTour, setActiveTour] = useState<string | null>(null);

	const markCompleted = (tourName: string | null) => {
		if (tourName === 'onboarding') {
			localStorage.setItem('revox_onboarding_completed', 'true');
		}
		if (tourName === 'player-onboarding') {
			localStorage.setItem('revox_player_onboarding_completed', 'true');
		}
	};

	return (
		<NextStepProvider>
			<NextStepReact
				steps={steps}
				shadowOpacity='0.5'
				cardComponent={OnboardingCard}
				onStart={(tourName: string | null) => {
					setActiveTour(tourName);
				}}
				onComplete={() => {
					markCompleted(activeTour);
					setActiveTour(null);
				}}
				onSkip={() => {
					markCompleted(activeTour);
					setActiveTour(null);
				}}>
				{children}
			</NextStepReact>
		</NextStepProvider>
	);
};
