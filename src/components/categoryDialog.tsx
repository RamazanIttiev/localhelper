import React, { useCallback, useEffect } from 'react';
import { LoaderButton } from 'reactkit/loaderButton';

import { Box, Drawer, Typography, useTheme } from '@mui/material';

import { isUserAgentTelegram } from 'utils/deviceInfo';
import { openTelegram } from 'utils/service';

import { handleOrder } from 'actions/global-actions';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from 'actions/webApp-actions';

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

	const handleProductOrder = useCallback(() => {
		return handleOrder(
			flowId,
			{
				itemName: title,
				userCountry,
			},
			() => console.log(),
			() => console.log(),
		);
	}, [flowId, title, userCountry]);

	useEffect(() => {
		if (isOpened) {
			showMainButton();
			setMainButtonText('Continue');
			handleMainButton(handleProductOrder);
		} else {
			hideMainButton();
			removeMainButtonEvent(handleProductOrder);
		}
	}, [isOpened, handleProductOrder]);

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
						isMainButton
						text={isUserAgentTelegram ? 'Continue' : 'Open Telegram'}
						handleClick={isUserAgentTelegram ? handleProductOrder : openTelegram}
					/>
				)}
			</Box>
		</Drawer>
	);
};
