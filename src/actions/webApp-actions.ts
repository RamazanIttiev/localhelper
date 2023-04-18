import { Telegram } from '../app/App';
import { NavigateFunction } from 'react-router-dom';

export const webAppIsReady = () => Telegram.ready();
export const expandWebApp = () => Telegram.expand();
export const enableWebAppClosingConfirmation = () => Telegram.enableClosingConfirmation();
export const showBackButton = () => Telegram.BackButton.show();
export const hideBackButton = () => Telegram.BackButton.hide();
export const setHaptic = (state: string) => Telegram.HapticFeedback.impactOccurred(state);
export const handleBackButton = (navigate: NavigateFunction) => {
	setHaptic('light');
	Telegram.onEvent('backButtonClicked', () => {
		navigate(-1);
	});
};
