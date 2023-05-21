import { Telegram } from '../app/App';
import CryptoJS from 'crypto-js';

const verifyInitData = (telegramInitData: string): boolean => {
	const initData = new URLSearchParams(telegramInitData);
	const hash = initData.get('hash');
	const dataToCheck: string[] = [];

	initData.sort();
	initData.forEach((val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`));

	const secret = CryptoJS.HmacSHA256(process.env.REACT_APP_BOT_ID || '', 'WebAppData');
	const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(CryptoJS.enc.Hex);

	return _hash === hash;
};

export const webAppIsReady = () => Telegram.ready();
export const expandWebApp = () => Telegram.expand();
export const enableWebAppClosingConfirmation = () => Telegram.enableClosingConfirmation();
export const showBackButton = () => Telegram.BackButton.show();
export const hideBackButton = () => Telegram.BackButton.hide();
export const showMainButton = () => Telegram.MainButton.show();
export const hideMainButton = () => Telegram.MainButton.hide();
export const setMainButtonText = (text: string) => Telegram.MainButton.setText(text);
export const setHaptic = (state: string) => Telegram.HapticFeedback.impactOccurred(state);
export const disableMainButton = (text: string) => {
	Telegram.MainButton.disable();
	Telegram.MainButton.setParams({
		text,
		color: '#292929',
		text_color: '#ccc',
	});
};
export const handleBackButton = (callback: () => unknown) => {
	setHaptic('light');
	Telegram.onEvent('backButtonClicked', callback);
};
export const handleMainButton = (callback: () => unknown) => {
	setHaptic('light');
	Telegram.onEvent('mainButtonClicked', callback);
};
export const enableMainButton = () => Telegram.MainButton.enable();
export const removeMainButtonEvent = (callback: () => unknown) => {
	setHaptic('light');
	Telegram.offEvent('mainButtonClicked', callback);
};
export const fetchTelegramUser = () => {
	if (verifyInitData(Telegram.initData)) {
		return JSON.stringify(Telegram.initData);
	}
	return {};
};
