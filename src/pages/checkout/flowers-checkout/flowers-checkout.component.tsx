import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HintText } from 'reactkit/hintText';

import { Box, Typography } from '@mui/material';

import { DefaultItemModel } from 'pages/items-list/item/item.model';

import { FlowersCheckoutForm } from './components/flowers-checkout-form';

import { FlowersFormFields } from './flowers-checkout.model';

interface Props {
	item: DefaultItemModel;
	errors: FieldErrors<FlowersFormFields>;
	register: UseFormRegister<FlowersFormFields>;
}

export const FlowersCheckoutComponent = ({ register, errors, item }: Props) => {
	return (
		<>
			<FlowersCheckoutForm errors={errors} register={register} />
			<Box sx={{ display: 'flex', flexDirection: 'column', mt: '2rem' }}>
				<HintText text={'Order info'} sx={{ mb: '1rem' }} />
				<Box sx={{ display: 'flex', alignItems: 'flex-start' }} mb={1}>
					<Box
						component={'img'}
						src={item.image[0].url}
						alt={item.title}
						sx={{
							mr: 2,
							width: '5rem',
							borderRadius: 1,
							objectFit: 'cover',
							aspectRatio: '2/2',
						}}
					/>
					<Box sx={{ display: 'flex', alignItems: 'self-start', flexDirection: 'column' }}>
						<Typography variant={'body1'}>{item.title}</Typography>

						<Typography variant={'body1'} sx={{ display: 'flex' }}>
							Total price:
							<Typography fontWeight={600} ml={1}>
								{item.price} Rs
							</Typography>
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	);
};
