import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		primary: { main: '#0088CC' },
		secondary: { main: '#212121' },
		background: {
			default: '#212121',
			paper: '#303030',
		},
	},
	typography: {
		fontFamily: 'Montserrat, sans-serif',
		allVariants: {
			color: '#fff',
		},
	},
});
