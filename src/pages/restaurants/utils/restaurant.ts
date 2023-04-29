export const getServicesRoute = (title: string) => {
	switch (title) {
		case 'Food':
			return `services/${title.toLowerCase()}`;
		default:
			return title.toLowerCase();
	}
};

export const isWorkingHour = (open?: string, close?: string) => {
	const currentTime = new Date().toLocaleTimeString('it-IT', {
		timeZone: 'Asia/Colombo',
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
	});
	const [currentHour, currentMinute] = currentTime.split(':').map(Number);

	const currentTimeValue = currentHour + currentMinute / 60;
	const [openHour, openMinute] = open ? open.split(':').map(Number) : [];
	const openHourValue = openHour + openMinute / 60;

	const [closeHour, closeMinute] = close ? close.split(':').map(Number) : [];
	const closeHourValue = closeHour + closeMinute / 60;

	console.log(currentMinute);
	return currentTimeValue >= openHourValue && currentTimeValue < closeHourValue;
};
