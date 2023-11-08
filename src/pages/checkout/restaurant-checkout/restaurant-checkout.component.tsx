import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EntityGroup } from 'reactkit/entityGroup';
import { HintText } from 'reactkit/hintText';

import { Typography } from '@mui/material';

import { CartList } from 'pages/cart/presentation/components/cart-list';
import { RestaurantFormFields } from 'pages/checkout/restaurant-checkout/rent-checkout.model';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';

import { RestaurantCheckoutForm } from './components/restaurant-checkout-form';

interface Props {
	cartTotalAmount: number;
	restaurantTitle?: string;
	errors: FieldErrors<RestaurantFormFields>;
	cartList: RestaurantItem[];
	register: UseFormRegister<RestaurantFormFields>;
}

export const RestaurantCheckoutComponent = ({
	errors,
	register,
	cartList,
	restaurantTitle,
	cartTotalAmount,
}: Props) => {
	return (
		<>
			<RestaurantCheckoutForm errors={errors} register={register} />
			<HintText sx={{ marginTop: '24px' }} text={`${restaurantTitle}`} />
			<CartList cartList={cartList} restaurantTitle={restaurantTitle} />
			<HintText sx={{ mt: 3, mb: 1 }} text={'Order info'} />
			<EntityGroup
				children={[
					{
						label: 'Total',
						element: (
							<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>
								{cartTotalAmount} Rs
							</Typography>
						),
					},
					{
						label: 'Delivery',
						element: (
							<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>
								Free
							</Typography>
						),
					},
					{
						label: 'Payment method',
						element: (
							<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>
								Cash
							</Typography>
						),
					},
				]}
			/>
		</>
	);
};
