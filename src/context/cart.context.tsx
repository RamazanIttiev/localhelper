import { createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { hideMainButton, setHaptic } from '../actions/webApp-actions';
import { isSameRestaurant } from '../utils/restaurant';
import { CartItem, ShoppingCartContextProps, ShoppingCartProviderProps } from '../models/cart.model';
import { useRouteLoaderData } from 'react-router-dom';
import { AppData, FoodModel } from '../models/product.model';
import { getCartOrderString } from '../utils/cart';

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};
export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
	const { products } = useRouteLoaderData('AppData') as AppData;
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

	const getItemAmount = (id: string) => {
		return cartItems.find(item => item.id === id)?.amount || 0;
	};
	const incrementCartAmount = (id: string, restaurant: string[]) => {
		setHaptic('light');
		const sameRestaurant = isSameRestaurant(cartItems, restaurant);

		const modifyCart = () =>
			setCartItems(currItems => {
				if (currItems.find(item => item.id === id) == null) {
					return [...currItems, { id, amount: 1, restaurant }];
				} else {
					return currItems.map(item => {
						if (item.id === id) {
							return { ...item, amount: item.amount + 1 };
						} else {
							return item;
						}
					});
				}
			});

		if (!sameRestaurant) {
			const answer = confirm('You should empty your cart for a new order');
			answer && clearCart();

			setTimeout(() => modifyCart(), 0);
		} else {
			modifyCart();
		}
	};

	const decrementCartAmount = (id: string) => {
		setHaptic('light');
		setCartItems(currItems => {
			const item = currItems.find(item => item.id === id);
			if (item?.amount === 1) {
				if (currItems.length === 1) {
					const answer = confirm('Do you want to clear your cart?');
					if (answer) {
						clearCart();
						hideMainButton();
					} else return [item];
				}
				return currItems.filter(item => item.id !== id);
			} else {
				return currItems.map(item => {
					if (item.id === id) {
						return { ...item, amount: item.amount - 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const clearCart = () => {
		setHaptic('light');
		setCartItems([]);
	};

	const cartTotalAmount = cartItems.reduce((total, cartItem): number => {
		const item = products?.find(product => product.id === cartItem.id) as FoodModel | undefined;
		return total + (item?.price || 0) * cartItem.amount;
	}, 0);

	const isCartEmpty = cartItems.length === 0;

	const cartOrder = getCartOrderString(
		cartItems.map((cartItem, id) => {
			const item = products?.find(product => product.id === cartItem.id) as FoodModel | undefined;

			return `${id + 1}. ${item?.title} ${item?.amount} x ${item?.price}`;
		}),
	);

	const orderCheckout: (Pick<FoodModel, 'title' | 'amount' | 'image' | 'price'> | undefined)[] = cartItems.map(
		(cartItem): Pick<FoodModel, 'image' | 'title' | 'price' | 'amount'> | undefined => {
			const item = products?.find(product => product.id === cartItem.id) as FoodModel | undefined;

			if (item) {
				const { image, title, price, amount } = item;
				return { image, title, price, amount };
			}
		},
	);

	return (
		<ShoppingCartContext.Provider
			value={{
				incrementCartAmount,
				decrementCartAmount,
				clearCart,
				cartItems,
				cartTotalAmount,
				isCartEmpty,
				cartOrder,
				orderCheckout,
				getItemAmount,
			}}>
			{children}
		</ShoppingCartContext.Provider>
	);
};