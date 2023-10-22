import React, { CSSProperties } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { styled, NativeSelect, InputBase, NativeSelectProps } from '@mui/material';

import { ReactComponent as SelectIcon } from 'assets/svg/select.svg';

import { theme } from 'theme/theme';

export const StyledSelect = styled(InputBase, {
	shouldForwardProp: prop => prop !== 'disableUnderline',
})(``, ({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	minWidth: 'fit-content',
	background: theme.tg_theme.palette.bg_color,
	color: theme.tg_theme.palette.text_color,
	borderRadius: 'inherit',
	fontSize: theme.tg_theme.fontSize.body,
	height: theme.tg_theme.height,

	'& .MuiInputBase-input': {
		padding: '8px 16px 8px 0',
	},

	'&:before': {
		content: 'unset',
	},
	'&:after': {
		content: 'unset',
	},

	'& .MuiOutlinedInput-input': {
		color: theme.tg_theme.palette.text_color,
		borderRadius: theme.tg_theme.borderRadius.base,
	},
}));

interface Props extends Partial<NativeSelectProps> {
	fieldName: string;
	options: string[] | number[];
	register: UseFormRegister<any>;
	required?: boolean;
	requiredMessage?: string;
	iconSx?: CSSProperties;
}

export const Select = ({
	sx,
	fieldName,
	register,
	required = false,
	requiredMessage,
	fullWidth = false,
	defaultValue,
	options,
	iconSx,
	...props
}: Props) => {
	return (
		<NativeSelect
			sx={{
				'& .MuiNativeSelect-icon': {
					mr: '16px',
					top: 'initial',
					color: theme.tg_theme.palette.hint_color || '#fff',
					...iconSx,
				},
				...sx,
			}}
			input={<StyledSelect />}
			IconComponent={SelectIcon}
			fullWidth={fullWidth}
			defaultValue={defaultValue}
			disableUnderline
			variant={'standard'}
			{...register(fieldName, {
				required: {
					value: required,
					message: requiredMessage || '',
				},
			})}
			{...props}>
			{options.map(option => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</NativeSelect>
	);
};
