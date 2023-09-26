import { TelegramUser, WebApp, WebAppTheme } from 'app/App';

import CryptoJS from 'crypto-js';

export const verifyInitData = (telegramInitData: string): boolean => {
	const initData = new URLSearchParams(telegramInitData);
	const hash = initData.get('hash');
	const dataToCheck: string[] = [];

	initData.sort();
	initData.forEach((val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`));

	const secret = CryptoJS.HmacSHA256(process.env.REACT_APP_BOT_ID || '', 'WebAppData');
	const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(CryptoJS.enc.Hex);

	return _hash === hash;
};

export const webAppIsReady = () => WebApp.ready();
export const expandWebApp = () => WebApp.expand();
export const enableWebAppClosingConfirmation = () => WebApp.enableClosingConfirmation();
export const showBackButton = () => WebApp.BackButton.show();
export const hideBackButton = () => WebApp.BackButton.hide();
export const showMainButton = () => WebApp.MainButton.show();
export const hideMainButton = () => WebApp.MainButton.hide();
export const setMainButtonText = (text: string) => WebApp.MainButton.setText(text);
export const setHaptic = (state: string) => WebApp.HapticFeedback.impactOccurred(state);
export const disableMainButton = (text: string) => {
	WebApp.MainButton.disable();
	WebApp.MainButton.setParams({
		text,
		color: '#292929',
		text_color: '#ccc',
	});
};
export const handleBackButton = (callback: () => unknown) => {
	WebApp.onEvent('backButtonClicked', callback);
};
export const handleMainButton = (callback: () => unknown) => {
	WebApp.onEvent('mainButtonClicked', callback);
};
export const enableMainButton = () => {
	WebApp.MainButton.enable();
	WebApp.MainButton.setParams({
		color: WebAppTheme?.button_color,
		text_color: WebAppTheme?.text_color,
	});
};
export const removeMainButtonEvent = (callback: () => unknown) => {
	WebApp.offEvent('mainButtonClicked', callback);
};
export const fetchTelegramUser = () => {
	if (verifyInitData(WebApp.initData)) {
		return TelegramUser;
	}
	return {};
};
