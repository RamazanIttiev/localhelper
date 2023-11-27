import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { useLocalStorage } from 'usehooks-ts';

import { GeoLocation } from 'common/models/geolocation.model';

import { geolocationQuery } from 'api/geolocation';

export const useGeoLocationService = () => {
	const { data: geo } = useQuery<GeoLocation>(geolocationQuery());

	const initialGeoLocation = useMemo(() => (process.env.NODE_ENV === 'development' ? { userCountry: 'LKR' } : geo), [
		geo,
	]);

	const [geoLocation, setGeoLocation] = useLocalStorage<GeoLocation | undefined>('geoLocation', initialGeoLocation);

	useEffect(() => {
		setGeoLocation(initialGeoLocation);
	}, [initialGeoLocation, setGeoLocation]);

	return geoLocation;
};
