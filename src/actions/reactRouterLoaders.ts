import { defer } from 'react-router-dom';
import { resolveAppData } from '../api/api';
import { fetchTelegramUser } from './webApp-actions';

export const loadAppData = async () => {
	const appData = await resolveAppData();

	return defer({ appData });
};

export const loadUserData = () => {
	return fetchTelegramUser();
};
