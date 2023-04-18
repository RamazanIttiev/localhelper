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
	},
	typography: {
		fontFamily: 'Montserrat, sans-serif',
		allVariants: {
			color: TelegramTheme?.text_color || '#fff',
		},
		subtitle1: TelegramTheme?.hint_color || '#ccc',
		button: TelegramTheme?.button_text_color || '#fff',
	},
	components: {
		MuiDrawer: {
			styleOverrides: {
				root: {
					'& .MuiPaper-root': {
						height: '85%',
						overflow: 'visible',
					},
				},
			},
		},
	},
});
