import dayjs from 'dayjs';

export const getDateDiff = (start: Date | null, end: Date | null) => {
	const startDate = dayjs(start);
	const endDate = dayjs(end);

	if (isNaN(startDate.date()) || isNaN(endDate.date())) {
		return 0;
	}
	const diffInDays = endDate.diff(startDate, 'day');

	return diffInDays + 1;
};

export const formatDaysText = (numDays: number) => {
	if (numDays === 1) {
		return `day`;
	} else {
		return `days`;
	}
};

export const filterPassedTime = (time: Date) => {
	const currentDate = new Date();
	const selectedDate = new Date(time);

	return currentDate.getTime() < selectedDate.getTime();
};

export const addDays = (date: Date, days: number) =>
	new Date(date.setDate(date.getDate() + days)).toLocaleDateString('en-US', {
		timeZone: 'Asia/Colombo',
		hour12: false,
	});
