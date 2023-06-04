import { createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { hideMainButton, setHaptic } from '../actions/webApp-actions';
import { isSameRestaurant } from '../utils/restaurant';
import { CartItem, ShoppingCartContextProps, ShoppingCartProviderProps } from '../models/cart.model';
import { FoodModel, ProductModel } from '../models/product.model';
import { getCartOrderString } from '../utils/cart';

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};
export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

	const findProduct = (products: ProductModel[], id: string) =>
		products?.find(product => {
			return product.id === id;
		}) as FoodModel | undefined;

	const findCartItem = (id: string) => cartItems.find(cartItem => cartItem.id === id);

	const getItemAmount = (id: string) => {
		return cartItems.find(cartItem => cartItem.id === id)?.amount || 0;
	};

	const addNewProduct = (product: CartItem) => {
		const cartItem = findCartItem(product.id);
		setCartItems(currentItems => {
			if (cartItem === undefined) {
				return [...currentItems, { ...product }];
			} else
				return currentItems.flatMap(() => {
					if (
						cartItem.id === product.id &&
						JSON.stringify(cartItem.extraOptions) === JSON.stringify(product.extraOptions)
					) {
						console.log('same');
						return { ...cartItem, amount: cartItem.amount + product.amount };
					} else {
						console.log('not same');
						return { ...product };
					}
				});
		});
	};

	const incrementCartAmount = (id: string, restaurant: string[]) => {
		setHaptic('light');
		const sameRestaurant = isSameRestaurant(cartItems, restaurant);

		const modifyCart = () =>
			setCartItems(currentItems => {
				const cartItem = findCartItem(id);

				if (cartItem === undefined) {
					return [...currentItems, { id, amount: 1, restaurant }];
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

	// find in child components
	const getCartTotalAmount = (products: ProductModel[]) =>
		cartItems.reduce((total, cartItem): number => {
			const product = findProduct(products, cartItem.id);
			console.log(product);
			return total + (product?.price || 0) * cartItem.amount;
		}, 0);

	const isCartEmpty = cartItems.length === 0;

	// find in child components
	const getCartOrder = (products: ProductModel[]) =>
		getCartOrderString(
			cartItems.map((cartItem, index) => {
				const product = findProduct(products, cartItem.id);

				return `${index + 1}. ${product?.title} ${product?.amount} x ${product?.price}`;
			}),
		);
	// find in child components
	const getOrderCheckout = (products: ProductModel[]) =>
		cartItems.map((cartItem): Pick<FoodModel, 'image' | 'title' | 'price' | 'amount'> | undefined => {
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
				findProduct,
				addNewProduct,
			}}>
			{children}
		</ShoppingCartContext.Provider>
	);
};
