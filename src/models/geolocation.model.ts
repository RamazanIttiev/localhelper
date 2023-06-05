export enum COUNTRY_CODE {
	India = 'IN',
}

export interface GeoLocationProps {
	city: string;
	country_name: string;
	country_code2: COUNTRY_CODE;
	currency: {
		code: string;
	};
}
