import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { styled, Select as MuiSelect, OutlinedTextFieldProps, MenuItem, SelectProps } from '@mui/material';

import { TelegramTheme } from 'app/App';

export const StyledSelect = styled(MuiSelect)(
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

			'&-input': {
				padding: '13px 14px',
			},
			'&:hover fieldset': {
				borderColor: theme.typography.caption.color,
			},
			'&.Mui-focused fieldset': {
				borderColor: theme.typography.caption.color,
				borderWidth: '1px',
			},
		},
		'& .MuiSelect-select': {
			padding: '13px 14px',
		},
	}),
);

interface Props extends Partial<SelectProps> {
	fieldName: string;
	options: string[] | number[];
	register: UseFormRegister<any>;
	pattern?: RegExp;
	required?: boolean;
	fullWidth?: boolean;
	patternMessage?: string;
	requiredMessage?: string;
	defaultValue?: string | number;
	margin?: 'dense' | 'none' | undefined;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export const Select = ({
	sx,
	color,
	margin,
	fieldName,
	register,
	required = false,
	requiredMessage,
	pattern = new RegExp(''),
	patternMessage,
	fullWidth = true,
	defaultValue,
	options,
}: Props) => {
	return (
		<StyledSelect
			sx={{
				'& .MuiSelect-icon': {
					color: '#fff' || TelegramTheme?.button_color,
				},
				height: '56px',
				...sx,
			}}
			fullWidth={fullWidth}
			color={color || 'info'}
			margin={margin || 'dense'}
			defaultValue={defaultValue}
			{...register(fieldName, {
				required: {
					value: required,
					message: requiredMessage || '',
				},
				pattern: {
					value: pattern,
					message: patternMessage || '',
				},
			})}>
			{options.map(option => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</StyledSelect>
	);
};
