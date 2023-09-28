import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { Box, CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from './theme/theme';

import './index.css';
import reportWebVitals from './reportWebVitals';

declare global {
	interface Window {
		Telegram: any;
	}
}

const queryClient = new QueryClient();

const App = lazy(() => import('./app/App'));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<CssBaseline />
				<Suspense
					fallback={
						<Box
							sx={{
								top: '50%',
								right: ' 50%',
								position: 'absolute',
								transform: 'translate(50%, -50%)',
							}}>
							<CircularProgress color={'primary'} />
						</Box>
					}>
					<App />
				</Suspense>
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
