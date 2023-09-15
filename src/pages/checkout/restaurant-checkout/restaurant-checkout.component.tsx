import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HintText } from 'reactkit/hintText';

import { CartList } from 'pages/cart/components/cart-list';
import { RestaurantCheckoutModel } from 'pages/checkout/restaurant-checkout/rent-checkout.model';
import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';

import { OrderInfo } from './components/orderInfo';
import { RestaurantCheckoutForm } from './components/restaurant-checkout-form';

interface Props {
	cartTotalAmount: number;
	restaurantTitle: string;
	errors: FieldErrors<RestaurantCheckoutModel>;
	onSubmit: () => Promise<void>;
	cartList: RestaurantProduct[];
	register: UseFormRegister<RestaurantCheckoutModel>;
}

export const RestaurantCheckoutComponent = ({
	errors,
	register,
	onSubmit,
	cartList,
	restaurantTitle,
	cartTotalAmount,
}: Props) => {
	return (
		<>
			<RestaurantCheckoutForm errors={errors} register={register} onSubmit={onSubmit} />
			{/*{isUserAgentTelegram && (*/}
			{/*	<SaveInfoWrapper>*/}
			{/*		<SaveInfoField*/}
			{/*			control={*/}
			{/*				<Switch*/}
			{/*					checked={saveInfo}*/}
			{/*					onChange={handleSaveInfo}*/}
			{/*					sx={{ color: theme.palette.primary.main }}*/}
			{/*					inputProps={{ 'aria-label': 'controlled' }}*/}
			{/*				/>*/}
			{/*			}*/}
			{/*			labelPlacement={'start'}*/}
			{/*			label="Save info"*/}
			{/*		/>*/}
			{/*		<HintText sx={{ marginTop: '0.5rem' }} text={'Save contact information for future orders'} />*/}
			{/*	</SaveInfoWrapper>*/}
			{/*)}*/}

			<HintText sx={{ marginTop: '0.5rem' }} text={`Your order from ${restaurantTitle}`} />
			<CartList cartList={cartList} restaurantTitle={restaurantTitle} />
			<OrderInfo orderTotal={cartTotalAmount} />
		</>
	);
};
