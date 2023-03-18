import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		primary: { main: '#0088CC' },
		secondary: { main: '#212121' },
		background: {
			default: '#212121',
		},
	},
	typography: {
		fontFamily: 'Montserrat, sans-serif',
		allVariants: {
			color: '#fff',
		},
	},
});
