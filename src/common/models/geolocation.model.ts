export type CountryCode = 'LKR' | 'IN' | '';

interface RESTGeoLocationProps {
	country_code2: CountryCode;
}

export interface GeoLocationProps {
	userCountry: CountryCode;
}

type ErrorMessage = string;

export type GeoLocation = GeoLocationProps | ErrorMessage;
export type RESTGeoLocation = RESTGeoLocationProps | ErrorMessage;
