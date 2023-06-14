import { apiRequest } from './api';
import { OpenCageGeoProps } from '../models/geolocation.model';

const geolocationSuccess = (pos: GeolocationPosition) => {
	return `${pos.coords.latitude},${pos.coords.longitude}`;
};

const geolocationError = (err: GeolocationPositionError) => {
	return new Error(`ERROR(${err.code}): ${err.message}`);
};

const getCoordinates = () => {
	const options = {
		enableHighAccuracy: true,
	};

	return new Promise<string>((resolve, reject) => {
		// check to make sure geolocation is possible
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					resolve(geolocationSuccess(position));
				},
				(error: GeolocationPositionError) => {
					reject(geolocationError(error));
				},
				options,
			);
		} else {
			reject(new Error('Geolocation is not supported'));
		}
	});
};

export const getGeolocation = async (): Promise<OpenCageGeoProps | string> => {
	try {
		const query = await getCoordinates();

		const api_url = process.env.REACT_APP_GEO_URL || '';
		const apikey = process.env.REACT_APP_GEO_API_KEY || '';

		const request_url = `${api_url}?key=${apikey}&q=${query}&pretty=1&no_annotations=1`;

		const response = await apiRequest(request_url, 'GET', {});
		return response as OpenCageGeoProps;
	} catch {
		return 'Please provide an access to your geolocation for this service';
	}
};
