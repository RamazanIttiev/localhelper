import { GeoLocation, RESTGeoLocation } from 'common/models/geolocation.model';

export const mapRecords = (records: any[]) => {
	return records.map(item => item.fields);
};

export const mapGeolocation = (geolocation: RESTGeoLocation): GeoLocation => {
	if (typeof geolocation === 'string') {
		return geolocation;
	}
	return {
		userCountry: geolocation.country_code2,
	};
};
