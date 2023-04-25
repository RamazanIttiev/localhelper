export const getServicesRoute = (title: string) => {
	switch (title) {
		case 'Food':
			return `services/${title.toLowerCase()}`;
		default:
			return title.toLowerCase();
	}
};
