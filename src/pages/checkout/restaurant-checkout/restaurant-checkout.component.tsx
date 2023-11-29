import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Typography from '@mui/material/Typography';

import { CartList } from 'pages/cart/presentation/components/cart-list.tsx';
import { RestaurantFormFields, TabValue } from 'pages/checkout/restaurant-checkout/rent-checkout.model.ts';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model.ts';

import { RestaurantCheckoutForm } from './components/restaurant-checkout-form.tsx';

import { HintText } from 'ui/atoms/hintText.tsx';
import { EntityGroup } from 'ui/molecules/entityGroup.tsx';
import { Tabs } from 'ui/molecules/tabs/tabs.component.tsx';

interface Props {
	cartTotalAmount: number;
	restaurantTitle?: string;
	errors: FieldErrors<RestaurantFormFields>;
	cartList: RestaurantItem[];
	register: UseFormRegister<RestaurantFormFields>;
	orderMethod: TabValue;
	handleOrderMethod: (e: React.SyntheticEvent | null, newValue: TabValue | number | null) => void;
}

const orderMethods = [
	{
		id: '1',
		title: 'Delivery',
	},
	{
		id: '2',
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
			<Tabs
				sxTabsList={{ width: '100%' }}
				sxTab={{ width: '100%' }}
				sxTabs={{ mb: 4 }}
				tabs={orderMethods}
				onChange={handleOrderMethod}
			/>
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
