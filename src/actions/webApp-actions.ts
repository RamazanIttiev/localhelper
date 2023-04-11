import { Telegram } from '../app/App';
import { NavigateFunction } from 'react-router-dom';

export const webAppIsReady = () => Telegram.WebApp.ready();
export const expandWebApp = () => Telegram.WebApp.expand();
export const enableWebAppClosingConfirmation = () => Telegram.WebApp.enableClosingConfirmation();
export const showBackButton = () => Telegram.WebApp.BackButton.show();
export const hideBackButton = () => Telegram.WebApp.BackButton.hide();

export const handleBackButton = (navigate: NavigateFunction) =>
	Telegram.WebApp.onEvent('backButtonClicked', () => {
		navigate(-1);
	});
