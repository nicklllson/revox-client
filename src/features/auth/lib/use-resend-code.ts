import { useEffect, useState } from 'react';

const RESEND_TIMEOUT = 45;

export const useResendCode = () => {
	const [seconds, setSeconds] = useState(RESEND_TIMEOUT);
	const canResend = seconds === 0;

	useEffect(() => {
		if (canResend) return;

		const timer = setInterval(() => {
			setSeconds(prev => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [canResend]);

	const handleResend = () => {
		console.log('Resend code');
		setSeconds(RESEND_TIMEOUT);
	};

	return { canResend, seconds, handleResend };
};
