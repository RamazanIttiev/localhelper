import { createTheme } from '@mui/material';
import { TelegramTheme } from './app/App';

export const theme = createTheme({
	palette: {
		primary: { main: TelegramTheme?.button_color || '#0088CC' },
		secondary: { main: TelegramTheme?.bg_color || '#212121' },
		background: {
			default: TelegramTheme?.bg_color || '#212121',
			paper: TelegramTheme?.button_color || '#303030',
		},
		info: { main: TelegramTheme?.hint_color || '#fff' },
		success: { main: '#00ff0d' },
		error: { main: '#ff0000' },
	},
	typography: {
		fontFamily: 'Montserrat, sans-serif',
		allVariants: {
			color: TelegramTheme?.text_color || '#fff',
		},
		caption: {
			fontSize: '0.8rem',
			color: TelegramTheme?.hint_color || '#ccc',
		},
		subtitle1: { fontSize: '1.2rem' },
		body1: {
			fontSize: '1rem',
		},
		body2: {
			fontSize: '0.8rem',
		},
		button: TelegramTheme?.button_text_color || '#fff',
	},
	components: {
		MuiDrawer: {
			styleOverrides: {
				root: {
					'& .MuiPaper-root': {
						borderTopRightRadius: '1rem',
						borderTopLeftRadius: '1rem',
					},
				},
			},
		},
	},
});
