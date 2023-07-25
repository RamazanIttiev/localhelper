import React from 'react';
import { Box, Typography } from '@mui/material';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { theme } from '../../theme';
import { formatDaysText } from '../../utils/date';
import { ErrorType } from '../../models/error.model';
import { HintTitle } from '../../components/hintTitle';
import { LoaderButton } from '../../reactkit/loaderButton';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { TransportCheckoutForm } from './transportCheckoutForm';
import { DefaultProductModel } from '../../models/product.model';
import { TransportCheckoutModel } from './transportCheckout.model';

interface Props {
	loading: boolean;
	rentPeriod: number;
	onSubmit: () => void;
	errorState: ErrorType;
	product: DefaultProductModel;
	control: Control<TransportCheckoutModel>;
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
	rentPeriod,
}: Props) => {
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

				{rentPeriod > 0 && (
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
								{rentPeriod}
							</Typography>
							{formatDaysText(rentPeriod)}
						</Typography>
						<Typography
							component={'span'}
							variant={'body1'}
							fontWeight={'bold'}
							sx={{ color: theme.palette.info.main }}>
							{product.price * rentPeriod} Rs
						</Typography>
					</Box>
				)}
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
