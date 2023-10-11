export interface AmountToChangeValidation {
	required: boolean;
	fieldName: string;
	requiredMessage: string;
	pattern: RegExp;
	patternMessage: string;
}

export const amountToChangeValidation: AmountToChangeValidation = {
	required: true,
	fieldName: 'amountToChange',
	requiredMessage: 'How much do you want to change?',
	pattern: /^[0-9+-]+$/,
	patternMessage: 'Wrong input',
};
