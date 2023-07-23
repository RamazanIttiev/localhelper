import { apiRequest } from './api';

export const getGeolocation = async () => {
	const ipKey = process.env.REACT_APP_GEO_API_KEY || '';

	try {
		return await apiRequest(`https://api.ipgeolocation.io/ipgeo?apiKey=${ipKey}`, 'GET', {});
	} catch (error) {
		console.log(error);
	}
};
