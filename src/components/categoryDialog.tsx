import React, { useCallback, useEffect, useReducer } from 'react';
import { LoaderButton } from '../reactkit/loaderButton';
import { isUserAgentTelegram } from '../utils/deviceInfo';
import { Box, Drawer, Typography, useTheme } from '@mui/material';
import { handleFormSubmit } from '../actions/global-actions';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../actions/webApp-actions';
import { initialState, reducer } from '../utils/reducers';

interface CategoryDialogProps {
	title: string;
	image: string;
	isOpened: boolean;
	flowId: string;
	handleClose: () => void;
}

export const CategoryDialog = ({ title, image, isOpened, handleClose, flowId }: CategoryDialogProps) => {
	const theme = useTheme();

	const [{ loading, errorState }, dispatch] = useReducer(reducer, initialState);

	const onSubmit = useCallback(() => {
		return handleFormSubmit(dispatch, flowId, {
			itemName: title,
		});
	}, [flowId, title]);

	useEffect(() => {
		if (isOpened) {
			showMainButton();
			setMainButtonText('Buy');
			handleMainButton(onSubmit);
		} else {
			hideMainButton();
			removeMainButtonEvent(onSubmit);
		}
	}, [isOpened, onSubmit]);

	useEffect(() => {
		return () => {
			hideMainButton();
			removeMainButtonEvent(onSubmit);
		};
	}, [onSubmit]);

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
						isMainButton
						loading={loading}
						errorState={errorState}
						handleClick={onSubmit}
					/>
				)}
			</Box>
		</Drawer>
	);
};
