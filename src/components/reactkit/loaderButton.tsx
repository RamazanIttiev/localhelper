import React from 'react';
import { LoadingButton } from '@mui/lab';
import { ErrorType } from '../../models/error';
import { styled, Typography } from '@mui/material';

interface LoaderButtonProps {
	loading: boolean;
	errorState: ErrorType;
	text?: string | number;
	handleClick: () => void;
	styles?: React.CSSProperties;
	textStyles?: React.CSSProperties;
}

export const CustomLoadingButton = styled(LoadingButton)(() => ({
	'&.Mui-disabled': {
		'& > div': {
			color: '#fff',
		},
	},
}));

export const LoaderButton = ({ loading, errorState, handleClick, styles, text, textStyles }: LoaderButtonProps) => {
	return (
		<CustomLoadingButton
			loading={loading}
			color={errorState.isError ? 'error' : errorState.isError !== null ? 'success' : 'primary'}
			sx={{ height: '36px', textTransform: 'inherit', ...styles }}
			variant={'contained'}
			fullWidth
			onClick={handleClick}>
			{errorState.isError
				? errorState.message
				: errorState.isError !== null
				? errorState.message
				: !loading && (
						<Typography
							variant={'button'}
							sx={{
								fontWeight: '600',
								letterSpacing: '0.1rem',
								...textStyles,
							}}>
							{text}
						</Typography>
				  )}
		</CustomLoadingButton>
	);
};
