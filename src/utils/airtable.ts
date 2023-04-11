export const getAirtableView = (tableTitle: string | undefined) => {
	switch (tableTitle) {
		case 'food': {
			return 'ZGw6MTQ0NjE1';
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
		case 'transport': {
			return 'ZGw6MTM2Nzcz';
		}
		default: {
			return 'ZGw6MTQ0NjE1';
		}
	}
};
