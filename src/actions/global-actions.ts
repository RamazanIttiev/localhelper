import { ErrorType } from '../models/error';
import { setHaptic } from './webApp-actions';
import { sendWebAppDeepLink } from '../utils/requests';

export const handleOrder = async (
	idForBot: string,
	order: { order: string; itemName?: undefined } | { itemName: string; order?: undefined },
	handleLoading: (value: boolean) => void,
	handleError: (value: ErrorType) => void,
) => {
	setHaptic('light');
	handleLoading(true);
	try {
		const result = await sendWebAppDeepLink(idForBot, 'lhelper', order);
		if (result.ok) {
			handleLoading(false);
			handleError({ message: 'Success', isError: false });
		} else {
			handleLoading(false);
			handleError({
				message: 'Try again later',
				isError: true,
			});
		}
	} catch (error) {
		handleLoading(false);
		handleError({
			message: typeof error === 'string' ? error : 'Try again later',
			isError: true,
		});
	}
};

export const clearResponseMessage = (errorState: ErrorType, handleError: (value: ErrorType) => void) => {
	if (errorState.isError !== null) {
		setTimeout(() => {
			handleError({
				message: '',
				isError: null,
			});
		}, 5000);
	}
};
