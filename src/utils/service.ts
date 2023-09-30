export const openTelegram = () => {
	window.open(process.env.REACT_APP_MAIN_BOT_URL || '', '_blank');
};

export const computeAmount = (rate: number, amountToChange: number) => {
	return rate * amountToChange;
};

export const addOpacityToHexColor = (hexColor: string, opacity: number) => {
	// Convert the HEX color to RGB
	const r = parseInt(hexColor.slice(1, 3), 16);
	const g = parseInt(hexColor.slice(3, 5), 16);
	const b = parseInt(hexColor.slice(5, 7), 16);

	// Ensure opacity is in the range [0, 1]
	const validOpacity = Math.min(Math.max(opacity, 0), 1);

	// Calculate the new RGB values with opacity
	const newR = Math.round(r * (1 - validOpacity) + 255 * validOpacity);
	const newG = Math.round(g * (1 - validOpacity) + 255 * validOpacity);
	const newB = Math.round(b * (1 - validOpacity) + 255 * validOpacity);

	// Convert the new RGB values back to HEX
	return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB
		.toString(16)
		.padStart(2, '0')}`;
};
