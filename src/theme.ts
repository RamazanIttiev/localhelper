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
		text: { primary: '#fff' },
		info: { main: TelegramTheme?.hint_color || '#ccc' },
		success: { main: '#00ff0d' },
		error: { main: '#ff0000' },
	},
	typography: {
		// fontFamily:
		// 	'Martian Grotesk,Helvetica Neue,Martian Grotesk Fallback,Hiragino Sans,Hiragino Kaku Gothic Pro,游ゴシック,游ゴシック体,YuGothic,Yu Gothic,ＭＳ ゴシック,MS Gothic,sans-serif',

		fontFamily: 'Montserrat, sans-serif',
		allVariants: {
			color: TelegramTheme?.text_color || '#fff',
		},
		subtitle1: { fontSize: '1.5rem' },
		subtitle2: { fontSize: '1.25rem' },
		body1: {
			fontSize: '1rem',
		},
		body2: {
			fontSize: '0.75rem',
			color: TelegramTheme?.hint_color || '#ccc',
		},
		caption: {
			fontSize: '0.75rem',
			color: TelegramTheme?.hint_color || '#ccc',
		},
		button: { fontSize: '1rem', color: TelegramTheme?.button_text_color || '#fff' },
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
		MuiOutlinedInput: {
			styleOverrides: {
				input: {
					'&:-webkit-autofill': {
						'-webkit-box-shadow': `0 0 0 100px ${TelegramTheme?.button_color || '#303030'} inset`,
						'-webkit-text-fill-color': '#fff',
					},
				},
			},
		},
	},
});
