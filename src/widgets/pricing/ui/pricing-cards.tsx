import { ArrowUpRight, Check, Diamond } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card';
import { MOCK_TARIFFS } from '../model/constants';

export const PricingCards = () => {
	return (
		<div className='mx-auto mb-10 flex w-full max-w-[1400px] items-start justify-between gap-10'>
			{MOCK_TARIFFS.map(tariff => (
				<Card key={tariff.id} className='min-h-[610px] w-full'>
					<CardHeader>
						<CardTitle className='text-3xl'>{tariff.name}</CardTitle>
						<CardDescription>{tariff.description}</CardDescription>
					</CardHeader>
					<CardContent className='flex flex-1 flex-col gap-8'>
						<div>
							<p className='mb-3 font-medium'>
								<span className='text-5xl'>{tariff.price} $</span>
								<span className='text-muted-foreground'>/mo</span>
							</p>
							<span className='text-muted-foreground text-sm'>
								billed monthly
							</span>
						</div>
						<div className='flex flex-col items-center gap-8'>
							<Button
								disabled
								className='w-full'
								variant='secondary'
								accent={tariff.isActive ? 'secondary' : 'primary'}>
								<ArrowUpRight />
								{tariff.name !== 'Basic' ? 'Coming soon}' : 'Active plan'}
							</Button>
							<span className='text-sm'>
								{tariff.computeUnits} compute units / month
							</span>
						</div>
						<div>
							<ul className='flex flex-col gap-3 text-sm'>
								<li className='flex items-center gap-5'>
									<Diamond size={16} />
									Everything in {tariff.name} plus:
								</li>
								{tariff.features.map((feat, index) => (
									<li className='flex items-center gap-5' key={index}>
										<Check size={16} />
										{feat}
									</li>
								))}
							</ul>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
