import React, { useEffect, useState } from 'react';
import { ErrorType } from '../models/error';
import { LoaderButton } from './reactkit/loaderButton';
import { clearResponseMessage, handleOrder } from '../actions/global-actions';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material';

interface CategoryDialogProps {
	title: string;
	image: string;
	isOpened: boolean;
	idForBot: string;
	handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const CategoryDialog = ({ title, image, isOpened, handleClose, idForBot }: CategoryDialogProps) => {
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

	return (
		<Dialog TransitionComponent={Transition} keepMounted onClose={handleClose} open={isOpened}>
			<DialogContent sx={{ p: '3rem 3rem' }}>
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
				<Typography sx={{ textAlign: 'center', fontWeight: '600' }} component={'p'} variant="body1">
					{title}
				</Typography>
				<DialogActions>
					<LoaderButton
						text={'Buy'}
						loading={loading}
						errorState={errorState}
						handleClick={() => handleOrder(idForBot, title, handleLoading, handleError)}
					/>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
};
