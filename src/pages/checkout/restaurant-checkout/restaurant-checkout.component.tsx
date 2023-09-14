import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HintText } from 'reactkit/hintText';
import { Label } from 'reactkit/label';

import { Switch } from '@mui/material';

import { theme } from 'theme';

import { CartList } from 'pages/cart/components/cart-list';
import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';

import { OrderInfo } from './components/orderInfo';
import { RestaurantCheckoutForm } from './components/restaurant-checkout-form';

import { UserData } from 'models/user.model';

import { isUserAgentTelegram } from 'utils/deviceInfo';

import { SaveInfoField, SaveInfoWrapper } from './restaurant-checkout.styled';

interface Props {
	saveInfo?: boolean;
	cartTotalAmount: number;
	restaurantTitle: string;
	errors: FieldErrors<UserData>;
	onSubmit: () => Promise<void>;
	cartList: RestaurantProduct[];
	register: UseFormRegister<UserData>;
	handleSaveInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RestaurantCheckoutComponent = ({
	errors,
	register,
	onSubmit,
	saveInfo,
	cartList,
	handleSaveInfo,
	restaurantTitle,
	cartTotalAmount,
}: Props) => {
	return (
		<>
			<RestaurantCheckoutForm errors={errors} register={register} onSubmit={onSubmit} />
			{isUserAgentTelegram && (
				<SaveInfoWrapper>
					<SaveInfoField
						control={
							<Switch
								checked={saveInfo}
								onChange={handleSaveInfo}
								sx={{ color: theme.palette.primary.main }}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						labelPlacement={'start'}
						label="Save info"
					/>
					<HintText sx={{ marginTop: '0.5rem' }} text={'Save contact information for future orders'} />
				</SaveInfoWrapper>
			)}

			<HintText sx={{ marginTop: '0.5rem' }} text={`Your order from ${restaurantTitle}`} />
			<CartList cartList={cartList} restaurantTitle={restaurantTitle} />
			<OrderInfo orderTotal={cartTotalAmount} />
		</>
	);
};
