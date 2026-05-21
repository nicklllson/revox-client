export const PaymentReturnLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<div className='flex min-h-screen w-full items-center justify-center px-4'>
		<div className='w-full max-w-md'>{children}</div>
	</div>
);
