import { Telegram } from 'app/App';
import { mapRecords } from 'utils/mappers';

import { UserData, UserDB } from 'models/user.model';

import { apiRequest } from 'api/api';

const findUser = (users: UserDB[]) => {
	return users.find(user => user.id === Telegram.initDataUnsafe.user?.id.toString());
};

export const fetchUser = async () => {
	const url = process.env.REACT_APP_USERS_URL || '';

	const headers = {
		Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
	};

	const resolvedUsers = await apiRequest(url, 'GET', headers);

	return findUser(mapRecords(resolvedUsers.records));
};

export const saveUserInfo = async (userData: UserData) => {
	const { userAddress, userName, userHotel, userPhone } = userData;
	const url = process.env.REACT_APP_USERS_URL || '';

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
	};

	const body = {
		fields: {
			name: userName,
			hotel: userHotel,
			phone: userPhone,
			address: userAddress,
			id: Telegram.initDataUnsafe.user?.id.toString(),
		},
	};

	return await apiRequest(url, 'POST', headers, body);
};
