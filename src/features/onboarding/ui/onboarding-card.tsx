import type { CardComponentProps } from 'nextstepjs';
import { Button } from '@/shared/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card';

export const OnboardingCard = ({
	step,
	currentStep,
	totalSteps,
	nextStep,
	prevStep,
	skipTour,
	arrow,
}: CardComponentProps) => {
	return (
		<Card className='w-[350px]'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					{step.icon && <span>{step.icon}</span>}
					{step.title}
				</CardTitle>
			</CardHeader>

			<CardContent>
				<div className='mb-2'>{step.content}</div>
				{arrow}
			</CardContent>

			<CardFooter className='flex justify-between'>
				<div className='text-muted-foreground text-sm'>
					{currentStep + 1} / {totalSteps}
				</div>

				<div className='flex gap-2'>
					{currentStep > 0 && (
						<Button variant='outline' size='sm' onClick={prevStep}>
							Previous
						</Button>
					)}

					<Button size='sm' onClick={nextStep}>
						{currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
					</Button>

					{step.showSkip && (
						<Button variant='ghost' size='sm' onClick={skipTour}>
							Skip
						</Button>
					)}
				</div>
			</CardFooter>
		</Card>
	);
};
