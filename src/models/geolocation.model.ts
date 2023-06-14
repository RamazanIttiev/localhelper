export enum COUNTRY_CODE {
	India = 'in',
	Russia = 'ru',
}

export interface OpenCageGeoProps {
	results: {
		components: {
			country: string;
			city: string;
			country_code: string;
		};
		geometry: {
			lat: string;
			lng: string;
		};
	}[];
}

export interface GeoProps {
	country: string;
	city: string;
	country_code: string;
	geometry: {
		lat: string;
		lng: string;
	};
}
