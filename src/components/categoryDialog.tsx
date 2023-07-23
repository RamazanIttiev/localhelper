import React, { useCallback, useEffect, useState } from 'react';
import { ErrorType } from '../models/error.model';
import { LoaderButton } from '../reactkit/loaderButton';
import { isUserAgentTelegram } from '../utils/deviceInfo';
import { Box, Drawer, Typography, useTheme } from '@mui/material';
import { clearResponseMessage, handleOrder } from '../actions/global-actions';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../actions/webApp-actions';

interface CategoryDialogProps {
	title: string;
	image: string;
	isOpened: boolean;
	flowId: string;
	handleClose: () => void;
	userCountry?: string;
}

export const CategoryDialog = ({ title, image, isOpened, handleClose, flowId, userCountry }: CategoryDialogProps) => {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const handleProductOrder = useCallback(() => {
		return handleOrder(
			flowId,
			{
				itemName: title,
				userCountry,
			},
			handleLoading,
			handleError,
		);
	}, [flowId, title, userCountry]);

	useEffect(() => {
		if (isOpened) {
			showMainButton();
			setMainButtonText('Buy');
			handleMainButton(handleProductOrder);
		} else {
			hideMainButton();
			removeMainButtonEvent(handleProductOrder);
		}
	}, [isOpened, handleProductOrder]);

	useEffect(() => {
		return () => {
			hideMainButton();
			removeMainButtonEvent(handleProductOrder);
		};
	}, [handleProductOrder]);

	return (
		<Drawer anchor={'bottom'} onClose={handleClose} open={isOpened}>
			<Box
				sx={{
					p: '3rem 3rem',
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					background: theme.palette.background.default,
				}}>
				<Box
					component={'img'}
					src={image}
					alt={title}
					fontSize="small"
					sx={{
						width: '7rem',
						height: '7rem',
						display: 'block',
						mb: '1rem',
						borderRadius: '50%',
					}}
				/>
				<Typography sx={{ textAlign: 'center', fontWeight: '600', mb: '1rem' }} component={'p'} variant="body1">
					{title}
				</Typography>
				{!isUserAgentTelegram && (
					<LoaderButton
						text={'Buy'}
						loading={loading}
						errorState={errorState}
						handleClick={handleProductOrder}
					/>
				)}
			</Box>
		</Drawer>
	);
};
