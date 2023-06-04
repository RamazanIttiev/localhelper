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
