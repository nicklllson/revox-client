export const formatAmount = (cents: number, currency: string): string => {
	const value = cents / 100;
	const formatted = value % 1 === 0 ? value.toString() : value.toFixed(2);
	if (currency === 'RUB') return `${formatted} ₽`;
	if (currency === 'USD') return `$${formatted}`;
	return `${formatted} ${currency}`;
};
