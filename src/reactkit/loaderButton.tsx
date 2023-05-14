import React from 'react';
import { LoadingButton } from '@mui/lab';
import { ErrorType } from '../models/error';
import { ButtonProps, Icon, styled, Typography } from '@mui/material';

interface LoaderButtonProps extends ButtonProps {
	loading?: boolean;
	fullWidth?: boolean;
	isMainButton?: boolean;
	errorState?: ErrorType;
	text?: string | number;
	handleClick: () => void;
	styles?: React.CSSProperties;
	textStyles?: React.CSSProperties;
}

const mainButtonStyles = {
	left: 0,
	bottom: 0,
	width: '100%',
	height: '3rem',
	position: 'fixed',
	borderRadius: 'unset',
	borderBottomLeftRadius: '0.5rem',
	borderBottomRightRadius: '0.5rem',
};

export const CustomLoadingButton = styled(LoadingButton)(() => ({
	'&.Mui-disabled': {
		'& > div': {
			color: '#fff',
		},
	},
}));

export const LoaderButton = ({
	loading,
	handleClick,
	styles,
	text,
	textStyles,
	isMainButton,
	fullWidth,
	errorState = { isError: null },
}: LoaderButtonProps) => {
	const iconStyles = {
		color: '#fff',
		width: '2rem',
		height: 'auto',
		overflow: 'hidden',
		margin: '0px auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	return (
		<CustomLoadingButton
			loading={loading}
			sx={
				isMainButton
					? mainButtonStyles
					: {
							height: '36px',
							textTransform: 'inherit',
							borderRadius: '2rem',
							width: !fullWidth ? '7rem' : undefined,
							...styles,
					  }
			}
			fullWidth={fullWidth}
			variant={errorState?.isError ? 'outlined' : 'contained'}
			onClick={handleClick}>
			{errorState?.isError ? (
				<Icon fontSize={'small'} style={iconStyles}>
					sentiment_very_dissatisfied
				</Icon>
			) : errorState?.isError !== null ? (
				<Icon fontSize={'small'} style={iconStyles}>
					sentiment_satisfied
				</Icon>
			) : (
				!loading && (
					<Typography
						variant={'button'}
						sx={{
							...textStyles,
						}}>
						{text}
					</Typography>
				)
			)}
		</CustomLoadingButton>
	);
};
