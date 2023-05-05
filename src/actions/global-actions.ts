import { ErrorType } from '../models/error';
import { setHaptic } from './webApp-actions';
import { sendWebAppDeepLink } from '../utils/requests';
import { CartOrderData, SingleOrderData } from '../models/orderData';

export const handleOrder = async (
	flowId: string,
	order: CartOrderData | SingleOrderData,
	handleLoading: (value: boolean) => void,
	handleError: (value: ErrorType) => void,
) => {
	setHaptic('light');
	handleLoading(true);
	try {
		const result = await sendWebAppDeepLink(flowId, 'lhelper', order);
		if (result.ok) {
			handleLoading(false);
			handleError({ isError: false });
		} else {
			handleLoading(false);
			handleError({
				isError: true,
			});
		}
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

export const getGeolocation = async () => {
	const ipKey =
		process.env.NODE_ENV === 'development' ? process.env.REACT_APP_GEO_KEY_DEV : process.env.REACT_APP_GEO_KEY_PROD;
	try {
		const fetchLocation = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${ipKey}`);
		return fetchLocation.json();
	} catch (error) {
		console.log(error);
	}
};
