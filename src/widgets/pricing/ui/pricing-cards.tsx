import { ArrowUpRight, Check, Diamond, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSession } from '@/entities/auth';
import {
	type TSubscriptionTier,
	type TTier,
	useCreatePayment,
	usePricingTiers,
	useSubscription,
} from '@/entities/subscription';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card';
import { buildFeaturesList, formatUsd } from '../model/services';

export const PricingCards = () => {
	const navigate = useNavigate();
	const { isFetching, tiers } = usePricingTiers();
	const { isFetchingSubscription, subscription } = useSubscription();
	const { createPayment } = useCreatePayment();
	const { session } = useSession();

	const handleClick = (tier: TSubscriptionTier) => {
		if (!session) {
			navigate(ROUTES.PUBLIC.SIGNIN);
			return;
		}
		createPayment(tier);
	};

	if (isFetching) {
		return (
			<div className='flex w-full items-center justify-center py-20'>
				<Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
			</div>
		);
	}

	if (!tiers || tiers.length === 0) return null;

	const freeTier = tiers.find((t: TTier) => t.tier === 'FREE');

	return (
		<div className='mx-auto mb-10 flex w-full max-w-[1200px] items-stretch justify-between gap-2.5'>
			{tiers.map(tier => {
				const isActive = tier.tier === subscription?.tier;
				const featuresList = buildFeaturesList(tier, freeTier);

				const previousProName = tier.tier === 'PRO' ? 'Free' : null;
				const previousPremiumName = tier.tier === 'PREMIUM' ? 'Pro' : null;

				const previousTierName = previousProName || previousPremiumName;

				return (
					<Card key={tier.tier} className='min-h-[610px] w-full'>
						<CardHeader>
							<CardTitle className='text-3xl'>{tier.name}</CardTitle>
							<CardDescription>{tier.description}</CardDescription>
						</CardHeader>
						<CardContent className='flex flex-1 flex-col gap-8'>
							<div>
								<p className='mb-3 font-medium'>
									<span className='text-5xl'>${formatUsd(tier.priceUsd)}</span>
									<span className='text-muted-foreground'>/mo</span>
								</p>
								<span className='text-muted-foreground text-sm'>
									billed monthly
								</span>
							</div>
							<div className='flex flex-col items-center gap-8'>
								{isFetchingSubscription ? (
									<Button
										disabled={true}
										className='w-full'
										variant='secondary'
										isLoading>
										loading
									</Button>
								) : (
									<Button
										disabled={isActive}
										className='w-full'
										variant='secondary'
										onClick={() => handleClick(tier.tier)}
										accent={isActive ? 'secondary' : 'primary'}>
										<ArrowUpRight />
										{isActive ? 'Current plan' : 'Choose plan'}
									</Button>
								)}

								<span className='text-sm'>
									{tier.minutesPerMonth} minutes of translation per month
								</span>
							</div>
							<div>
								<ul className='flex flex-col gap-3 text-sm'>
									{previousTierName && (
										<li className='flex items-center gap-5'>
											<Diamond size={16} />
											Everything in {previousTierName}, plus:
										</li>
									)}
									{featuresList.map((feat, index) => (
										<li className='flex items-center gap-5' key={index}>
											<Check size={16} />
											{feat}
										</li>
									))}
								</ul>
							</div>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
};
