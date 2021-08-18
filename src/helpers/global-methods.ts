export const formatCurrency = (value: number) => {
	return Number(value).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD'
	});
};