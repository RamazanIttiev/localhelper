import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

export const useGeolocation = () => {
	const { pathname } = useLocation();
	const [geolocation, setGeolocation] = useState();

	const fetchData = useCallback(async () => {
		const data = await getGeolocation();

		setGeolocation(data);
	}, []);

	useEffect(() => {
		fetchData().catch(console.error);
	}, [pathname, fetchData]);

	return geolocation;
};
