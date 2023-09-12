export const getServicesRoute = (title: string) => {
	switch (title) {
		case 'Food':
			return `${title.toLowerCase()}/restaurants`;
		case 'Transfer':
			return `${title.toLowerCase()}/page/checkout`;
		default:
			return title.toLowerCase();
	}
};
