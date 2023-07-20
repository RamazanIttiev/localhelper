import React from 'react';
import { ErrorType } from '../../models/error.model';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { LoaderButton } from '../../reactkit/loaderButton';
import { TransportCheckoutModel } from './transportCheckout.model';
import { DefaultProductModel } from '../../models/product.model';
import { TransportCheckoutForm } from './transportCheckoutForm';
import { Box, Typography } from '@mui/material';
import { HintTitle } from '../../components/hintTitle';
import { theme } from '../../theme';

interface Props {
	loading: boolean;
	errorState: ErrorType;
	onSubmit: () => void;
	product: DefaultProductModel;
	control: Control<TransportCheckoutModel, any>;
	errors: FieldErrors<TransportCheckoutModel>;
	register: UseFormRegister<TransportCheckoutModel>;
}

export const TransportCheckoutComponent = ({
	register,
	errors,
	onSubmit,
	loading,
	errorState,
	control,
	product,
}: Props) => {
	const formatDaysText = (numDays: number) => {
		if (numDays === 1) {
			return `day`;
		} else {
			return `days`;
		}
	};

	return (
		<>
			<TransportCheckoutForm control={control} errors={errors} register={register} />
			<Box sx={{ display: 'flex', flexDirection: 'column', mt: '2rem' }}>
				<HintTitle text={'Order info'} styles={{ marginBottom: '0.5rem' }} />
				<Box sx={{ display: 'flex', alignItems: 'flex-start' }} mb={1}>
					<Box
						component={'img'}
						src={product.image[0].url}
						alt={product.title}
						sx={{
							mr: 2,
							width: '5rem',
							borderRadius: 1,
							objectFit: 'cover',
							aspectRatio: '2/2',
						}}
					/>
					<Box sx={{ display: 'flex', alignItems: 'self-start', flexDirection: 'column' }} mb={'3rem'}>
						<Typography
							component={'span'}
							variant={'body1'}
							fontWeight={'bold'}
							sx={{ color: theme.palette.info.main }}>
							{product.title}
						</Typography>

						<Typography
							component={'span'}
							variant={'body1'}
							fontWeight={'bold'}
							sx={{ color: theme.palette.info.main }}>
							{product.price} Rs
						</Typography>
					</Box>
				</Box>

				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} mb={1}>
					<Typography fontSize={'1rem'} component={'span'} display={'flex'}>
						Total price for
						<Typography
							fontSize={'1rem'}
							component={'span'}
							sx={{
								width: '1.5rem',
								height: '1.5rem',
								borderRadius: '50%',
								backgroundColor: theme.palette.primary.main,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								m: '0 0.5rem',
							}}>
							1
						</Typography>
						{formatDaysText(1)}
					</Typography>
					<Typography
						component={'span'}
						variant={'body1'}
						fontWeight={'bold'}
						sx={{ color: theme.palette.info.main }}>
						1000 Rs
					</Typography>
				</Box>
			</Box>
			{!isUserAgentTelegram && (
				<LoaderButton
					isMainButton
					text={'Order'}
					loading={loading}
					errorState={errorState}
					handleClick={onSubmit}
				/>
			)}
		</>
	);
};
