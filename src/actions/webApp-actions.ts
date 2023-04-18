import { Telegram } from '../app/App';

export const webAppIsReady = () => Telegram.ready();
export const expandWebApp = () => Telegram.expand();
export const enableWebAppClosingConfirmation = () => Telegram.enableClosingConfirmation();
export const showBackButton = () => Telegram.BackButton.show();
export const hideBackButton = () => Telegram.BackButton.hide();
export const showMainButton = () => Telegram.MainButton.show();
export const hideMainButton = () => Telegram.MainButton.hide();
export const setMainButtonText = (text: string) => Telegram.MainButton.setText(text);
export const setHaptic = (state: string) => Telegram.HapticFeedback.impactOccurred(state);
export const handleBackButton = (callback: () => void) => {
	setHaptic('light');
	Telegram.onEvent('backButtonClicked', callback);
};
export const handleMainButton = (callback: () => void) => {
	setHaptic('light');
	Telegram.onEvent('mainButtonClicked', callback);
};
