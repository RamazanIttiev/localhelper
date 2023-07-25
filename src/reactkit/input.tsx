import React, { HTMLInputTypeAttribute } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { OutlinedTextFieldProps, styled, TextField } from '@mui/material';

const StyledInput = styled(TextField)(
	`
  background: #303030;
  font-size: 0.8rem !important;
  color: #fff;
  border-radius: 8px;
  width: 100%;
  box-shadow: none;
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
	}),
);

const getValidationParams = (fieldName: string) => {
	switch (fieldName) {
		case 'userName': {
			return {
				submitErrorText: 'Name is required',
				pattern: {
					value: /^[a-zA-Z]+$/,
					message: "I guess that's not a valid name...",
				},
			};
		}
		case 'userPhone': {
			return {
				submitErrorText: 'I need your phone number',
				pattern: { value: /^[0-9+-]+$/, message: "I think your phone number isn't correct..." },
				minLength: { value: 8, message: 'Your phone number is too short' },
			};
		}
		case 'userAddress': {
			return {
				submitErrorText: 'Please write your address',
				minLength: { value: 8, message: 'The address is too short' },
			};
		}
	}
};

interface InputProps extends Partial<OutlinedTextFieldProps> {
	fieldName: string;
	required: boolean;
	placeholder: string;
	type: HTMLInputTypeAttribute;
	register: UseFormRegister<any>;
	fieldError: FieldError | undefined;
	margin?: 'dense' | 'normal' | 'none' | undefined;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export const Input = ({
	sx,
	type,
	color,
	margin,
	fieldName,
	register,
	required,
	fieldError,
	placeholder,
}: InputProps) => {
	const validationParams = getValidationParams(fieldName);

	return (
		<StyledInput
			sx={sx}
			fullWidth
			type={type}
			color={color || 'info'}
			margin={margin || 'dense'}
			error={fieldError !== undefined}
			placeholder={fieldError?.type === 'required' ? fieldError.message : placeholder}
			{...register(fieldName, {
				required: {
					value: required,
					message: validationParams?.submitErrorText || '',
				},
				pattern: validationParams?.pattern,
				minLength: validationParams?.minLength,
			})}
		/>
	);
};
