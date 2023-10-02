import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import React, { CSSProperties } from 'react';

import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';

import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';

import { useShoppingCart } from 'context/cart.context';

import { ReactComponent as AddIcon } from 'assets/svg/add.svg';
import { ReactComponent as RemoveIcon } from 'assets/svg/remove.svg';

interface Props {
	showPrice?: boolean;
	showAmount?: boolean;
	styles?: CSSProperties;
	restaurantTitle: string;
	product: RestaurantProduct;
}

export const AmountButtons = ({ styles, product, showAmount = false, showPrice = true, restaurantTitle }: Props) => {
	const theme = useTheme();
	const [impactOccurred] = useHapticFeedback();
	const { incrementCartAmount, decrementCartAmount, getItemAmount } = useShoppingCart();

	const productAmount = getItemAmount(product.id);
	const isRemoveVisible = productAmount > 0;

	const handleRemove = () => {
		impactOccurred('light');
		decrementCartAmount(product.id);
	};

	const handleAdd = () => {
		impactOccurred('light');
		incrementCartAmount(product.id, restaurantTitle);
	};

	return (
		<Box
			sx={{
				p: 0,
				maxWidth: '9rem',
				borderRadius: theme.tg_theme.borderRadius.base,
				transition: 'all 0.2s',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: isRemoveVisible ? '9rem' : '8rem',
				background: theme.tg_theme.palette.button_color,
				...styles,
			}}>
			<IconButton
				sx={{ p: isRemoveVisible ? 1 : 0, transition: 'all 0.2s' }}
				size={'medium'}
				onClick={handleRemove}>
				<Icon fontSize={'small'} sx={{ color: '#fff', opacity: isRemoveVisible ? 1 : 0 }}>
					<RemoveIcon style={{ width: 'auto', height: '16px' }} />
				</Icon>
			</IconButton>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				{showAmount && <Typography variant={'caption'}>{productAmount}</Typography>}
				{showPrice && (
					<Typography fontSize={'0.8rem'} sx={{ fontWeight: 600, letterSpacing: '0.1rem' }}>
						&nbsp;{product?.price} Rs
					</Typography>
				)}
			</Box>
			<IconButton size={'medium'} onClick={handleAdd}>
				<Icon fontSize={'small'} sx={{ color: '#fff' }}>
					<AddIcon style={{ width: 'auto', height: '16px' }} />
				</Icon>
			</IconButton>
		</Box>
	);
};
