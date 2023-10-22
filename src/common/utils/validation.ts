import { addDays } from 'utils/date';

export const nameInputValidation = {
	fieldName: 'userName',
	requiredMessage: 'Name is required',
	pattern: /^[a-zA-Z]+$/,
	patternMessage: "I guess that's not a valid name...",
	placeholder: 'John',
};

export const phoneInputValidation = {
	fieldName: 'userPhone',
	requiredMessage: 'I need your phone number',
	pattern: /^[0-9+-]+$/,
	patternMessage: "I think your phone number isn't correct...",
	placeholder: '8 999 777 03 02',
	minLength: 8,
	minLengthMessage: 'Your phone number is too short',
};

export const dateRangeValidation = {
	startPlaceholderText: new Date().toLocaleDateString(),
	endPlaceholderText: addDays(new Date(), 3),
	endValidationText: 'Select rental end date',
	startValidationText: 'When do you need the bike?',
};

export const addressValidation = {
	fieldName: 'userAddress',
	placeholder: 'Weligama, W 15',
	requiredMessage: 'Address is required',
};
