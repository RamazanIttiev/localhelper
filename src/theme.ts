import { createTheme } from '@mui/material';

import { WebAppTheme } from 'app/App';

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
			};
			fontSize: {
				largeTitle: string;
				title1: string;
				title2: string;
				title3: string;
				body: string;
				caption: string;
			};
			fontFamily: string;
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
			bg_color: WebAppTheme?.bg_color || '#0E0E0E',
			secondary_bg_color: WebAppTheme?.secondary_bg_color || '#1C1C1D',
			text_color: WebAppTheme?.text_color || '#fff',
			hint_color: WebAppTheme?.hint_color || '#B1C3D5',
			link_color: WebAppTheme?.link_color || '#696969',
			button_color: WebAppTheme?.button_color || '#696969',
			button_text_color: WebAppTheme?.button_text_color || '#fff',
		},
		fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
		fontSize: {
			largeTitle: '34px',
			title1: '28px',
			title2: '22px',
			title3: '20px',
			body: '17px',
			caption: '16px',
		},
		fontWeight: { normal: '400', bold: '700', extraBold: '900' },
		borderRadius: {
			actionButton: '8px',
			base: '12px',
		},
		height: '44px',
	},
	palette: {
		action: {
			selected: '#fff',
			disabled: '#777777',
		},
		text: {
			primary: WebAppTheme?.text_color || '#fff',
		},
		background: {
			default: WebAppTheme?.bg_color || '#0E0E0E',
		},
		success: { main: '#71E079' },
		error: { main: '#DE3A3A' },
		warning: { main: '#F3C04B' },
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
						'-webkit-box-shadow': `0 0 0 100px ${WebAppTheme?.button_color || '#303030'} inset`,
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
						color: WebAppTheme?.hint_color || '#B1C3D5',
					},
				},
			},
		},
	},
});
