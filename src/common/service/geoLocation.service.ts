import { useMemo, useEffect } from 'react';

import { useLocalStorage } from 'usehooks-ts';

import { CountryCode, GeoLocation } from 'common/models/geolocation.model.ts';

export const useGeoLocationService = () => {
	const initialGeoLocation = useMemo(() => ({ userCountry: 'LKR' as CountryCode }), []);

	const [geoLocation, setGeoLocation] = useLocalStorage<GeoLocation | undefined>('geoLocation', initialGeoLocation);

	useEffect(() => {
		setGeoLocation(initialGeoLocation);
	}, [initialGeoLocation, setGeoLocation]);

	return geoLocation;
};
