import React, { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { OutlinedTextFieldProps, styled, TextField } from '@mui/material';

import { TelegramTheme } from 'app/App';

const StyledSelect = styled(TextField)(
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
			height: '56px',

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

interface SelectProps extends Partial<OutlinedTextFieldProps> {
	fieldName: string;
	children: ReactNode;
	defaultValue: string;
	register: UseFormRegister<any>;
	margin?: 'dense' | 'none' | undefined;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export const Select = ({ sx, color, margin, fieldName, register, children, defaultValue }: SelectProps) => {
	return (
		<StyledSelect
			select
			sx={{
				...sx,
				'& .MuiSelect-icon': {
					color: '#fff' || TelegramTheme?.button_color,
				},
			}}
			color={color || 'info'}
			margin={margin || 'dense'}
			defaultValue={defaultValue}
			inputProps={{ ...register(fieldName) }}>
			{children}
		</StyledSelect>
	);
};
