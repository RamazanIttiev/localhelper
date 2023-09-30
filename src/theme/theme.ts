import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
	interface CustomTheme {
		tg_theme: {
			palette: {
				bg_color: string;
				secondary_bg_color: string;
				text_color: string;
				hint_color: string;
				link_color: string;
				button_color: string;
				button_text_color: string;
				button_hover_color: string;
			};
			fontSize: {
				extraLargeTitle: string;
				largeTitle: string;
				title1: string;
				title2: string;
				title3: string;
				body: string;
				info: string;
				caption: string;
			};
			fontWeight: { normal: string; bold: string; extraBold: string };
			borderRadius: {
				actionButton: string;
				base: string;
			};
			height: string;
		};
	}

	interface Theme extends CustomTheme {}

	interface ThemeOptions extends CustomTheme {}
}

export const theme = createTheme({
	tg_theme: {
		palette: {
			bg_color: window.Telegram.WebApp.theme_params?.bg_color || '#1a1a1a',
			secondary_bg_color: window.Telegram.WebApp.theme_params?.secondary_bg_color || '#1C1C1D',
			text_color: window.Telegram.WebApp.theme_params?.text_color || '#fff',
			hint_color: window.Telegram.WebApp.theme_params?.hint_color || '#B1C3D5',
			link_color: window.Telegram.WebApp.theme_params?.link_color || '#696969',
			button_color: window.Telegram.WebApp.theme_params?.button_color || '#696969',
			button_text_color: window.Telegram.WebApp.theme_params?.button_text_color || '#fff',
			button_hover_color: 'rgba(0, 0, 0, 0.04)',
		},
		fontSize: {
			extraLargeTitle: '56px',
			largeTitle: '34px',
			title1: '28px',
			title2: '22px',
			title3: '20px',
			body: '16px',
			info: '14px',
			caption: '12px',
		},
		fontWeight: { normal: '400', bold: '700', extraBold: '900' },
		borderRadius: {
			actionButton: '8px',
			base: '12px',
		},
		height: '44px',
	},
	palette: {
		primary: {
			main: window.Telegram.WebApp.theme_params?.text_color || '#fff',
		},
		action: {
			selected: '#fff',
			disabled: '#777777',
		},
		text: {
			primary: window.Telegram.WebApp.theme_params?.text_color || '#fff',
		},
		background: {
			default: window.Telegram.WebApp.theme_params?.secondary_bg_color || '#1C1C1D',
		},
		success: { main: '#71E079' },
		error: { main: '#DE3A3A' },
		warning: { main: '#F3C04B' },
	},

	typography: {
		fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
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
						'-webkit-box-shadow': `0 0 0 100px ${
							window.Telegram.WebApp.theme_params?.button_color || '#303030'
						} inset`,
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
						color: window.Telegram.WebApp.theme_params?.hint_color || '#B1C3D5',
					},
				},
			},
		},
	},
});
