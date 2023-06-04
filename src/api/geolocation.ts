export const getGeolocation = async () => {
	const ipKey =
		process.env.NODE_ENV === 'development' ? process.env.REACT_APP_GEO_KEY_DEV : process.env.REACT_APP_GEO_KEY_PROD;
	try {
		const fetchLocation = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${ipKey}`);
		return fetchLocation.json();
	} catch (error) {
		console.log(error);
	}
};
