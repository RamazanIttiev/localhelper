import { useQuery } from '@tanstack/react-query';
import { useMemo, useEffect } from 'react';

import { useLocalStorage } from 'usehooks-ts';

import { CountryCode, GeoLocation } from 'common/models/geolocation.model.ts';

import { geolocationQuery } from 'api/geolocation.ts';

export const useGeoLocationService = () => {
	const { data: geo } = useQuery<GeoLocation>(geolocationQuery());

	const initialGeoLocation = useMemo(
		() => (import.meta.env.NODE_ENV === 'development' ? { userCountry: 'LKR' as CountryCode } : geo),
		[geo],
	);

	const [geoLocation, setGeoLocation] = useLocalStorage<GeoLocation | undefined>('geoLocation', initialGeoLocation);

	useEffect(() => {
		setGeoLocation(initialGeoLocation);
	}, [initialGeoLocation, setGeoLocation]);

	return geoLocation;
};
