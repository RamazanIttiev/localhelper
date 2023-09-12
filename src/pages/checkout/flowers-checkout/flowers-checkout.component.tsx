import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HintTitle } from 'reactkit/hintTitle';

import { Box, Container, Typography } from '@mui/material';

import { theme } from 'theme';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { FlowersCheckoutForm } from './components/flowers-checkout-form';

import { FlowersCheckoutModel } from './flowers-checkout.model';

interface Props {
	product: DefaultProductModel;
	errors: FieldErrors<FlowersCheckoutModel>;
	register: UseFormRegister<FlowersCheckoutModel>;
}

export const FlowersCheckoutComponent = ({ register, errors, product }: Props) => {
	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '1rem', position: 'relative' }}>
			<FlowersCheckoutForm errors={errors} register={register} />
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
					<Box sx={{ display: 'flex', alignItems: 'self-start', flexDirection: 'column' }}>
						<Typography variant={'body1'} sx={{ color: theme.palette.info.main }}>
							{product.title}
						</Typography>

						<Typography variant={'body1'} sx={{ display: 'flex', color: theme.palette.info.main }}>
							Total price:
							<Typography fontWeight={600} color={'#fff'} ml={1}>
								{product.price} Rs
							</Typography>
						</Typography>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
