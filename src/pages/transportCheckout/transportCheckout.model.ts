import { Dayjs } from 'dayjs';

export interface TransportCheckoutModel {
	userName: string;
	startDate: Dayjs | null;
	endDate: Dayjs | null;
}
