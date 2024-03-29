import { ErrorType } from 'models/error.model';

import { sendWebAppDeepLink } from 'api/telegram';

import { setHaptic } from './webApp-actions';

export const handleOrder = async (
	flowId: string,
	order: any,
	handleLoading: (value: boolean) => void,
	handleError: (value: ErrorType) => void,
) => {
	setHaptic('soft');
	handleLoading(true);
	try {
		const { result } = await sendWebAppDeepLink(flowId, order);
		if (result.ok) {
			handleLoading(false);
			handleError({ isError: false });
		} else {
			handleLoading(false);
			handleError({
				isError: true,
			});
		}
		return result;
	} catch (error) {
		handleLoading(false);
		handleError({
			isError: true,
		});
	}
};

export const clearResponseMessage = (errorState: ErrorType, handleError: (value: ErrorType) => void) => {
	if (errorState.isError !== null) {
		setTimeout(() => {
			handleError({
				isError: null,
			});
		}, 5000);
	}
};
