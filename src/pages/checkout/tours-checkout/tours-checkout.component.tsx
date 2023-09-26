import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { HintText } from 'reactkit/hintText';
import { Label } from 'reactkit/label';

import { Box, Typography } from '@mui/material';

import { theme } from 'theme';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { ToursCheckoutForm } from './components/tours-checkout-form';

import { ToursCheckoutModel } from './tours-checkout.model';

interface Props {
	product: DefaultProductModel;
	control: Control<ToursCheckoutModel>;
	errors: FieldErrors<ToursCheckoutModel>;
	register: UseFormRegister<ToursCheckoutModel>;
}

export const ToursCheckoutComponent = ({ register, errors, control, product }: Props) => {
	return (
		<>
			<ToursCheckoutForm control={control} errors={errors} register={register} />
			<Box sx={{ display: 'flex', flexDirection: 'column', mt: '2rem' }}>
				<HintText text={'Order info'} sx={{ mb: '0.5rem' }} />
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
					<Box sx={{ display: 'flex', alignItems: 'self-start', flexDirection: 'column' }}>
						<Typography variant={'body1'}>{product.title}</Typography>

						<Typography variant={'body1'} sx={{ display: 'flex' }}>
							Total price:
							<Typography fontWeight={600} ml={1}>
								{product.price} Rs
							</Typography>
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	);
};
