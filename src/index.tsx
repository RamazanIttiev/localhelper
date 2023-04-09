import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Box, CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import { theme } from './theme';

declare global {
	interface Window {
		Telegram: any;
	}
}

const App = lazy(() => import('./app/App'));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
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
			</Router>
		</ThemeProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
