import { ErrorType } from '../models/error';
import { setHaptic } from './webApp-actions';
import { sendWebAppDeepLink } from '../utils/requests';
import { CartOrderData, SingleOrderData } from '../models/orderData';
import { UserData } from '../models/userModel';

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

export const fetchAirtableData = async (tableName: string) => {
	const categories = await fetch(`https://api.airtable.com/v0/appN5D5g87uz2gY2j/${tableName}?view=${tableName}View`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
		},
	});
	return await categories.json();
};

export const saveUserInfo = async (userData: UserData) => {
	const { userAddress, userName, userHotel, userPhone } = userData;

	return await fetch('https://api.airtable.com/v0/appN5D5g87uz2gY2j/Users?view=UsersView', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
		},
		body: JSON.stringify({
			fields: {
				Name: userName,
				Hotel: userHotel,
				Phone: userPhone,
				Address: userAddress,
			},
		}),
	});
};
