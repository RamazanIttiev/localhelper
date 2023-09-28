import { TgUser, TgTheme, TgWebApp } from 'app/App';

import CryptoJS from 'crypto-js';

import { WebAppHapticFeedback, WebAppUser } from 'theme/types';

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

export const webAppIsReady = () => TgWebApp.ready();
export const expandWebApp = () => TgWebApp.expand();
export const enableWebAppClosingConfirmation = () => TgWebApp.enableClosingConfirmation();
export const showBackButton = () => TgWebApp.BackButton.show();
export const hideBackButton = () => TgWebApp.BackButton.hide();
export const showMainButton = () => TgWebApp.MainButton.show();
export const hideMainButton = () => TgWebApp.MainButton.hide();
export const setMainButtonText = (text: string) => TgWebApp.MainButton.setText(text);
export const setHaptic = (state: WebAppHapticFeedback) => TgWebApp.HapticFeedback.impactOccurred(state);
export const disableMainButton = (text: string) => {
	TgWebApp.MainButton.disable();
	TgWebApp.MainButton.setParams({
		text,
		color: '#292929',
		text_color: '#ccc',
	});
};
export const handleBackButton = (callback: () => unknown) => {
	TgWebApp.onEvent('backButtonClicked', callback);
};
export const handleMainButton = (callback: () => unknown) => {
	TgWebApp.onEvent('mainButtonClicked', callback);
};
export const enableMainButton = () => {
	TgWebApp.MainButton.enable();
	TgWebApp.MainButton.setParams({
		color: TgTheme?.button_color,
		text_color: TgTheme?.text_color,
	});
};
export const removeMainButtonEvent = (callback: () => unknown) => {
	TgWebApp.offEvent('mainButtonClicked', callback);
};
export const getTelegramUser = (): WebAppUser | undefined => {
	if (verifyInitData(TgWebApp.initData)) {
		return TgUser;
	}
};
