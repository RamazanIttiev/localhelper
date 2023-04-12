import { useEffect, useState } from 'react';
import { CartUI } from './cart.component';
import { useCart } from './hooks/useCart';
import { ErrorType } from '../../models/error';
import { getAirtableView } from '../../utils/airtable';
import { getCartOrderString } from './utils/cart.utlis';
import { useReactRouter } from '../../hooks/useReactRouter';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';

export const CartContainer = () => {
	const { productsRoute } = useReactRouter();
	const { addToCart, removeFromCart, clearCart, cartProducts } = useCart();

	const [loading, setLoading] = useState(false);
	const [isCartOpened, setOpenCart] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const botIdForCart = getAirtableView(productsRoute?.params.categoryId);

	const handleClearCart = () => {
		clearCart();
		setOpenCart(false);
	};

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const orderItems = cartProducts.map(({ title, amount, price }, id) => {
		return `${id + 1}. ${title} ${amount} x ${price}`;
	});

	const cartTotalAmount = cartProducts.reduce((previous, current): number => {
		if (current.amount !== undefined) {
			return previous + current.amount * current.price;
		}
		return current.price;
	}, 0);

	const cartOrder = getCartOrderString(orderItems, cartTotalAmount);

	const handleCartOrder = () => handleOrder(botIdForCart, cartOrder, handleLoading, handleError);

	const toggleCart = (newOpen: boolean) => () => {
		setOpenCart(newOpen);
	};

	return (
		<CartUI
			loading={loading}
			addToCart={addToCart}
			toggleCart={toggleCart}
			errorState={errorState}
			cartProducts={cartProducts}
			isCartOpened={isCartOpened}
			clearCart={handleClearCart}
			handleOrder={handleCartOrder}
			removeFromCart={removeFromCart}
			cartTotalAmount={cartTotalAmount}
		/>
	);
};
