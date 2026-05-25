import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePaymentStatus } from '@/entities/subscription';
import { Button } from '@/shared/ui/button';
import { formatAmount } from '@/widgets/payment/model/services';
import { StatusCard } from '@/widgets/payment/ui/status-card';
import { PaymentReturnLayout } from '@/widgets/pricing/ui/payment-layout';

const PaymentReturnPage = () => {
	const [searchParams] = useSearchParams();
	const paymentId = searchParams.get('paymentId');

	const { data, isLoading, isError } = usePaymentStatus(paymentId);

	if (!paymentId) {
		return (
			<PaymentReturnLayout>
				<StatusCard
					icon={<XCircle className='h-12 w-12 text-destructive' />}
					title='Invalid payment link'
					description="We couldn't find a payment ID in the URL. Please return to the pricing page and try again."
					action={
						<Button asChild className='w-full'>
							<Link to='/pricing'>Back to pricing</Link>
						</Button>
					}
				/>
			</PaymentReturnLayout>
		);
	}

	if (isLoading) {
		return (
			<PaymentReturnLayout>
				<StatusCard
					icon={
						<Loader2 className='h-12 w-12 animate-spin text-muted-foreground' />
					}
					title='Loading payment...'
					description='Please wait while we fetch your payment details.'
				/>
			</PaymentReturnLayout>
		);
	}

	if (isError || !data) {
		return (
			<PaymentReturnLayout>
				<StatusCard
					icon={<XCircle className='h-12 w-12 text-destructive' />}
					title='Something went wrong'
					description="We couldn't fetch your payment status. Please contact support if the issue persists."
					action={
						<Button asChild className='w-full'>
							<Link to='/pricing'>Back to pricing</Link>
						</Button>
					}
				/>
			</PaymentReturnLayout>
		);
	}

	if (data.status === 'SUCCEEDED') {
		return (
			<PaymentReturnLayout>
				<StatusCard
					icon={<CheckCircle2 className='h-12 w-12 text-green-500' />}
					title='Payment successful!'
					description={`Welcome to ${data.tier}. Your plan is now active.`}
					details={`Charged ${formatAmount(data.amount, data.currency)}`}
					action={
						<Button asChild className='w-full'>
							<Link to='/'>Go to home</Link>
						</Button>
					}
				/>
			</PaymentReturnLayout>
		);
	}

	if (data.status === 'CANCELED') {
		return (
			<PaymentReturnLayout>
				<StatusCard
					icon={<XCircle className='h-12 w-12 text-destructive' />}
					title='Payment canceled'
					description='Your payment was canceled or declined. No charges were made.'
					action={
						<Button asChild className='w-full'>
							<Link to='/pricing'>Try again</Link>
						</Button>
					}
				/>
			</PaymentReturnLayout>
		);
	}

	return (
		<PaymentReturnLayout>
			<StatusCard
				icon={
					<Loader2 className='h-12 w-12 animate-spin text-muted-foreground' />
				}
				title='Processing your payment...'
				description="This usually takes just a few seconds. Please don't close this page."
				details={`Amount: ${formatAmount(data.amount, data.currency)}`}
			/>
		</PaymentReturnLayout>
	);
};

export const Component = PaymentReturnPage;
