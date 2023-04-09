import React from 'react';
import { LoadingButton } from '@mui/lab';
import { ErrorType } from '../../models/error';
import { styled, Typography } from '@mui/material';

interface LoaderButtonProps {
	loading: boolean;
	errorState: ErrorType;
	text?: string | number;
	styles?: React.CSSProperties;
	handleClick: () => void;
}

export const CustomLoadingButton = styled(LoadingButton)(() => ({
	'&.Mui-disabled': {
		'& > div': {
			color: '#fff',
		},
	},
}));

export const LoaderButton = ({ loading, errorState, handleClick, styles, text }: LoaderButtonProps) => {
	return (
		<CustomLoadingButton
			loading={loading}
			color={errorState.isError ? 'error' : errorState.isError !== null ? 'success' : 'primary'}
			sx={{ marginTop: 3, borderRadius: 2, textTransform: 'inherit', height: 32, ...styles }}
			variant={'contained'}
			fullWidth
			onClick={handleClick}>
			{errorState.isError
				? errorState.message
				: errorState.isError !== null
				? errorState.message
				: !loading && <Typography variant={'button'}>{text}</Typography>}
		</CustomLoadingButton>
	);
};
