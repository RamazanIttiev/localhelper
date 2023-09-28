import React from 'react';
import { isMobile } from 'react-device-detect';

import { Button, ButtonProps } from '@mui/material';

import { theme } from '../theme/theme';

interface Props extends ButtonProps {
	isMainButton?: boolean;
	text?: string | number;
	handleClick: () => void;
	styles?: React.CSSProperties;
	textStyles?: React.CSSProperties;
}

const mainButtonStyles = {
	left: 0,
	bottom: 0,
	zIndex: 1,
	width: '100%',
	height: '3rem',
	position: 'fixed',
	borderRadius: '12px',
};

export const ActionButton = ({ handleClick, styles, text, fullWidth, isMainButton, disabled }: Props) => {
	return (
		<Button
			disabled={disabled}
			sx={
				isMainButton
					? mainButtonStyles
					: {
							zIndex: 1,
							height: '36px',
							textTransform: 'inherit',
							borderRadius: '8px',
							width: !fullWidth ? '7rem' : undefined,
							background: theme.tg_theme.palette.button_color,
							color: theme.tg_theme.palette.button_text_color,

							'&:hover': {
								background: theme.tg_theme.palette.button_color,
							},
							...styles,
					  }
			}
			onClick={handleClick}>
			{text}
		</Button>
	);
};
