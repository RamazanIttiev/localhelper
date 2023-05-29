import { useProducts } from './useProducts';
import { useLocalStorage } from 'usehooks-ts';
import { FoodModel } from '../models/productModel';
import { hideMainButton, setHaptic } from '../actions/webApp-actions';
import { addNewProductToCart, decrementProduct, getCartOrderString, incrementProductInCart } from '../utils/cart';
import { useCallback } from 'react';

export const useCart = () => {
	const { checkProductInCart, isSameRestaurant } = useProducts();
	const [cartProducts, setCartProducts] = useLocalStorage<FoodModel[]>('products', []);

	const isCartEmpty = cartProducts.length === 0;

	const clearCart = useCallback(() => {
		setCartProducts([]);
	}, [setCartProducts]);

	const addToCart = useCallback(
		(selectedProduct: FoodModel) => {
			setHaptic('light');
			const sameRestaurant = isSameRestaurant(cartProducts, selectedProduct);

			const setCart = () =>
				setCartProducts(prevState => {
					if (checkProductInCart(prevState, selectedProduct)) {
						return incrementProductInCart(prevState, selectedProduct);
					} else {
						return addNewProductToCart(prevState, selectedProduct);
					}
				});

			if (!sameRestaurant) {
				const answer = confirm('You should empty your cart for a new order');
				answer && clearCart();

				setTimeout(() => setCart(), 0);
			} else {
				setCart();
			}
		},
		[cartProducts, checkProductInCart, clearCart, isSameRestaurant, setCartProducts],
	);

	const removeFromCart = (selectedProduct: FoodModel) => {
		setHaptic('light');
		setCartProducts(prevState => {
			return prevState.reduce((accumulator: [] | FoodModel[], product: FoodModel): FoodModel[] => {
				if (product.id === selectedProduct.id) {
					if (product.amount === 1) {
						if (cartProducts.length === 1) {
							const answer = confirm('Do you want to clear your cart?');
							if (answer) {
								clearCart();
								hideMainButton();
							} else return [product];
						}
						return accumulator;
					}
					return decrementProduct(accumulator, product);
				} else {
					return [...accumulator, product];
				}
			}, [] as FoodModel[]);
		});
	};

	const cartTotalAmount = cartProducts.reduce((previous, current): number => {
		if (current.amount !== undefined) {
			return previous + current.amount * current.price;
		}
		return current.price;
	}, 0);

	const orderItems = cartProducts.map(({ title, amount, price }, id) => {
		return `${id + 1}. ${title} ${amount} x ${price}`;
	});

	const orderCheckout: Pick<FoodModel, 'image' | 'title' | 'price' | 'amount'>[] = cartProducts.map(
		({ title, amount, price, image }): Pick<FoodModel, 'image' | 'title' | 'price' | 'amount'> => {
			return { image, title, price, amount };
		},
	);

	const cartOrder = getCartOrderString(orderItems);

	return {
		cartOrder,
		clearCart,
		addToCart,
		isCartEmpty,
		cartProducts,
		orderCheckout,
		removeFromCart,
		cartTotalAmount,
	};
};
