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
