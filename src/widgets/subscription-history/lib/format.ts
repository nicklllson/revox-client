export const formatDate = (iso: string): string =>
	new Date(iso).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

export const formatHistoryAmount = (
	amount: number,
	currency: string,
): string => {
	const value = amount / 100;
	const formatted = value % 1 === 0 ? value.toString() : value.toFixed(2);
	if (currency === 'RUB') return `${formatted} ₽`;
	if (currency === 'USD') return `$${formatted}`;
	return `${formatted} ${currency}`;
};
