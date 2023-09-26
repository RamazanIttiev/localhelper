import { UseFormRegister } from 'react-hook-form';

import { OutlinedTextFieldProps, styled, Input as MuiInput, SxProps } from '@mui/material';

export const StyledInput = styled(MuiInput, {
	shouldForwardProp: prop => prop !== 'disableUnderline',
})(``, ({ theme }) => ({
	background: theme.tg_theme.palette.secondary_bg_color,
	color: theme.tg_theme.palette.text_color,
	borderRadius: theme.tg_theme.borderRadius.base,
	fontSize: theme.tg_theme.fontSize.body,
	height: theme.tg_theme.height,
	padding: '8px 16px',
	margin: '0 !important',

	'&:before': {
		content: 'unset',
	},
	'&:after': {
		content: 'unset',
	},

	'& .MuiInput-input': {
		padding: 0,
		color: theme.tg_theme.palette.text_color,
		height: theme.tg_theme.height,
		borderRadius: theme.tg_theme.borderRadius.base,

		'&:hover fieldset': {
			borderColor: theme.tg_theme.palette.secondary_bg_color,
		},
		'&.Mui-focused fieldset': {
			borderColor: theme.tg_theme.palette.secondary_bg_color,
			borderWidth: '1px',
		},
	},

	'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
		display: 'none',
	},
	'& input[type=number]': {
		MozAppearance: 'textfield',
	},
}));

interface Props extends Partial<OutlinedTextFieldProps> {
	type: string;
	fieldName: string;
	register: UseFormRegister<any>;
	error?: boolean;
	pattern?: RegExp;
	minLength?: string | number;
	minLengthMessage?: string;
	required?: boolean;
	patternMessage?: string;
	requiredMessage?: string;
	inputStyles?: SxProps;
}

export const Input = ({
	inputStyles,
	fieldName,
	register,
	minLength,
	error = false,
	minLengthMessage,
	required = false,
	requiredMessage,
	patternMessage,
	placeholder,
	fullWidth = true,
	defaultValue,
	pattern = new RegExp(''),
}: Props) => {
	return (
		<StyledInput
			sx={{ ...inputStyles }}
			error={error}
			fullWidth={fullWidth}
			defaultValue={defaultValue}
			placeholder={placeholder}
			disableUnderline
			{...register(fieldName, {
				required: {
					value: required,
					message: requiredMessage || '',
				},
				pattern: {
					value: pattern,
					message: patternMessage || '',
				},
				min: {
					value: minLength || 1,
					message: minLengthMessage || '',
				},
			})}
		/>
	);
};
