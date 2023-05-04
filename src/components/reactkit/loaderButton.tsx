import React from 'react';
import Lottie from 'react-lottie';
import { LoadingButton } from '@mui/lab';
import { ErrorType } from '../../models/error';
import { styled, Typography } from '@mui/material';
import errorAnimation from '../../assets/lottie/sadFace.json';
import successAnimation from '../../assets/lottie/happyFace.json';

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
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: errorState.isError ? errorAnimation : successAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<CustomLoadingButton
			loading={loading}
			sx={{
				height: '36px',
				textTransform: 'inherit',
				borderRadius: '2rem',
				width: '7rem',
				...styles,
			}}
			variant={errorState.isError ? 'outlined' : 'contained'}
			onClick={handleClick}>
			{errorState.isError ? (
				<Lottie options={defaultOptions} speed={2} height={'3rem'} width={'auto'} />
			) : errorState.isError !== null ? (
				<Lottie options={defaultOptions} speed={2} height={'3rem'} width={'auto'} />
			) : (
				!loading && (
					<Typography
						variant={'body2'}
						sx={{
							fontWeight: '600',
							letterSpacing: '0.1rem',
							...textStyles,
						}}>
						{text}
					</Typography>
				)
			)}
		</CustomLoadingButton>
	);
};
