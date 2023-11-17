import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EntityGroup } from 'reactkit/entityGroup';
import { HintText } from 'reactkit/hintText';
import { Tabs } from 'reactkit/tabs/tabs.component';

import { Typography } from '@mui/material';

import { CartList } from 'pages/cart/presentation/components/cart-list';
import { RestaurantFormFields, TabValue } from 'pages/checkout/restaurant-checkout/rent-checkout.model';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';

import { RestaurantCheckoutForm } from './components/restaurant-checkout-form';

interface Props {
	cartTotalAmount: number;
	restaurantTitle?: string;
	errors: FieldErrors<RestaurantFormFields>;
	cartList: RestaurantItem[];
	register: UseFormRegister<RestaurantFormFields>;
	orderMethod: string;
	handleOrderMethod: (newValue: string | number | null) => void;
}

const orderMethods = [
	{
		id: '1',
		title: 'Delivery',
	},
	{
		id: '1',
		title: 'Pick up',
	},
];

export const RestaurantCheckoutComponent = ({
	errors,
	orderMethod,
	register,
	cartList,
	restaurantTitle,
	cartTotalAmount,
	handleOrderMethod,
}: Props) => {
	return (
		<>
			<HintText sx={{ mb: 1 }} text={'At home or in the restaurant?'} />
			<Tabs sxTabs={{ mb: 4 }} tabs={orderMethods} value={orderMethod} onChange={handleOrderMethod} />
			<RestaurantCheckoutForm errors={errors} register={register} />
			<HintText sx={{ mt: '24px' }} text={`${restaurantTitle}`} />
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
					orderMethod === TabValue.DELIVERY
						? {
								label: 'Delivery',
								element: (
									<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>
										Free
									</Typography>
								),
						  }
						: null,
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
