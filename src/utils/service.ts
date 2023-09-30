export const openTelegram = () => {
	window.open(process.env.REACT_APP_MAIN_BOT_URL || '', '_blank');
};

export const computeAmount = (rate: number, amountToChange: number) => {
	return rate * amountToChange;
};
