import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { CssBaseline, ThemeProvider } from '@mui/material';

import App from 'app/App.tsx';

import { theme } from 'ui/theme/theme.ts';

import './index.css';
import reportWebVitals from './reportWebVitals.ts';

declare global {
	interface Window {
		Telegram: any;
	}
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<CssBaseline />
				<App />
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
