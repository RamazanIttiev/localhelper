import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material';
import { CustomLoadingButton } from './reactkit/button';
import { ErrorType } from '../models/error';
import { sendWebAppDeepLink } from '../utils/requests';
import { TransitionProps } from '@mui/material/transitions';

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
		if (errorState.isError !== null) {
			setTimeout(() => {
				setErrorState({
					message: '',
					isError: null,
				});
			}, 5000);
		}
	}, [errorState]);

	const handleClick = async () => {
		setLoading(true);
		try {
			const result = await sendWebAppDeepLink(idForBot, 'lhelper', {});
			if (!result.ok) {
				setLoading(false);
				setErrorState({ message: 'Try again later', isError: true });
			} else {
				setErrorState({ message: 'Success', isError: false });
				setLoading(false);
			}
		} catch (error) {
			setErrorState({
				message: typeof error === 'string' ? error : 'Try again later',
				isError: true,
			});
		}
	};
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
					<CustomLoadingButton
						loading={loading}
						color={errorState.isError ? 'error' : errorState.isError !== null ? 'success' : 'primary'}
						sx={{ height: '32px', borderRadius: 2, textTransform: 'inherit' }}
						variant={'contained'}
						fullWidth
						onClick={handleClick}>
						{errorState.isError ? (
							errorState.message
						) : errorState.isError !== null ? (
							errorState.message
						) : (
							<strong>Buy</strong>
						)}
					</CustomLoadingButton>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
};
