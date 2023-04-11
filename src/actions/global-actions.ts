import { Telegram } from '../app/App';
import { ErrorType } from '../models/error';
import { sendWebAppDeepLink } from '../utils/requests';

export const setHaptic = (state: string) => Telegram.WebApp.HapticFeedback.impactOccurred(state);

export const handleOrder = async (
	idForBot: string,
	item: string | number | {} | undefined,
	handleLoading: (value: boolean) => void,
	handleError: (value: ErrorType) => void,
) => {
	setHaptic('light');
	handleLoading(true);
	try {
		const result = await sendWebAppDeepLink(idForBot, 'lhelper', { itemName: item });
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
