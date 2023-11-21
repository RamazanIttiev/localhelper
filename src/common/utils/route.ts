export const getServicesRoute = (title: string) => {
	switch (title) {
		case 'Food':
			return `${title.toLowerCase()}/restaurants`;
		case 'Transfer':
		case 'Exchange':
			return `${title.toLowerCase()}/page/checkout`;
		default:
			return title.toLowerCase();
	}
};
