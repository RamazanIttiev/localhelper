export const useAirtableView = (tableTitle: string | undefined) => {
	switch (tableTitle) {
		case 'food': {
			return 'ZGw6MTI0OTQ3';
		}
		case 'flowers': {
			return 'ZGw6MTI3MjY5';
		}
		case 'rent': {
			return 'ZGw6MTI1Mjg2';
		}
		case 'tours': {
			return 'ZGw6MTI5Mzc1';
		}
		default: {
			return 'ZGw6MTI0OTQ3';
		}
	}
};
