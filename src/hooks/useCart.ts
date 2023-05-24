import { useLocalStorage } from 'usehooks-ts';
import { hideMainButton, setHaptic } from '../actions/webApp-actions';
import { useProducts } from './useProducts';
import { FoodModel, ProductModel } from '../models/productModel';
import { addNewProductToCart, decrementProduct, getCartOrderString, incrementProductInCart } from '../utils/cart';

export const useCart = () => {
	const { checkProductInCart, isSameRestaurant } = useProducts();
	const [cartProducts, setCartProducts] = useLocalStorage<ProductModel[]>('products', []);

	const isCartEmpty = cartProducts.length === 0;

	const clearCart = () => {
		setCartProducts([]);
	};

	const addToCart = (selectedProduct: ProductModel) => {
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
	};

	const removeFromCart = (selectedProduct: ProductModel) => {
		setHaptic('light');
		setCartProducts(prevState => {
			return prevState.reduce((accumulator: [] | ProductModel[], product: ProductModel): ProductModel[] => {
				if (product.id === selectedProduct.id) {
					if (product.amount! === 1) {
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
			}, [] as ProductModel[]);
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

	const orderCheckout: FoodModel[] = cartProducts.map(({ title, amount, price, image, place, id, description }) => {
		return { image, title, price, amount, place, id, description };
	});

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
