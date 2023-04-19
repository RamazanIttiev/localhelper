import React, { useEffect, useMemo, useState } from 'react';
import { ErrorType } from '../models/error';
import { LoaderButton } from './reactkit/loaderButton';
import { clearResponseMessage, handleOrder } from '../actions/global-actions';
import { Box, Drawer, Typography } from '@mui/material';
import { useReactRouter } from '../hooks/useReactRouter';
import { handleMainButton, hideMainButton, setMainButtonText, showMainButton } from '../actions/webApp-actions';
import { isUserAgentTelegram } from '../utils/deviceInfo';

interface CategoryDialogProps {
	title: string;
	image: string;
	isOpened: boolean;
	idForBot: string;
	handleClose: () => void;
}

export const CategoryDialog = ({ title, image, isOpened, handleClose, idForBot }: CategoryDialogProps) => {
	const { isServiceRoute } = useReactRouter();
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const order = useMemo(() => (isServiceRoute ? { order: title } : { itemName: title }), [isServiceRoute, title]);

	useEffect(() => {
		showMainButton();
		setMainButtonText('Buy');
		handleMainButton(() => handleOrder(idForBot, order, handleLoading, handleError));

		return () => hideMainButton();
	}, [idForBot, order]);

	return (
		<Drawer anchor={'bottom'} onClose={handleClose} open={isOpened}>
			<Box sx={{ p: '3rem 3rem', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
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
						handleClick={() => handleOrder(idForBot, order, handleLoading, handleError)}
					/>
				)}
			</Box>
		</Drawer>
	);
};
