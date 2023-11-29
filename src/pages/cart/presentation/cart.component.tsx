import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { CartHeader } from 'pages/cart/presentation/components/cart-header.tsx';
import { CartList } from 'pages/cart/presentation/components/cart-list.tsx';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model.ts';

import { theme } from 'ui/theme/theme.ts';

interface Props {
	restaurantTitle?: string;
	cartList: RestaurantItem[];
}

export const Cart = ({ cartList, restaurantTitle }: Props) => {
	return (
		<Container maxWidth={'sm'} sx={{ pb: 5 }}>
			<CartHeader restaurantTitle={restaurantTitle} />
			<CartList cartList={cartList} restaurantTitle={restaurantTitle} />
			<Box
				sx={{
					left: 0,
					bottom: 0,
					width: '100%',
					position: 'fixed',
					padding: 2,
					backgroundColor: theme.palette.background.default,
				}}
			/>
		</Container>
	);
};
