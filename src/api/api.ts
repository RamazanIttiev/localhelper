import { mapRecords } from 'utils/mappers';

import { AirtableData } from 'models/airtable.model';

type METHODS = 'GET' | 'POST' | 'DELETE';

export const apiRequest = async (url: string, method: METHODS, headers: Record<string, string>, body?: any) => {
	try {
		const response = await fetch(url, {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
		});

		if (!response.ok) {
			throw new Error('API request failed.');
		}

		return await response.json();
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`API request failed: ${error.message}`);
		}
	}
};

export const fetchAirtableData = async (airtableData: AirtableData, url: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
	};
	const resolvedData = await apiRequest(url, 'GET', headers);

	return resolvedData.records ? mapRecords(resolvedData.records) : resolvedData.fields;
};
