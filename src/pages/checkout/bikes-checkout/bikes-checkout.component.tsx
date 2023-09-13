import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { HintTitle } from 'reactkit/hintTitle';

import { Box, Typography } from '@mui/material';

import { theme } from 'theme';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { BikesCheckoutForm } from './components/bikes-checkout-form';

import { formatDaysText } from 'utils/date';

import { BikesCheckoutModel } from './bikes-checkout.model';

interface Props {
	rentPeriod: number;
	product: DefaultProductModel;
	control: Control<BikesCheckoutModel>;
	errors: FieldErrors<BikesCheckoutModel>;
	register: UseFormRegister<BikesCheckoutModel>;
}

export const BikesCheckoutComponent = ({ register, errors, control, product, rentPeriod }: Props) => {
	return (
		<>
			<BikesCheckoutForm control={control} errors={errors} register={register} />
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
		</>
	);
};
