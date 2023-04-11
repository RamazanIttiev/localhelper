import { Telegram } from '../app/App';

export const webAppIsReady = () => Telegram.WebApp.ready();
export const expandWebApp = () => Telegram.WebApp.expand();
export const enableWebAppClosingConfirmation = () => Telegram.WebApp.enableClosingConfirmation();
export const showBackButton = () => Telegram.WebApp.BackButton.show();
export const hideBackButton = () => Telegram.WebApp.BackButton.hide();
// export const handleBackButton = () =>
// 	Telegram.WebApp.onEvent('backButtonClicked', () => {
// 		navigate(-1);
// 	});
