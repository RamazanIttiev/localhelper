import { UseFormRegister } from 'react-hook-form';

import { OutlinedTextFieldProps, styled, TextField } from '@mui/material';

export const StyledInput = styled(TextField)(
	`
  background: #303030;
  font-size: 0.8rem !important;
  color: #fff;
  border-radius: 8px;
  width: 100%;
  box-shadow: none;
  margin-top: 0;
  margin-bottom: 0;
  `,

	({ theme }) => ({
		'& .MuiOutlinedInput-root': {
			color: theme.palette.text,

			'&:hover fieldset': {
				borderColor: theme.typography.caption.color,
			},
			'&.Mui-focused fieldset': {
				borderColor: theme.typography.caption.color,
				borderWidth: '1px',
			},
		},

		'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
			display: 'none',
		},
		'& input[type=number]': {
			MozAppearance: 'textfield',
		},
	}),
);

interface Props extends Partial<OutlinedTextFieldProps> {
	type: string;
	fieldName: string;
	register: UseFormRegister<any>;
	placeholder: string;
	error?: boolean;
	pattern?: RegExp;
	minLength?: string | number;
	minLengthMessage?: string;
	required?: boolean;
	fullWidth?: boolean;
	patternMessage?: string;
	requiredMessage?: string;
	defaultValue?: string | number;
	margin?: 'dense' | 'none' | undefined;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export const Input = ({
	sx,
	color,
	margin,
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
			sx={{ ...sx }}
			error={error}
			fullWidth={fullWidth}
			color={color || 'info'}
			margin={margin || 'dense'}
			defaultValue={defaultValue}
			placeholder={placeholder}
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
