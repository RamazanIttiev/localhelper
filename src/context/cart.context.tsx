import { createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { hideMainButton, setHaptic } from '../actions/webApp-actions';
import { CartItem, ShoppingCartContextProps, ShoppingCartProviderProps } from '../models/cart.model';
import { getCartOrderString } from '../utils/cart';
import { RestaurantProductModel } from '../pages/restaurant/components/restaurant-product/restaurant-product.model';
import { isSameRestaurant } from '../utils/restaurant';

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};
export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

	const isCartEmpty = cartItems.length === 0;

	const findProduct = (products: RestaurantProductModel[], id: string) =>
		products?.find(product => {
			return product.id === id;
		});

	const findCartItem = (id: string) => cartItems.find(cartItem => cartItem.id === id);

	const getItemAmount = (id: string) => {
		return cartItems.find(cartItem => cartItem.id === id)?.amount || 0;
	};

	const incrementCartAmount = (id: string, restaurantId: string) => {
		setHaptic('light');

		const modifyCart = () =>
			setCartItems(currentItems => {
				const cartItem = findCartItem(id);

				if (cartItem === undefined) {
					return [...currentItems, { id, amount: 1, restaurantId }];
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

		if (!isSameRestaurant(cartItems, restaurantId)) {
			const answer = confirm('You should empty your cart for a new order');
			answer && clearCart();

			setTimeout(() => modifyCart(), 0);
		} else {
			modifyCart();
		}
	};

	const decrementCartAmount = (id: string) => {
		setHaptic('light');
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
		setHaptic('light');
		setCartItems([]);
	};

	const getCartTotalAmount = (products: RestaurantProductModel[]) =>
		cartItems.reduce((total, cartItem): number => {
			const product = findProduct(products, cartItem.id);
			console.log(product);
			return total + (product?.price || 0) * cartItem.amount;
		}, 0);

	const getCartOrder = (products: RestaurantProductModel[]) =>
		getCartOrderString(
			cartItems.map((cartItem, index) => {
				const product = findProduct(products, cartItem.id);

				return `${index + 1}. ${product?.title} ${product?.amount} x ${product?.price}`;
			}),
		);

	const getOrderCheckout = (products: RestaurantProductModel[]) =>
		cartItems.map((cartItem): Pick<RestaurantProductModel, 'image' | 'title' | 'price' | 'amount'> | undefined => {
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
			}}>
			{children}
		</ShoppingCartContext.Provider>
	);
};
