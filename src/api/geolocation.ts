import { apiRequest } from './api';

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

export const getGeolocation = async () => {
	try {
		const query = await getCoordinates();

		// now we have coordinates, it is time to use them to
		// do some reverse geocoding to get back the location information
		const api_url = process.env.REACT_APP_GEO_URL || '';
		const apikey = process.env.REACT_APP_GEO_API_KEY || '';

		const request_url = `${api_url}?key=${apikey}&q=${query}&pretty=1&no_annotations=1`;

		return await apiRequest(request_url, 'GET', {});
	} catch (error) {
		// Handle any errors that occurred during geolocation or API request
		console.log(error);
	}
};
