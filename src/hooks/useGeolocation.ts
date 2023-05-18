import { useCallback, useEffect, useState } from 'react';
import { getGeolocation } from '../actions/global-actions';
import { useLocation } from 'react-router-dom';

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
