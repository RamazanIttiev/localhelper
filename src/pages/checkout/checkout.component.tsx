import React from 'react';
import { Container, Switch } from '@mui/material';
import { FormUI } from './components/form';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { SaveInfoField, SaveInfoWrapper } from './checkout.styled';
import { HintTitle } from '../../components/hintTitle';
import { CartList } from '../cart/components/cart-list';
import { OrderInfo } from './components/orderInfo';
import { theme } from '../../theme';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { UserData } from '../../models/user.model';
import { RestaurantProductModel } from '../restaurant/components/restaurant-product/restaurant-product.model';
import { RestaurantModel } from '../../models/product.model';

interface Props {
	saveInfo?: boolean;
	cartTotalAmount: number;
	restaurant: RestaurantModel;
	errors: FieldErrors<UserData>;
	onSubmit: () => Promise<void>;
	cartList: RestaurantProductModel[];
	register: UseFormRegister<UserData>;
	handleSaveInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkout = ({
	errors,
	register,
	onSubmit,
	saveInfo,
	cartList,
	restaurant,
	handleSaveInfo,
	cartTotalAmount,
}: Props) => {
	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '4rem', position: 'relative' }}>
			<FormUI errors={errors} register={register} onSubmit={onSubmit} />
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
					<HintTitle styles={{ marginTop: '0.5rem' }} text={'Save contact information for future orders'} />
				</SaveInfoWrapper>
			)}

			<HintTitle
				styles={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
				text={`Your order from ${restaurant.title}`}
			/>
			<CartList cartList={cartList} restaurant={restaurant} />
			<OrderInfo orderTotal={cartTotalAmount} />
		</Container>
	);
};
