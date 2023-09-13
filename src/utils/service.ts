export const openTelegram = () => {
	window.open(process.env.REACT_APP_MAIN_BOT_URL || '', '_blank');
};
