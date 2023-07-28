import { ErrorType } from '../models/error.model';
import { setHaptic } from './webApp-actions';
import { sendWebAppDeepLink } from '../api/telegram';
import { Dispatch } from 'react';
import { Actions } from '../utils/reducers';

export const handleFormSubmit = async (dispatch: Dispatch<any>, flowId: string, order: any): Promise<any> => {
	try {
		dispatch({ type: Actions.START_LOADING });

		const result = await sendWebAppDeepLink(flowId, order);

		dispatch({ type: Actions.STOP_LOADING });
		dispatch({ type: Actions.SET_ERROR, payload: { isError: !result.ok } });
	} catch (error) {
		dispatch({ type: Actions.STOP_LOADING });
		dispatch({ type: Actions.SET_ERROR, payload: { isError: true } });
	}
};

export const handleOrder = async (
	flowId: string,
	order: any,
	handleLoading: (value: boolean) => void,
	handleError: (value: ErrorType) => void,
) => {
	setHaptic('light');
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
