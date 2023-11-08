import { useLocalStorage } from 'usehooks-ts';

import { Cart, CartItem } from 'pages/cart/domain/model/cart.model';
import { CartRepository } from 'pages/cart/domain/repository/cart.repository';
import { getCartOrderString } from 'pages/cart/presentation/utils/cart';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';

import { isSameRestaurant } from 'utils/restaurant';

export const useCartService = (): CartRepository => {
	const [cartItems, setCartItems] = useLocalStorage<Cart>('cart', []);

	const isCartEmpty = cartItems.length === 0;

	const getCartItems = () => cartItems;

	const clearCart = () => setCartItems([]);

	const getCartRestaurant = (): string => cartItems.map(({ restaurantTitle }) => restaurantTitle)[0];

	const getItemQuantity = (id: string): number => cartItems.find(cartItem => cartItem.id === id)?.quantity || 0;

	const getTotalPrice = (items: RestaurantItem[]): number => {
		return cartItems.reduce((total, cartItem): number => {
			const item = findRestaurantItem(items, cartItem.id);

			return total + (item?.price || 0) * cartItem.quantity;
		}, 0);
	};

	const removeItem = (id: string): Cart => {
		return [...cartItems].filter(cartItem => cartItem.id !== id);
	};

	const getCartOrder = (items: RestaurantItem[]) =>
		getCartOrderString(
			cartItems.map((cartItem, index) => {
				const item = findRestaurantItem(items, cartItem.id);

				return `${index + 1}. ${item?.title} ${item?.quantity} x ${item?.price}`;
			}),
		);

	const getOrderCheckout = (items: RestaurantItem[]) =>
		cartItems.map((cartItem): Pick<RestaurantItem, 'image' | 'title' | 'price' | 'quantity'> | undefined => {
			const item = findRestaurantItem(items, cartItem.id);

			if (item) {
				const { image, title, price, quantity } = item;
				return { image, title, price, quantity };
			}
		});

	const decrementItemQuantity = (id: string) => {
		const cartItem = findCartItem(id, cartItems);

		if (cartItems.length === 1) {
			const answer = confirm('Do you want to clear your cart?');
			if (answer) {
				clearCart();
			}
		}

		if (cartItem?.quantity === 1) {
			return setCartItems(removeItem(id));
		} else {
			const modifiedCart = cartItems.map(cartItem => {
				if (cartItem.id === id) {
					return { ...cartItem, quantity: cartItem.quantity - 1 };
				} else {
					return cartItem;
				}
			});
			return setCartItems(modifiedCart);
		}
	};

	const incrementItemQuantity = (id: string, restaurantTitle: string | undefined) => {
		const cartItem = findCartItem(id, cartItems);

		if (!isSameRestaurant(cartItems, restaurantTitle) && restaurantTitle) {
			const answer = confirm('You should empty your cart for a new order');
			answer && clearCart();

			setCartItems([...cartItems, { id, quantity: 1, restaurantTitle }]);
		} else {
			if (cartItem === undefined && restaurantTitle) {
				return setCartItems([...cartItems, { id, quantity: 1, restaurantTitle }]);
			} else {
				const modifiedCart = cartItems.map(item => {
					if (item.id === id) {
						// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});

				return setCartItems(modifiedCart);
			}
		}
	};

	return {
		clearCart,
		isCartEmpty,
		getCartItems,
		getCartOrder,
		getTotalPrice,
		getItemQuantity,
		getOrderCheckout,
		getCartRestaurant,
		decrementItemQuantity,
		incrementItemQuantity,
	};
};

const findCartItem = (id: string, cartItems: Cart | null): CartItem | undefined =>
	cartItems?.find(cartItem => cartItem.id === id);

const findRestaurantItem = (items: RestaurantItem[], id: string) =>
	items?.find(item => {
		return item.id === id;
	});
