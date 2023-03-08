import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		primary: { main: '#ff335f' },
	},
	typography: {
		fontFamily: 'Montserrat, sans-serif',
	},
	components: {
		// Name of the component

		MuiButtonBase: {
			styleOverrides: {
				// Name of the slot
				root: {
					'& .Mui-selected': {
						// Some CSS
						color: '#fff',
					},
				},
			},
		},
	},
});
