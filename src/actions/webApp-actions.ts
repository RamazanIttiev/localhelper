import { TgUser, TgWebApp } from 'app/App.tsx';

import CryptoJS from 'crypto-js';

import { WebAppUser } from 'ui/theme/types.ts';

export const verifyInitData = (telegramInitData: string): boolean => {
	const initData = new URLSearchParams(telegramInitData);
	const hash = initData.get('hash');
	const dataToCheck: string[] = [];

	initData.sort();
	initData.forEach((val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`));

	const secret = CryptoJS.HmacSHA256(import.meta.env.VITE_BOT_ID || '', 'WebAppData');
	const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(CryptoJS.enc.Hex);

	return _hash === hash;
};

export const webAppIsReady = () => TgWebApp.ready();
export const expandWebApp = () => TgWebApp.expand();
export const enableWebAppClosingConfirmation = () => TgWebApp.enableClosingConfirmation();
export const showBackButton = () => TgWebApp.BackButton.show();
export const hideBackButton = () => TgWebApp.BackButton.hide();
export const hideMainButton = () => TgWebApp.MainButton.hide();

export const getTelegramUser = (): WebAppUser | undefined => {
	if (verifyInitData(TgWebApp.initData)) {
		return TgUser;
	}
};
