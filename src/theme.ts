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
		error: { main: '#ff8a8a' },
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
			fontSize: '0.8rem',
			letterSpacing: '1.5px',
			color: TelegramTheme?.hint_color || '#ccc',
		},
		caption: {
			fontSize: '0.75rem',
			color: TelegramTheme?.hint_color || '#ccc',
		},
		button: {
			fontSize: '0.75rem',
			color: TelegramTheme?.button_text_color || '#fff',
			letterSpacing: '0.1rem',
			fontWeight: 600,
		},
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
						'-webkit-background-clip': 'text',
					},
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				// Name of the component ⚛️ / style sheet
				root: {
					// Name of the rule
					color: '#fff',
					'&.Mui-focused': {
						// increase the specificity for the pseudo class
						color: '#fff',
					},
				},
			},
		},
	},
});
