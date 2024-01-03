import { useEffect, useMemo } from 'react';

import { useLocalStorage } from 'usehooks-ts';

import { GeoLocation } from 'common/models/geolocation.model';

export const useGeoLocationService = () => {
	const initialGeoLocation = useMemo(() => ({ userCountry: 'LKR' }), []);

	const [geoLocation, setGeoLocation] = useLocalStorage<GeoLocation | undefined>('geoLocation', initialGeoLocation);

	useEffect(() => {
		setGeoLocation(initialGeoLocation);
	}, [initialGeoLocation, setGeoLocation]);

	return geoLocation;
};
