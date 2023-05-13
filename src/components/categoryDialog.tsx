import React, { useCallback, useEffect, useState } from 'react';
import { ErrorType } from '../models/error';
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
}

export const CategoryDialog = ({ title, image, isOpened, handleClose, flowId }: CategoryDialogProps) => {
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
		return handleOrder(flowId, { itemName: title }, handleLoading, handleError);
	}, [flowId, title]);

	useEffect(() => {
		if (isOpened) {
			showMainButton();
			setMainButtonText('Buy');
			handleMainButton(handleProductOrder);
		}

		return () => {
			hideMainButton();
			removeMainButtonEvent(handleProductOrder);
		};
	}, [isOpened, flowId, title, handleProductOrder]);

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
						handleClick={() => handleOrder(flowId, { itemName: title }, handleLoading, handleError)}
					/>
				)}
			</Box>
		</Drawer>
	);
};
