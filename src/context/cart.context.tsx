import { createContext, useContext } from 'react';

import { useLocalStorage } from 'usehooks-ts';

import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';

import { CartItem, ShoppingCartContextProps, ShoppingCartProviderProps } from 'models/cart.model';

import { getCartOrderString } from 'utils/cart';
import { isSameRestaurant } from 'utils/restaurant';

import { hideMainButton, setHaptic } from 'actions/webApp-actions';

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};
export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

	const isCartEmpty = cartItems.length === 0;

	const findProduct = (products: RestaurantProduct[], id: string) =>
		products?.find(product => {
			return product.id === id;
		});

	const findCartItem = (id: string) => cartItems.find(cartItem => cartItem.id === id);

	const getItemAmount = (id: string) => {
		return cartItems.find(cartItem => cartItem.id === id)?.amount || 0;
	};

	const getCartRestaurant = () => {
		return cartItems.map(({ restaurantTitle }) => restaurantTitle)[0];
	};

	const incrementCartAmount = (id: string, restaurantTitle: string) => {
		setHaptic('soft');

		const modifyCart = () =>
			setCartItems(currentItems => {
				const cartItem = findCartItem(id);

				if (cartItem === undefined) {
					return [...currentItems, { id, amount: 1, restaurantTitle }];
				} else {
					return currentItems.map(cartItem => {
						if (cartItem.id === id) {
							return { ...cartItem, amount: cartItem.amount + 1 };
						} else {
							return cartItem;
						}
					});
				}
			});

		if (!isSameRestaurant(cartItems, restaurantTitle)) {
			const answer = confirm('You should empty your cart for a new order');
			answer && clearCart();

			setTimeout(() => modifyCart(), 0);
		} else {
			modifyCart();
		}
	};

	const decrementCartAmount = (id: string) => {
		setHaptic('soft');
		setCartItems(currentItems => {
			const cartItem = findCartItem(id);

			if (cartItem?.amount === 1) {
				if (currentItems.length === 1) {
					const answer = confirm('Do you want to clear your cart?');
					if (answer) {
						clearCart();
						hideMainButton();
					} else return [cartItem];
				}
				return currentItems.filter(cartItem => cartItem.id !== id);
			} else {
				return currentItems.map(cartItem => {
					if (cartItem.id === id) {
						return { ...cartItem, amount: cartItem.amount - 1 };
					} else {
						return cartItem;
					}
				});
			}
		});
	};

	const clearCart = () => {
		setHaptic('soft');
		setCartItems([]);
	};

	const getCartTotalAmount = (products: RestaurantProduct[]) =>
		cartItems.reduce((total, cartItem): number => {
			const product = findProduct(products, cartItem.id);

			return total + (product?.price || 0) * cartItem.amount;
		}, 0);

	const getCartOrder = (products: RestaurantProduct[]) =>
		getCartOrderString(
			cartItems.map((cartItem, index) => {
				const product = findProduct(products, cartItem.id);

				return `${index + 1}. ${product?.title} ${product?.amount} x ${product?.price}`;
			}),
		);

	const getOrderCheckout = (products: RestaurantProduct[]) =>
		cartItems.map((cartItem): Pick<RestaurantProduct, 'image' | 'title' | 'price' | 'amount'> | undefined => {
			const product = findProduct(products, cartItem.id);

			if (product) {
				const { image, title, price, amount } = product;
				return { image, title, price, amount };
			}
		});

	return (
		<ShoppingCartContext.Provider
			value={{
				incrementCartAmount,
				decrementCartAmount,
				clearCart,
				cartItems,
				getCartTotalAmount,
				isCartEmpty,
				getCartOrder,
				getOrderCheckout,
				getItemAmount,
				getCartRestaurant,
			}}>
			{children}
		</ShoppingCartContext.Provider>
	);
};
